-- Private by default. Only photos attached to published posts are readable by visitors.
alter table public.blog_posts add column cover_image_path text
  check (cover_image_path is null or cover_image_path ~ '^[0-9a-f-]{36}\.jpg$');
alter table public.blog_posts add column story_date date not null default current_date;
update storage.buckets set public = false where id = 'blog-images';
drop policy "public can view blog images" on storage.objects;
create policy "published covers or editors can read" on storage.objects for select to anon, authenticated
using (bucket_id = 'blog-images' and (
  (select public.is_blog_admin()) or exists (
    select 1 from public.blog_posts p where p.cover_image_path = storage.objects.name and p.status = 'published'
  )
));
drop policy "admins update blog images" on storage.objects;
-- Photos are immutable: replacements get a new UUID path.
drop policy "admins delete blog images" on storage.objects;
create policy "admins delete unused images" on storage.objects for delete to authenticated
using (bucket_id = 'blog-images' and (select public.is_blog_admin()) and not exists (
  select 1 from public.blog_posts p where p.cover_image_path = storage.objects.name
));
-- Refuse legacy public links: every future editor upload must use private managed storage.
alter table public.blog_posts add constraint blog_managed_images_only check (cover_image_url is null);
