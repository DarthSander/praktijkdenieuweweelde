-- =========================================================
-- Relatiepraktijk de Nieuwe Weelde — Supabase schema
-- Voer dit uit in: Supabase Dashboard > SQL Editor > New query
-- =========================================================

-- ---------- Tabellen ----------

create table if not exists public.chat_sessions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  page_url     text,
  user_agent   text,
  consent_ai   boolean not null default false
);

create table if not exists public.chat_messages (
  id          bigserial primary key,
  session_id  uuid not null references public.chat_sessions(id) on delete cascade,
  role        text not null check (role in ('user','assistant','system')),
  content     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists chat_messages_session_idx on public.chat_messages(session_id, created_at);

create table if not exists public.intake_submissions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  alone_or_couple   text not null check (alone_or_couple in ('alleen','samen')),
  gender            text,
  problem           text,
  ai_answers        jsonb,             -- {q1, a1, q2, a2, q3, a3, summary}
  ai_summary        text,              -- door AI gegenereerde 2-zin samenvatting voor Eva
  naam              text not null,
  partner_naam      text,
  email             text not null,
  telefoon          text,
  slot_id           uuid,
  status            text not null default 'new' check (status in ('new','confirmed','cancelled','done')),
  consent_ai        boolean not null default false,
  consent_storage   boolean not null default false,
  notes             text
);

create table if not exists public.availability_slots (
  id          uuid primary key default gen_random_uuid(),
  starts_at   timestamptz not null unique,
  ends_at     timestamptz not null,
  is_blocked  boolean not null default false,
  is_booked   boolean not null default false,
  booked_by   uuid references public.intake_submissions(id) on delete set null,
  created_at  timestamptz not null default now()
);

create index if not exists availability_starts_idx on public.availability_slots(starts_at);

-- FK van intake -> slot (nu de tabel bestaat)
do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
    where constraint_name = 'intake_submissions_slot_id_fkey'
  ) then
    alter table public.intake_submissions
      add constraint intake_submissions_slot_id_fkey
      foreign key (slot_id) references public.availability_slots(id) on delete set null;
  end if;
end $$;

-- ---------- Row Level Security ----------

alter table public.chat_sessions       enable row level security;
alter table public.chat_messages       enable row level security;
alter table public.intake_submissions  enable row level security;
alter table public.availability_slots  enable row level security;

-- Anon mag NIETS direct lezen/schrijven. Alle writes lopen via server-side
-- API routes met de service-role key. We laten alleen één publieke read toe:
-- het ophalen van vrije slots (zonder PII).

drop policy if exists "anon kan vrije slots zien" on public.availability_slots;
create policy "anon kan vrije slots zien"
  on public.availability_slots
  for select
  to anon
  using (is_blocked = false and is_booked = false and starts_at > now());

-- Service-role bypassed RLS automatisch; geen policy nodig voor server-side schrijven.

-- ---------- Bewaartermijn-helpers (optioneel, draai handmatig of via cron) ----------

-- Chat sessions + messages ouder dan 30 dagen wissen
create or replace function public.purge_old_chat()
returns void language sql security definer as $$
  delete from public.chat_sessions where created_at < now() - interval '30 days';
$$;

-- Intake submissions ouder dan 6 maanden wissen
create or replace function public.purge_old_intakes()
returns void language sql security definer as $$
  delete from public.intake_submissions
   where created_at < now() - interval '6 months'
     and status in ('done','cancelled');
$$;
