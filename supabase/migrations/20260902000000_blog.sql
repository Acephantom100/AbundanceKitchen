-- Run in the Supabase SQL Editor or through the Supabase CLI.
create type public.blog_status as enum ('draft', 'published');

create table public.blog_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text,
  content text not null check (char_length(content) > 0),
  cover_image_url text,
  status public.blog_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_posts_have_a_date check (status = 'draft' or published_at is not null)
);

create index blog_posts_published_at_idx on public.blog_posts (published_at desc) where status = 'published';
alter table public.blog_admins enable row level security;
alter table public.blog_posts enable row level security;

create policy "admins can confirm their role" on public.blog_admins for select to authenticated using ((select auth.uid()) = user_id);
create policy "published posts are public" on public.blog_posts for select using (status = 'published' or exists (select 1 from public.blog_admins where user_id = (select auth.uid())));
create policy "admins create posts" on public.blog_posts for insert to authenticated with check (exists (select 1 from public.blog_admins where user_id = (select auth.uid())));
create policy "admins update posts" on public.blog_posts for update to authenticated using (exists (select 1 from public.blog_admins where user_id = (select auth.uid()))) with check (exists (select 1 from public.blog_admins where user_id = (select auth.uid())));
create policy "admins delete posts" on public.blog_posts for delete to authenticated using (exists (select 1 from public.blog_admins where user_id = (select auth.uid())));

create or replace function public.set_updated_at() returns trigger language plpgsql security invoker set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
create trigger set_blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

-- Optional cover-image bucket. It is public only for serving approved cover images;
-- writes remain limited to blog administrators.
insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;
create policy "public can view blog images" on storage.objects for select using (bucket_id = 'blog-images');
create policy "admins upload blog images" on storage.objects for insert to authenticated with check (bucket_id = 'blog-images' and exists (select 1 from public.blog_admins where user_id = (select auth.uid())));
create policy "admins update blog images" on storage.objects for update to authenticated using (bucket_id = 'blog-images' and exists (select 1 from public.blog_admins where user_id = (select auth.uid()))) with check (bucket_id = 'blog-images' and exists (select 1 from public.blog_admins where user_id = (select auth.uid())));
create policy "admins delete blog images" on storage.objects for delete to authenticated using (bucket_id = 'blog-images' and exists (select 1 from public.blog_admins where user_id = (select auth.uid())));

-- After inviting an administrator via Supabase Auth, run this once with their auth.users UUID:
-- insert into public.blog_admins (user_id) values ('USER_UUID_HERE');
