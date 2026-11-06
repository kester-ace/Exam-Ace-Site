-- =====================================================================
--  E-COURSE DATABASE  ·  run once in Supabase → SQL Editor → New query
--  Creates: profiles, entitlements (who can open which course),
--           activity_log (sign-ins, course visits), orders (Payhip sales)
-- =====================================================================

-- ---------- Profiles: one row per login ----------
create table if not exists public.profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  full_name             text,
  username              text,
  contact_email         text,
  role                  text not null default 'student' check (role in ('student','teacher','admin')),
  school                text,
  plan                  text,
  must_change_password  boolean not null default false,
  created_at            timestamptz not null default now()
);
create unique index if not exists profiles_username_key on public.profiles (lower(username));

-- ---------- Entitlements: which courses each person can open ----------
-- course_slug matches the slug in assets/config.js, or 'all' for every course
create table if not exists public.entitlements (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references public.profiles(id) on delete cascade,
  course_slug  text not null,
  edition      text not null default 'student' check (edition in ('student','teacher')),
  source       text not null default 'manual' check (source in ('school','payhip','manual')),
  starts_at    timestamptz not null default now(),
  expires_at   timestamptz,                       -- leave empty for no end date
  books        boolean not null default true,     -- flipbook textbook included?
  order_id     bigint,                            -- the Payhip order that granted it
  created_at   timestamptz not null default now(),
  unique (user_id, course_slug, edition)
);

-- ---------- Activity log: sign-ins, password changes, course opens ----------
create table if not exists public.activity_log (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  event       text not null,
  detail      jsonb not null default '{}',
  created_at  timestamptz not null default now()
);
create index if not exists activity_log_user_time on public.activity_log (user_id, created_at desc);

-- ---------- Orders: each checkout from the shop, matched to Payhip payments ----------
create sequence if not exists public.invoice_seq start 1001;
create table if not exists public.orders (
  id               bigint generated always as identity primary key,
  invoice_number   text not null default ('INV-' || to_char(now(),'YYYY') || '-' || nextval('public.invoice_seq')),
  user_id          uuid references public.profiles(id) on delete set null,
  buyer_email      text,
  lines            jsonb not null default '[]',   -- what was in the cart
  payhip_order_id  text,
  amount_usd       numeric(10,2),
  status           text not null default 'pending'
                   check (status in ('pending','paid','paid_unmatched','refunded','cancelled')),
  created_at       timestamptz not null default now(),
  paid_at          timestamptz
);
create index if not exists orders_email on public.orders (lower(buyer_email));

-- Safe to re-run: adds the newer columns if you ran an earlier copy of this file
alter table public.entitlements add column if not exists books boolean not null default true;
alter table public.entitlements add column if not exists order_id bigint;
alter table public.orders add column if not exists lines jsonb not null default '[]';
alter table public.orders add column if not exists paid_at timestamptz;

-- ---------- Subject requests: people ask for a course (or a new subject) ----------
create table if not exists public.course_requests (
  id            bigint generated always as identity primary key,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  course_slug   text,                 -- a course on the site, or empty for a new subject
  subject_text  text,                 -- a subject not offered yet, in the person's words
  note          text,
  status        text not null default 'pending' check (status in ('pending','approved','declined')),
  created_at    timestamptz not null default now(),
  decided_at    timestamptz,
  check (course_slug is not null or coalesce(subject_text,'') <> '')
);

-- ---------- Quote requests: from the poster-style form (visitors needn't be signed in) ----------
create table if not exists public.quote_requests (
  id            bigint generated always as identity primary key,
  who           text, full_name text not null, email text not null, phone text,
  organisation  text, island text,
  subjects      text[] not null default '{}',
  learners      text, teachers text, extras text[] not null default '{}',
  start         text, billing text, message text, plan text,
  status        text not null default 'new' check (status in ('new','quoted','closed')),
  created_at    timestamptz not null default now()
);

-- ---------- New logins get a profile automatically ----------
-- Role and the first-login rule come from app_metadata, which only the
-- secure admin function can set. Self-registered accounts are always students.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, username, contact_email, role, must_change_password, plan)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_app_meta_data->>'username', split_part(new.email, '@', 1) || '-' || substr(new.id::text, 1, 4)),
    coalesce(new.raw_app_meta_data->>'contact_email', new.email),
    coalesce(new.raw_app_meta_data->>'role', 'student'),
    coalesce((new.raw_app_meta_data->>'must_change_password')::boolean, false),
    new.raw_user_meta_data->>'plan'
  );
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Helpers ----------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Called by the site right after a student sets their own password
create or replace function public.clear_must_change_password()
returns void language sql security definer set search_path = public as $$
  update public.profiles set must_change_password = false where id = auth.uid();
