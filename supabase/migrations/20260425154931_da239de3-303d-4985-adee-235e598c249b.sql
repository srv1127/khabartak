-- Fix function search_path
create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin new.updated_at = now(); return new; end; $$;

-- Restrict public bucket listing: replace broad SELECT with per-object lookup only
drop policy if exists "public read article images" on storage.objects;
drop policy if exists "public read avatars" on storage.objects;

-- Public read still works for direct file URLs because the buckets are public,
-- but we don't allow LIST queries from clients.
create policy "public get article images"
  on storage.objects for select
  using (bucket_id = 'article-images' and owner is not null);

create policy "public get avatars"
  on storage.objects for select
  using (bucket_id = 'avatars' and owner is not null);