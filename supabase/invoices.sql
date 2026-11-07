-- =====================================================================
--  INVOICES AND RECEIPTS  ·  run once in Supabase → SQL Editor (after schema.sql)
--  Someone registers → a draft invoice is made and you're emailed.
--  You check and sign it → it's emailed to them. They upload proof of payment →
--  you confirm → a signed receipt is emailed and their courses open.
-- =====================================================================
create table if not exists public.invoices (
  id            uuid primary key default gen_random_uuid(),
  number        text unique not null,                -- EA-2026-0001
  user_id       uuid references public.profiles(id) on delete set null,
  bill_name     text,
  bill_email    text,
  plan          text,
  billing       text default 'month',                -- month | year
  courses       jsonb not null default '[]',         -- course slugs opened when paid
  edition       text not null default 'student',
  books         boolean not null default false,
  items         jsonb not null default '[]',         -- [{ desc, qty, unit }]
  discount      numeric(10,2) not null default 0,
  tax_pct       numeric(5,2) not null default 0,
  total         numeric(10,2) not null default 0,    -- what the student owes (auto-calculated, can be changed)
  total_manual  boolean not null default false,
  currency      text not null default 'USD',
  due_date      date,
  notes         text,
  pay_info      text,                                -- how to pay (bank details etc.)
  status        text not null default 'draft' check (status in ('draft','sent','proof','paid','void')),
  checked       boolean not null default false,      -- you ticked "I've checked this amount"
  signature     text,                                -- your e-signature (image data)
  signed_by     text,
  sent_at       timestamptz,
  proof_path    text,                                -- in the payment-proofs bucket
  proof_note    text,
  proof_at      timestamptz,
  paid_at       timestamptz,
  paid_amount   numeric(10,2),
  receipt_no    text,
  created_at    timestamptz not null default now()
);
create index if not exists invoices_user on public.invoices (user_id, created_at desc);
alter table public.invoices enable row level security;
-- (no policies: only the invoices Netlify function reads or writes them)

insert into storage.buckets (id, name, public, file_size_limit)
values ('payment-proofs', 'payment-proofs', false, 10485760)
on conflict (id) do update set public = false, file_size_limit = 10485760;

-- ---------------------------------------------------------------------
--  Added Nov 2026: how the student paid and their MTCN / transfer number.
--  Safe to run again. Run this block once in Supabase → SQL Editor.
-- ---------------------------------------------------------------------
alter table public.invoices add column if not exists proof_method text;
alter table public.invoices add column if not exists proof_ref    text;
create index if not exists invoices_pending on public.invoices (status) where status = 'proof';