$$;
grant execute on function public.clear_must_change_password() to authenticated;

-- ---------- Row-level security: people see only their own records ----------
alter table public.profiles      enable row level security;
alter table public.entitlements  enable row level security;
alter table public.activity_log  enable row level security;
alter table public.orders        enable row level security;
alter table public.course_requests enable row level security;
alter table public.quote_requests  enable row level security;
drop policy if exists "anyone can ask for a quote" on public.quote_requests;
drop policy if exists "admin reads quotes"         on public.quote_requests;
create policy "anyone can ask for a quote" on public.quote_requests for insert to anon, authenticated with check (status = 'new' and length(full_name) < 200 and length(coalesce(message,'')) < 4000);
create policy "admin reads quotes"         on public.quote_requests for select using (public.is_admin());

drop policy if exists "own requests read"  on public.course_requests;
drop policy if exists "own requests write" on public.course_requests;
create policy "own requests read"  on public.course_requests for select using (user_id = auth.uid() or public.is_admin());
create policy "own requests write" on public.course_requests for insert with check (user_id = auth.uid() and status = 'pending');

drop policy if exists "own profile"      on public.profiles;
drop policy if exists "own courses"      on public.entitlements;
drop policy if exists "own log read"     on public.activity_log;
drop policy if exists "own log write"    on public.activity_log;
drop policy if exists "own orders"       on public.orders;

create policy "own profile"   on public.profiles     for select using (id = auth.uid() or public.is_admin());
create policy "own courses"   on public.entitlements for select using (user_id = auth.uid() or public.is_admin());
create policy "own log read"  on public.activity_log for select using (user_id = auth.uid() or public.is_admin());
create policy "own log write" on public.activity_log for insert with check (user_id = auth.uid());
create policy "own orders"    on public.orders       for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "own orders write" on public.orders;
create policy "own orders write" on public.orders for insert with check (user_id = auth.uid() and status = 'pending');
-- Creating logins, granting courses and marking orders paid happen only
-- through the secure Netlify functions, which use the service key.

-- ---------------------------------------------------------------------
--  STUDY TOOLS: notes, voice notes and memory palaces.
--  Each student sees only their own. Recordings go in a private bucket.
-- ---------------------------------------------------------------------
create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  course_slug text,
  topic       text default '',
  kind        text default 'taking',
  title       text default '',
  body        jsonb default '{}'::jsonb,
  sketch      jsonb default '[]'::jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
create index if not exists notes_user_idx on public.notes (user_id, updated_at desc);

create table if not exists public.voice_notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  note_id     uuid not null references public.notes(id) on delete cascade,
  path        text not null,
  name        text default '',
  source      text default 'recorded',
  transcript  text default '',
  created_at  timestamptz default now()
);
create index if not exists voice_note_idx on public.voice_notes (note_id);

create table if not exists public.palaces (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  course_slug text,
  name        text default '',
  data        jsonb default '{}'::jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.notes       enable row level security;
alter table public.voice_notes enable row level security;
alter table public.palaces     enable row level security;

drop policy if exists "own notes"   on public.notes;
drop policy if exists "own voice"   on public.voice_notes;
drop policy if exists "own palaces" on public.palaces;
create policy "own notes"   on public.notes       for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own voice"   on public.voice_notes for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own palaces" on public.palaces     for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Private bucket for recordings (25 MB each). Files live in a folder named after the student's id.
insert into storage.buckets (id, name, public, file_size_limit)
values ('voice-notes', 'voice-notes', false, 26214400)
on conflict (id) do update set public = false, file_size_limit = 26214400;

drop policy if exists "own recordings read"   on storage.objects;
drop policy if exists "own recordings write"  on storage.objects;
drop policy if exists "own recordings delete" on storage.objects;
create policy "own recordings read"   on storage.objects for select
  using (bucket_id = 'voice-notes' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own recordings write"  on storage.objects for insert
  with check (bucket_id = 'voice-notes' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own recordings delete" on storage.objects for delete
  using (bucket_id = 'voice-notes' and (storage.foldername(name))[1] = auth.uid()::text);

-- =====================================================================
--  AFTER you create your own login (Authentication → Users → Add user),
--  make yourself the administrator by running this once:
--
--  update public.profiles set role = 'admin', username = 'kester'
--  where contact_email = 'k.small@stmaartenacademy.com';
-- =====================================================================
