-- =========================================================
-- Relatiepraktijk de Nieuwe Weelde — initieel schema
-- Intake (magic-link uitnodigingen + inzendingen) en chat.
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

-- ---------- Intake (magic-link uitnodigingen + inzendingen) ----------

-- Uitnodigingen: één rij per magic link. We bewaren NOOIT de ruwe token,
-- alleen de SHA-256 hash. De link is eenmalig (used_at) en verlopend (expires_at).
create table if not exists public.intake_invites (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  client_name   text,
  client_email  text not null,
  token_hash    text not null unique,
  expires_at    timestamptz not null,
  used_at       timestamptz,
  submission_id uuid,
  created_by    uuid
);

create index if not exists intake_invites_token_idx   on public.intake_invites(token_hash);
create index if not exists intake_invites_expires_idx on public.intake_invites(expires_at);

-- Inzendingen: de antwoorden staan in een flexibele JSONB-kolom zodat het
-- formulier later kan groeien/wijzigen zonder database-migratie.
create table if not exists public.intake_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  invite_id    uuid references public.intake_invites(id) on delete set null,
  client_name  text,
  client_email text,
  answers      jsonb not null default '{}'::jsonb,
  status       text not null default 'submitted'
);

-- ---------- Row Level Security ----------

alter table public.chat_sessions       enable row level security;
alter table public.chat_messages       enable row level security;
alter table public.intake_invites      enable row level security;
alter table public.intake_submissions  enable row level security;

-- Anon mag NIETS direct lezen/schrijven. Alle writes lopen via server-side
-- API routes met de service-role key.
-- Service-role bypassed RLS automatisch; geen policy nodig voor server-side schrijven.

-- ---------- Bewaartermijn-helper ----------

-- Chat sessions + messages ouder dan 30 dagen wissen.
create or replace function public.purge_old_chat()
returns void language sql security definer as $$
  delete from public.chat_sessions where created_at < now() - interval '30 days';
$$;

-- Beperk wie deze SECURITY DEFINER-functie mag aanroepen: nooit anon/authenticated
-- (Postgres geeft EXECUTE standaard aan PUBLIC). Alleen server-side/service-role.
revoke execute on function public.purge_old_chat() from public;
revoke execute on function public.purge_old_chat() from anon, authenticated;
