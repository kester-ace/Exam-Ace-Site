-- =====================================================================
--  VIRTUAL EXAM ROOM  ·  run once in Supabase → SQL Editor → New query
--  (after schema.sql). Everything goes through the exam-room Netlify
--  function, so these tables have no public access at all: students
--  can never read the question pool, the answers or anyone else's paper.
-- =====================================================================

create table if not exists public.exam_rooms (
  id            uuid primary key default gen_random_uuid(),
  code          text not null unique,                 -- the invite code students type
  teacher_id    uuid not null references public.profiles(id) on delete cascade,
  teacher_name  text,
  teacher_email text,
  title         text not null default 'Test',
  course_slug   text,
  instructions  text default '',
  status        text not null default 'waiting' check (status in ('waiting','live','ended')),
  per_student   int  not null default 20,             -- questions on each student's paper
  duration_min  int  not null default 60,
  extra_min     int  not null default 0,
  late_min      int  not null default 20,             -- entry closes this many minutes after the start
  auto_lock     boolean not null default true,
  locked        boolean not null default false,
  cols          int  not null default 6,              -- seats per row (neighbours get different questions)
  seats_n       int  not null default 30,
  show_score    boolean not null default false,
  pool          jsonb not null default '[]',          -- multiple-choice questions, with answers
  written       jsonb not null default '[]',          -- written questions
  admitted      jsonb not null default '[]',          -- people the teacher let in late
  started_at    timestamptz,
  ended_at      timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists exam_rooms_teacher on public.exam_rooms (teacher_id, created_at desc);

create table if not exists public.exam_seats (
  id            uuid primary key default gen_random_uuid(),
  room_id       uuid not null references public.exam_rooms(id) on delete cascade,
  user_id       uuid references public.profiles(id) on delete set null,   -- empty for invite-code guests
  name          text not null,
  email         text,
  seat_no       int  not null,
  secret        text not null,                        -- the seat key kept in the student's browser
  status        text not null default 'seated' check (status in ('seated','submitted')),
  paper         jsonb,                                -- which questions, in which order, options shuffled
  answers       jsonb not null default '{}',
  flags         jsonb not null default '{}',          -- times they left the test page
  marks         jsonb not null default '{}',          -- teacher's marks for written answers
  score         int,
  total         int,
  auto          boolean default false,                -- handed in by the clock, not the student
  joined_at     timestamptz not null default now(),
  last_seen     timestamptz,
  submitted_at  timestamptz,
  unique (room_id, seat_no)
);
create unique index if not exists exam_seats_user on public.exam_seats (room_id, user_id) where user_id is not null;

create table if not exists public.exam_messages (
  id          bigint generated always as identity primary key,
  room_id     uuid not null references public.exam_rooms(id) on delete cascade,
  kind        text not null default 'text' check (kind in ('text','audio','system')),
  body        text,
  audio       text,                                   -- path in the exam-audio bucket
  secs        int default 0,
  created_at  timestamptz not null default now()
);
create index if not exists exam_messages_room on public.exam_messages (room_id, id);

create table if not exists public.exam_turnaways (
  id          bigint generated always as identity primary key,
  room_id     uuid not null references public.exam_rooms(id) on delete cascade,
  key         text not null,                          -- user id, or e:<email> for guests
  user_id     uuid,
  name        text,
  email       text,
  reason      text not null check (reason in ('late','locked','ended')),
  emailed     boolean not null default false,
  at          timestamptz not null default now()
);
create index if not exists exam_turnaways_room on public.exam_turnaways (room_id, at desc);

alter table public.exam_rooms     enable row level security;
alter table public.exam_seats     enable row level security;
alter table public.exam_messages  enable row level security;
alter table public.exam_turnaways enable row level security;
-- (no policies on purpose: only the Netlify function, using the service key, can read or write them)

-- Private bucket for the teacher's voice messages (10 MB each). Students get short-lived links.
insert into storage.buckets (id, name, public, file_size_limit)
values ('exam-audio', 'exam-audio', false, 10485760)
on conflict (id) do update set public = false, file_size_limit = 10485760;

-- ---------- added: cameras, voice messages from students, alerts ----------
alter table public.exam_rooms    add column if not exists cam_request boolean not null default false;
alter table public.exam_seats    add column if not exists cam jsonb;            -- { on, at, img }: the latest still from the student's camera
alter table public.exam_messages add column if not exists seat_id uuid references public.exam_seats(id) on delete cascade;
alter table public.exam_messages drop constraint if exists exam_messages_kind_check;
alter table public.exam_messages add constraint exam_messages_kind_check check (kind in ('text','audio','system','student'));

-- ---------- added: scheduling and proctoring modes ----------
alter table public.exam_rooms add column if not exists mode         text not null default 'proctored';  -- proctored | bot | unmonitored
alter table public.exam_rooms add column if not exists scheduled_at timestamptz;                        -- starts by itself at this time
alter table public.exam_rooms add column if not exists open_before  int not null default 15;            -- minutes before the start that students may come in
alter table public.exam_rooms add column if not exists max_leaves   int not null default 3;             -- exam bot: stop a paper after this many times away
alter table public.exam_rooms add column if not exists invig_seen   timestamptz;                        -- the invigilator's console last checked in
alter table public.exam_rooms add column if not exists reported     boolean not null default false;     -- the end-of-test report has been emailed
alter table public.exam_seats add column if not exists blocked      boolean not null default false;     -- stopped by the exam bot

-- ---------- added: grace period, extra time for one student, reopening ----------
alter table public.exam_rooms add column if not exists grace_min int not null default 15;   -- papers hand themselves in this long after time is up
alter table public.exam_seats add column if not exists until timestamptz;                   -- this student's own end (extra time or reopened)
