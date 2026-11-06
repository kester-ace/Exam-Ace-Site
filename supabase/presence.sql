-- =====================================================================
--  WHO'S ONLINE + ATTENDANCE  ·  run once in Supabase → SQL Editor
--  (after schema.sql). Only the presence Netlify function reads or
--  writes these tables (service key), so there is no public access.
-- =====================================================================

-- One row per visit: from sign-in (or opening the site) to sign-out or the last sign of activity.
create table if not exists public.sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  role        text,
  first_name  text,
  last_name   text,
  email       text,
  started_at  timestamptz not null default now(),
  last_seen   timestamptz not null default now(),
  ended_at    timestamptz,                -- set when they sign out
  where_now   text,                       -- 'dashboard', a course slug, 'exam'
  device      text
);
create index if not exists sessions_user on public.sessions (user_id, started_at desc);
create index if not exists sessions_seen on public.sessions (last_seen desc);
create index if not exists sessions_start on public.sessions (started_at desc);

-- Minutes spent, per person, per day, per place (a course slug, 'dashboard' or 'exam').
create table if not exists public.activity_minutes (
  user_id   uuid not null references public.profiles(id) on delete cascade,
  day       date not null,
  place     text not null,
  minutes   int  not null default 0,
  primary key (user_id, day, place)
);
create index if not exists activity_minutes_day on public.activity_minutes (day, place);

alter table public.sessions          enable row level security;
alter table public.activity_minutes  enable row level security;

-- Adds one minute safely when many students check in at once.
create or replace function public.add_minute(p_user uuid, p_day date, p_place text)
returns void language sql security definer set search_path = public as $$
  insert into activity_minutes (user_id, day, place, minutes) values (p_user, p_day, p_place, 1)
  on conflict (user_id, day, place) do update set minutes = activity_minutes.minutes + 1;
$$;
revoke all on function public.add_minute(uuid, date, text) from public, anon, authenticated;
