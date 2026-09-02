import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("donation enquiry opens an accessible contact dialog, not only a mail app", () => {
  const section = read("src/components/BankDetailsSection.tsx");
  const dialog = read("src/components/DonationContactDialog.tsx");
  assert.match(section, /<DonationContactDialog \/>/);
  for (const component of ["DialogTrigger", "DialogContent", "DialogTitle", "DialogDescription"]) {
    assert.ok(dialog.includes(`<${component}`));
  }
  assert.ok(dialog.includes('const email = "alwynjosephp@gmail.com"'));
  assert.ok(dialog.includes("navigator.clipboard.writeText(email)"));
  assert.ok(dialog.includes("copy it manually"));
  assert.ok(dialog.includes('role="status"'));
  assert.ok(dialog.includes("https://mail.google.com/mail/?view=cm&fs=1&to="));
  assert.ok(dialog.includes("mailto:${email}?subject=${subject}"));
  assert.ok(dialog.includes('rel="noopener noreferrer"'));
});
