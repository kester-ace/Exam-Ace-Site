-- =====================================================================
--  STUDENT ID CHECKS  ·  run once in Supabase → SQL Editor (after schema.sql)
--  Each student record can hold a photo of the student and a photo of a
--  valid ID document. Both live in a private bucket; only the identity and
--  exam-room Netlify functions (service key) read them, and only teachers
--  and administrators are shown them, through short-lived links.
-- =====================================================================
alter table public.profiles add column if not exists id_photo      text;   -- path in the student-ids bucket
alter table public.profiles add column if not exists id_doc        text;   -- path in the student-ids bucket
alter table public.profiles add column if not exists id_type       text;   -- school ID, passport, national ID card, driver's licence, other
alter table public.profiles add column if not exists id_status     text not null default 'none';   -- none | submitted | verified | rejected
alter table public.profiles add column if not exists id_checked_at timestamptz;
alter table public.profiles add column if not exists id_checked_by text;
alter table public.profiles add column if not exists id_note       text;

alter table public.exam_seats add column if not exists idcheck jsonb;    -- { status: match | mismatch, at, by } from the exam room

insert into storage.buckets (id, name, public, file_size_limit)
values ('student-ids', 'student-ids', false, 8388608)
on conflict (id) do update set public = false, file_size_limit = 8388608;
-- (no storage policies: nobody reads these files directly)
