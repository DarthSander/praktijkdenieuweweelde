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

-- Eén rij per aanvraag via het contactformulier, gekoppeld aan het bezoek.
-- Bewust ZONDER naam, e-mail of bericht: die gaan via het formulier naar de
-- mailbox. Hier staat alleen wanneer iemand contact opnam en welke route
-- daaraan voorafging, zodat zichtbaar wordt welke pagina's tot aanvragen leiden.
-- on delete set null: een aanvraag blijft bestaan als bezoekgegevens worden gewist.
create table if not exists leads (
  id          uuid primary key,
  created_at  timestamptz not null default now(),
  kind        text not null check (kind in ('contact','intake')),
  visitor_id  uuid references visitors(id) on delete set null,
  visit_id    uuid references visits(id) on delete set null,
  path        text
);

create index if not exists leads_created_idx on leads(created_at desc);
create index if not exists leads_visit_idx   on leads(visit_id);

-- Eén aanvraag per bezoek per soort: voorkomt dubbeltellingen bij dubbelklikken.
create unique index if not exists leads_visit_kind_idx on leads(visit_id, kind);

-- Eén rij per keer dat een AI-assistent een pagina ophaalt. Dit verkeer komt
-- nooit in de bezoekersanalyse terecht: dat script draait in de browser en
-- bots voeren geen JavaScript uit.
--   kind = 'antwoord' : opgehaald tijdens het beantwoorden van een vraag
--   kind = 'index'    : opgehaald om te doorzoeken of te trainen
create table if not exists bot_hits (
  id          uuid primary key default gen_random_uuid(),
  seen_at     timestamptz not null default now(),
  bot         text not null,
  kind        text not null check (kind in ('antwoord','index')),
  path        text not null,
  user_agent  text
);

create index if not exists bot_hits_seen_idx on bot_hits(seen_at desc);
create index if not exists bot_hits_bot_idx  on bot_hits(bot, seen_at desc);

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

-- Chat sessions + messages ouder dan 30 dagen wissen. De privacyverklaring
-- belooft dat dit vanzelf gebeurt; /api/cron/purge roept dit dagelijks aan.
-- Het aantal gewiste gesprekken komt terug, zodat de aanroeper iets kan loggen.
-- Eerst droppen: een bestaande functie kan niet van retourtype veranderen.
drop function if exists purge_old_chat();
create function purge_old_chat()
returns integer language plpgsql as $$
declare verwijderd integer;
begin
  delete from chat_sessions where created_at < now() - interval '30 days';
  get diagnostics verwijderd = row_count;
  return verwijderd;
end;
$$;

-- ---------- Eenmalige correctie ----------

-- De twee aanvragen van 12 oktober 17:26 en 13 oktober 2026 11:59 werden
-- verstuurd voordat het vastleggen van aanvragen live stond. Ze worden hier
-- alsnog gekoppeld aan het bezoek dat eraan voorafging.
--
-- Het juiste bezoek is het bezoek dat op dat moment liep én waarbij de sectie
-- met het contactformulier in beeld is geweest; dat laatste onderscheidt de
-- invuller van andere bezoekers op hetzelfde moment. Is er geen bezoek dat aan
-- beide voorwaarden voldoet, dan wordt er niets vastgelegd — liever geen regel
-- dan een verkeerde. Herhaald uitvoeren voegt niets toe (zie de unieke index),
-- dus dit blok mag blijven staan en mag ook weg zodra het is uitgevoerd.
insert into leads (id, visitor_id, visit_id, kind, path, created_at)
select gen_random_uuid(), gekozen.visitor_id, gekozen.id, 'contact', '/', t.moment
from (values (timestamptz '2026-10-12 17:26+02'),
             (timestamptz '2026-10-13 11:59+02')) as t(moment)
join lateral (
  select v.id, v.visitor_id,
         (select max(s.visible_ms)
            from section_views s
            join pageviews p on p.id = s.pageview_id
           where p.visit_id = v.id and s.section_id = 'contact') as contact_ms
  from visits v
  where v.started_at <= t.moment + interval '2 minutes'
    and v.last_activity_at >= t.moment - interval '20 minutes'
  order by contact_ms desc nulls last
  limit 1
) gekozen on gekozen.contact_ms > 0
on conflict (visit_id, kind) do nothing;
