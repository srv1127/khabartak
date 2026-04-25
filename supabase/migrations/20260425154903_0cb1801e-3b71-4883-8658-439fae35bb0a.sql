-- Roles enum and table
create type public.app_role as enum ('admin', 'writer', 'reader');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "anyone can view roles"
  on public.user_roles for select
  using (true);

create policy "admins manage roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Profiles
create type public.writer_status as enum ('none', 'pending', 'approved', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  bio text,
  avatar_url text,
  id_document_url text,
  status writer_status not null default 'none',
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "anyone can view profiles"
  on public.profiles for select
  using (true);

create policy "users insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "admins update any profile"
  on public.profiles for update
  using (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  insert into public.user_roles (user_id, role) values (new.id, 'reader');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Articles
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  body text not null,
  category text not null,
  cover_image text,
  read_time text,
  published boolean not null default false,
  author_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_category_idx on public.articles(category);
create index articles_published_idx on public.articles(published, created_at desc);
create index articles_author_idx on public.articles(author_id);

alter table public.articles enable row level security;

create policy "anyone views published articles"
  on public.articles for select
  using (published = true);

create policy "authors view own articles"
  on public.articles for select
  using (auth.uid() = author_id);

create policy "admins view all articles"
  on public.articles for select
  using (public.has_role(auth.uid(), 'admin'));

create policy "approved writers create articles"
  on public.articles for insert
  with check (
    auth.uid() = author_id
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and status = 'approved'
    )
  );

create policy "authors update own articles"
  on public.articles for update
  using (auth.uid() = author_id);

create policy "admins update any article"
  on public.articles for update
  using (public.has_role(auth.uid(), 'admin'));

create policy "authors delete own articles"
  on public.articles for delete
  using (auth.uid() = author_id);

create policy "admins delete any article"
  on public.articles for delete
  using (public.has_role(auth.uid(), 'admin'));

-- Update trigger
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated before update on public.profiles
  for each row execute function public.tg_set_updated_at();
create trigger articles_updated before update on public.articles
  for each row execute function public.tg_set_updated_at();

-- Storage buckets
insert into storage.buckets (id, name, public) values
  ('article-images', 'article-images', true),
  ('avatars', 'avatars', true),
  ('kyc-documents', 'kyc-documents', false);

-- Public buckets policies
create policy "public read article images"
  on storage.objects for select
  using (bucket_id = 'article-images');

create policy "auth upload article images"
  on storage.objects for insert
  with check (bucket_id = 'article-images' and auth.uid() is not null);

create policy "owners manage article images"
  on storage.objects for update
  using (bucket_id = 'article-images' and owner = auth.uid());

create policy "owners delete article images"
  on storage.objects for delete
  using (bucket_id = 'article-images' and owner = auth.uid());

create policy "public read avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "auth upload avatars"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid() is not null);

create policy "owners update avatars"
  on storage.objects for update
  using (bucket_id = 'avatars' and owner = auth.uid());

-- Private KYC bucket
create policy "owners read own kyc"
  on storage.objects for select
  using (bucket_id = 'kyc-documents' and owner = auth.uid());

create policy "admins read all kyc"
  on storage.objects for select
  using (bucket_id = 'kyc-documents' and public.has_role(auth.uid(), 'admin'));

create policy "auth upload own kyc"
  on storage.objects for insert
  with check (bucket_id = 'kyc-documents' and auth.uid() is not null and owner = auth.uid());