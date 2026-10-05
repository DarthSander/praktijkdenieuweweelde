-- =========================================================
-- Relatiepraktijk de Nieuwe Weelde — databaseschema (Neon Postgres)
-- Intake, chat, bezoekersanalyse en pushmeldingen.
-- Idempotent: veilig om meerdere keren uit te voeren (npm run db:migrate).
-- Alle toegang loopt server-side via DATABASE_URL; de browser praat nooit
-- rechtstreeks met de database.
-- =========================================================

-- ---------- Chat ----------

create table if not exists chat_sessions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  page_url     text,
  user_agent   text,
  consent_ai   boolean not null default false
);

create table if not exists chat_messages (
  id          bigserial primary key,
  session_id  uuid not null references chat_sessions(id) on delete cascade,
  role        text not null check (role in ('user','assistant','system')),
  content     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists chat_messages_session_idx on chat_messages(session_id, created_at);

-- ---------- Intake (magic-link uitnodigingen + inzendingen) ----------

-- Uitnodigingen: één rij per magic link. We bewaren NOOIT de ruwe token,
-- alleen de SHA-256 hash. De link is eenmalig (used_at) en verlopend (expires_at).
create table if not exists intake_invites (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  client_name   text,
  client_email  text not null,
  token_hash    text not null unique,
  expires_at    timestamptz not null,
  used_at       timestamptz,
  submission_id uuid,
  created_by    text
);

create index if not exists intake_invites_token_idx   on intake_invites(token_hash);
create index if not exists intake_invites_expires_idx on intake_invites(expires_at);

-- Inzendingen: de antwoorden staan in een flexibele JSONB-kolom zodat het
-- formulier later kan groeien/wijzigen zonder database-migratie.
create table if not exists intake_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  invite_id    uuid references intake_invites(id) on delete set null,
  client_name  text,
  client_email text,
  answers      jsonb not null default '{}'::jsonb,
  status       text not null default 'submitted'
);

-- ---------- Bezoekersanalyse ----------

-- Eén rij per browser (vast ID uit localStorage).
create table if not exists visitors (
  id           uuid primary key,
  first_seen   timestamptz not null default now(),
  last_seen    timestamptz not null default now(),
  country      text,
  region       text,
  city         text,
  device       text,
  browser      text,
  os           text
);

create index if not exists visitors_last_seen_idx on visitors(last_seen desc);

-- Eén rij per bezoek (sessie). Nieuw bezoek na 30 minuten inactiviteit.
create table if not exists visits (
  id                uuid primary key,
  visitor_id        uuid not null references visitors(id) on delete cascade,
  started_at        timestamptz not null default now(),
  last_activity_at  timestamptz not null default now(),
  landing_path      text not null,
  current_path      text,
  referrer          text,
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  country           text,
  region            text,
  city              text
);

create index if not exists visits_visitor_idx  on visits(visitor_id, started_at desc);
create index if not exists visits_activity_idx on visits(last_activity_at desc);

-- Eén rij per bekeken pagina.
create table if not exists pageviews (
  id              uuid primary key,
  visit_id        uuid not null references visits(id) on delete cascade,
  visitor_id      uuid not null references visitors(id) on delete cascade,
  path            text not null,
  title           text,
  entered_at      timestamptz not null default now(),
  last_seen_at    timestamptz not null default now(),
  duration_ms     integer not null default 0,
  max_scroll_pct  smallint not null default 0
);

create index if not exists pageviews_visit_idx   on pageviews(visit_id, entered_at);
create index if not exists pageviews_visitor_idx on pageviews(visitor_id, entered_at desc);

-- Hoe lang een gedeelte (sectie) van een pagina in beeld was.
create table if not exists section_views (
  pageview_id  uuid not null references pageviews(id) on delete cascade,
  section_id   text not null,
  label        text,
  visible_ms   integer not null default 0,
  primary key (pageview_id, section_id)
);

-- ---------- Pushmeldingen (admin) ----------

create table if not exists push_subscriptions (
  endpoint    text primary key,
  p256dh      text not null,
  auth        text not null,
  user_agent  text,
  created_at  timestamptz not null default now()
);

-- ---------- Instellingen ----------

-- Automatisch aangemaakte instellingen, zoals de VAPID-sleutels voor push
-- (alleen als ze niet als env-variabele zijn gezet).
create table if not exists app_settings (
  key         text primary key,
  value       text not null,
  created_at  timestamptz not null default now()
);

-- ---------- Bewaartermijn-helper ----------

-- Chat sessions + messages ouder dan 30 dagen wissen.
create or replace function purge_old_chat()
returns void language sql as $$
  delete from chat_sessions where created_at < now() - interval '30 days';
$$;
