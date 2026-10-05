// Web Push naar de admin (Android/Chrome). Alleen server-side.
// Sleutels worden automatisch aangemaakt en in de database bewaard; optioneel
// kun je eigen sleutels zetten met `npm run push:keys`.
import webpush from "web-push";
import { getSql } from "@/lib/db";

export type PushPayload = {
  title: string;
  body: string;
  url?: string;
  tag?: string;
};

type VapidKeys = { publicKey: string; privateKey: string };

let cachedKeys: VapidKeys | null = null;
let configured = false;

/**
 * VAPID-sleutels: uit de env-variabelen als die gezet zijn, anders uit de
 * database. Bestaan ze daar nog niet, dan worden ze eenmalig aangemaakt.
 */
export async function getVapidKeys(): Promise<VapidKeys> {
  if (cachedKeys) return cachedKeys;

  const envPublic = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const envPrivate = process.env.VAPID_PRIVATE_KEY;
  if (envPublic && envPrivate) {
    cachedKeys = { publicKey: envPublic, privateKey: envPrivate };
    return cachedKeys;
  }

  const sql = getSql();
  let rows = (await sql`
    select value from app_settings where key = 'vapid_keys'
  `) as { value: string }[];
  if (!rows.length) {
    // "on conflict do nothing" + opnieuw lezen: bij gelijktijdige aanroepen
    // wint één set sleutels.
    await sql`
      insert into app_settings (key, value)
      values ('vapid_keys', ${JSON.stringify(webpush.generateVAPIDKeys())})
      on conflict (key) do nothing
    `;
    rows = (await sql`
      select value from app_settings where key = 'vapid_keys'
    `) as { value: string }[];
  }
  const stored = JSON.parse(rows[0].value) as VapidKeys;
  cachedKeys = { publicKey: stored.publicKey, privateKey: stored.privateKey };
  return cachedKeys;
}

async function configure(): Promise<void> {
  if (configured) return;
  const { publicKey, privateKey } = await getVapidKeys();
  const subject = process.env.VAPID_SUBJECT || "mailto:info@praktijkdenieuweweelde.nl";
  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
}

/** Stuurt een melding naar alle geregistreerde apparaten. Retourneert het aantal geslaagde verzendingen. */
export async function sendPushToAll(payload: PushPayload): Promise<number> {
  const sql = getSql();
  const subs = (await sql`
    select endpoint, p256dh, auth from push_subscriptions
  `) as { endpoint: string; p256dh: string; auth: string }[];
  if (!subs.length) return 0;
  await configure();

  const body = JSON.stringify(payload);
  const results = await Promise.allSettled(
    subs.map((s) =>
      webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        body,
        { TTL: 60 * 60, urgency: "high" }
      )
    )
  );

  let sent = 0;
  const expired: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      sent++;
      return;
    }
    const status = (r.reason as { statusCode?: number })?.statusCode;
    if (status === 404 || status === 410) {
      expired.push(subs[i].endpoint);
    } else {
      console.error("Pushmelding mislukt", status, r.reason);
    }
  });

  if (expired.length) {
    await sql`delete from push_subscriptions where endpoint = any(${expired}::text[])`;
  }
  return sent;
}
