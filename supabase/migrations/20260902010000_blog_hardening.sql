-- Apply after 20260902000000_blog.sql. No administrator is created automatically.
-- Role checks use a narrowly scoped helper to avoid exposing the allowlist to anonymous visitors.
create or replace function public.is_blog_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists(select 1 from public.blog_admins where user_id = (select auth.uid())); $$;
revoke all on function public.is_blog_admin() from public;
grant execute on function public.is_blog_admin() to anon, authenticated;
revoke all on public.blog_admins from anon, authenticated;
grant select on public.blog_admins to authenticated;
revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;

drop policy "published posts are public" on public.blog_posts;
drop policy "admins create posts" on public.blog_posts;
drop policy "admins update posts" on public.blog_posts;
drop policy "admins delete posts" on public.blog_posts;
create policy "published posts are public" on public.blog_posts for select to anon, authenticated
using (status = 'published' or (select public.is_blog_admin()));
create policy "admins create posts" on public.blog_posts for insert to authenticated
with check ((select public.is_blog_admin()));
create policy "admins update posts" on public.blog_posts for update to authenticated
using ((select public.is_blog_admin())) with check ((select public.is_blog_admin()));
create policy "admins delete posts" on public.blog_posts for delete to authenticated
using ((select public.is_blog_admin()));

alter table public.blog_posts add constraint blog_slug_length check (char_length(slug) <= 120);
alter table public.blog_posts add constraint blog_summary_length check (char_length(excerpt) <= 400);
alter table public.blog_posts add constraint blog_content_length check (char_length(content) <= 100000);
alter table public.blog_posts add constraint blog_cover_https check (cover_image_url is null or cover_image_url ~ '^https://[^[:space:]]+$');

-- Publication dates and modification times belong to the database, not the browser.
create or replace function public.set_blog_timestamps()
returns trigger language plpgsql security invoker set search_path = ''
as $$ begin
  new.updated_at = now();
  if tg_op = 'INSERT' then
    new.created_at = now();
    new.published_at = case when new.status = 'published' then now() else null end;
  else
    new.created_at = old.created_at;
    new.published_at = coalesce(old.published_at, case when new.status = 'published' then now() else null end);
  end if;
  return new;
end; $$;
drop trigger set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_timestamps before insert or update on public.blog_posts
for each row execute function public.set_blog_timestamps();

update storage.buckets set file_size_limit = 5242880,
allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'blog-images';
drop policy "admins upload blog images" on storage.objects;
drop policy "admins update blog images" on storage.objects;
drop policy "admins delete blog images" on storage.objects;
create policy "admins upload blog images" on storage.objects for insert to authenticated
with check (bucket_id = 'blog-images' and (select public.is_blog_admin()));
create policy "admins update blog images" on storage.objects for update to authenticated
using (bucket_id = 'blog-images' and (select public.is_blog_admin()))
with check (bucket_id = 'blog-images' and (select public.is_blog_admin()));
create policy "admins delete blog images" on storage.objects for delete to authenticated
using (bucket_id = 'blog-images' and (select public.is_blog_admin()));
