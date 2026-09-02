import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const source = readFileSync(new URL("../src/lib/blog-validation.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { slugify, safeImageUrl, prepareStory } = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
const valid = { title: " Community meals ", slug: "", excerpt: "A local update.", content: "Meals shared with our community.", cover_image_url: "" };
test("story addresses are predictable and strip unsafe characters", () => { assert.equal(slugify(" Café & Community! "), "cafe-community"); assert.equal(slugify("hello / world"), "hello-world"); assert.ok(slugify("a".repeat(200)).length <= 120); });
test("cover URLs reject script, data, insecure, and credential-bearing addresses", () => {
  for (const url of ["javascript:alert(1)", "data:image/svg+xml,x", "http://example.com/a.jpg", "//example.com/photo.jpg", "https://user:pass@example.com/a.jpg", "not a url"]) assert.equal(safeImageUrl(url), null);
  assert.equal(safeImageUrl("https://example.com/photo.jpg"), "https://example.com/photo.jpg");
});
test("saving trims input and auto-generates the address", () => { const record = prepareStory(valid, "draft"); assert.equal(record.title, "Community meals"); assert.equal(record.slug, "community-meals"); assert.equal(record.status, "draft"); assert.equal(record.cover_image_url, null); });
test("publication timestamps are not client-controlled", () => { assert.equal("published_at" in prepareStory(valid, "published"), false); });
test("blank and oversized stories are rejected", () => {
  for (const change of [{title:" "}, {title:"x".repeat(181)}, {content:" "}, {content:"x".repeat(100001)}, {excerpt:"x".repeat(401)}, {slug:"bad/slug"}, {slug:"-bad"}, {cover_image_url:"http://bad.test/x"}]) assert.throws(() => prepareStory({...valid,...change}, "draft"));
});
test("plain text content is preserved, not interpreted as HTML", () => {
  const content = '<script>alert("x")</script>\n\nA story.';
  assert.equal(prepareStory({...valid, content}, "draft").content, content);
  const page = readFileSync(new URL("../src/pages/BlogPost.tsx", import.meta.url), "utf8");
  assert.ok(!page.includes("dangerouslySetInnerHTML"));
});
test("Vercel serves all client-side entry routes on direct visits", () => {
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  for (const route of ["/blog","/blog/:slug","/admin/blog","/privacy"]) assert.ok(config.rewrites.some(rule => rule.source === route && rule.destination === "/index.html"));
});
test("editor uses password login and private managed photo paths", () => {
  const admin = readFileSync(new URL("../src/pages/BlogAdmin.tsx", import.meta.url), "utf8");
  const cover = readFileSync(new URL("../src/components/BlogCover.tsx", import.meta.url), "utf8");
  assert.ok(admin.includes("signInWithPassword"));
  assert.ok(!admin.includes("signInWithOtp"));
  assert.ok(admin.includes("cover_image_url: null"));
  assert.ok(admin.includes("removeUnusedCover(previousPath)"));
  assert.ok(cover.includes(".download(path)"));
  assert.ok(!cover.includes("getPublicUrl"));
  assert.ok(cover.includes("URL.revokeObjectURL"));
});
test("public pages show database posts and escaped source links", () => {
  const list = readFileSync(new URL("../src/pages/Blog.tsx", import.meta.url), "utf8");
  const story = readFileSync(new URL("../src/components/StoryText.tsx", import.meta.url), "utf8");
  assert.ok(!list.includes("import.meta.env.DEV"));
  assert.ok(story.includes('rel="noopener noreferrer"'));
  assert.ok(!story.includes("dangerouslySetInnerHTML"));
});
test("migration makes storage private and denies deletion of referenced images", () => {
  const sql = readFileSync(new URL("../supabase/migrations/20260902020000_private_blog_images.sql", import.meta.url), "utf8");
  assert.ok(sql.includes("set public = false"));
  assert.ok(sql.includes("p.status = 'published'"));
  assert.ok(sql.includes("not exists"));
  assert.ok(sql.includes("p.cover_image_path = storage.objects.name"));
  assert.ok(sql.includes("check (cover_image_url is null)"));
});
