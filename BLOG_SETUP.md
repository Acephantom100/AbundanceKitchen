# Abundance Kitchen — operating the journal

## For Alwyn and the site owner

Open https://theabundancekitchen.com/admin/blog and sign in with your approved email and password.
Choose **New story**, add a title, introduction, optional photo, and story, then **Preview**.
Use **Date of the update** for a historical event; leaving it blank uses today's date when first saved.
**Save draft** keeps the text and photo private to approved editors.
**Publish story** asks for confirmation and makes the story and cover photo publicly readable.
To remove a story from the journal, select **Unpublish to draft**.
Changing a story's address breaks existing links, so usually leave it unchanged.
To add a clickable source, put a complete HTTPS URL on its own paragraph.

Photos are prepared on your device and uploaded only when you save.
Replacing a cover or choosing **Remove photo on save**, then saving, deletes the old file if no other story uses it.
If deletion fails, follow the warning and ask the owner to remove unused files in Supabase Storage.
Unpublishing blocks new public photo requests; it cannot recall copies already downloaded.
Use only photos you have permission to publish, especially photos of children.
Keep copies of important stories and original photos outside the website.

## Passwords and access

Only allowlisted accounts can publish, not everyone with a Supabase login.
Keep passwords unique, share them privately, and sign out on shared devices.
Email reset links are not enabled. Contact the site owner for a private password reset through Supabase.
Never share a password, service-role key, or database password in chat or in the repository.
Removing an account's blog_admins row blocks subsequent editor database and storage requests.

## Maintainer setup

Hosting stays on the existing Vercel project connected to Acephantom100/AbundanceKitchen.
The GoDaddy domain continues pointing to Vercel. Lovable and Sites hosting are not required.

1. Apply all three migrations in filename order to a fresh backend. Existing installations must apply only missing migrations.
   - 20260902000000_blog.sql
   - 20260902010000_blog_hardening.sql
   - 20260902020000_private_blog_images.sql
2. Create the approved Auth user with a privately entered password and confirmed email. Disable public sign-ups.
3. Grant that verified user's UUID membership in public.blog_admins using a privileged session.
   No migration creates an administrator; never grant browser roles write access to the allowlist.
4. Set the canonical Site URL to https://theabundancekitchen.com. Password sign-in does not need a magic-link callback.
5. Configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY on Vercel, then rebuild.
   Both are public configuration, not privileged secrets. Never put service-role, secret API keys, or passwords in VITE_ variables.
6. Initial approved posts can be inserted once using supabase/seed/approved-blog-posts.sql.
   It leaves any already-existing post unchanged, so it will not overwrite later client edits.

## Verification checklist

- Anonymous and signed-in non-editors can read published posts but not drafts, and cannot write posts or grant themselves editor access.
- Approved editor can save, publish, edit, and unpublish; another session's edits cause a conflict rather than silent overwrites.
- Draft covers and unattached uploads deny anonymous downloads; published covers allow them.
- Non-editors cannot upload/delete photos. Referenced files cannot be deleted.
- Removal/replacement clears unused storage objects; an interrupted request may leave a private orphan for owner cleanup.
- Password login and direct blog URLs work on the production domain.

## Operating limits

- Free services have usage limits; check provider dashboards and current terms. Keep independent backups.
- Default Supabase email delivery is restricted. Password sign-in avoids relying on it; adding email reset links needs a configured sender.
- This Vite app updates story metadata in the browser; full server-rendered social previews require a separate prerendering/SSR enhancement.
- The journal loads the latest 100 published stories; add pagination before exceeding that volume.
- The organization must verify its claims and keep photo-consent records, registration documents, donation receipt rules, and financial records.
- This setup is not a legal compliance certification.
