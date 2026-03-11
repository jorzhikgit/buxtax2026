create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  business_type text not null,
  message text,
  source text not null check (source in ('landing', 'calculator', 'blog')),
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image text,
  tags text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text not null,
  meta_title text,
  meta_description text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.blog_posts enable row level security;
alter table public.service_pages enable row level security;

-- Leads policies
create policy "Public can insert leads"
on public.leads
for insert
to anon, authenticated
with check (true);

create policy "Authenticated can read leads"
on public.leads
for select
to authenticated
using (true);

-- Blog policies
create policy "Public can read published blog posts"
on public.blog_posts
for select
to anon, authenticated
using (published = true);

create policy "Authenticated can manage blog posts"
on public.blog_posts
for all
to authenticated
using (true)
with check (true);

-- Service Pages policies
create policy "Public can read published service pages"
on public.service_pages
for select
to anon, authenticated
using (published = true);

create policy "Authenticated can manage service pages"
on public.service_pages
for all
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;
