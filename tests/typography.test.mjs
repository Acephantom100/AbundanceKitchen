import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("public typography uses one accessible, scalable hierarchy", () => {
  const css = read("src/site.css");
  assert.match(css, /--type-label: 1rem/);
  assert.match(css, /--type-body: 1\.125rem/);
  for (const role of ["label", "body", "lead", "card", "section", "title"]) {
    assert.ok(css.includes(`font-size:var(--type-${role})`) || css.includes(`font-size: var(--type-${role})`));
  }
  assert.doesNotMatch(css, /font-size:\s*(?:1[0-5]|[0-9])px/);
});

test("active controls and supporting copy do not reintroduce tiny text", () => {
  for (const path of ["src/components/ui/button.tsx", "src/components/Footer.tsx", "src/components/BankDetailsSection.tsx", "src/pages/BlogAdmin.tsx"]) {
    assert.doesNotMatch(read(path), /\btext-(?:xs|sm)\b/, path);
  }
});
