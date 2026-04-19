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

-- ---------- Row Level Security ----------

alter table public.chat_sessions       enable row level security;
alter table public.chat_messages       enable row level security;

-- Anon mag NIETS direct lezen/schrijven. Alle writes lopen via server-side
-- API routes met de service-role key.
-- Service-role bypassed RLS automatisch; geen policy nodig voor server-side schrijven.

-- ---------- Bewaartermijn-helpers (optioneel, draai handmatig of via cron) ----------

-- Chat sessions + messages ouder dan 30 dagen wissen
create or replace function public.purge_old_chat()
returns void language sql security definer as $$
  delete from public.chat_sessions where created_at < now() - interval '30 days';
$$;

-- ---------- Opruimen van oude tabellen (eenmalig, als je van een eerdere versie komt) ----------
-- Draai handmatig als je de oude intake/availability-tabellen nog in je database hebt staan:
--
--   drop table if exists public.availability_slots cascade;
--   drop table if exists public.intake_submissions cascade;
