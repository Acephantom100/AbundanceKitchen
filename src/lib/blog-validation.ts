export const slugify = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120).replace(/-$/, "");
export function safeImageUrl(value: string | null | undefined): string | null {
  if (!value?.trim()) return null;
  try { const url = new URL(value.trim()); return url.protocol === "https:" && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export type StoryInput = { title: string; slug: string; excerpt: string; content: string; cover_image_url: string };
export function prepareStory(input: StoryInput, status: "draft" | "published") {
  const title = input.title.trim();
  const slug = input.slug.trim() || slugify(title);
  const excerpt = input.excerpt.trim();
  const content = input.content.trim();
  const cover = safeImageUrl(input.cover_image_url);
  if (!title || title.length > 180) throw new Error("Please enter a title of 1–180 characters.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 120) throw new Error("The story address can use lowercase letters, numbers, and single hyphens (up to 120 characters).");
  if (excerpt.length > 400) throw new Error("Keep the summary to 400 characters or fewer.");
  if (!content || content.length > 100000) throw new Error("Please enter a story of 1–100,000 characters.");
  if (input.cover_image_url.trim() && !cover) throw new Error("Please use a valid HTTPS address for the cover photo.");
  return { title, slug, excerpt: excerpt || null, content, cover_image_url: cover, status };
}
