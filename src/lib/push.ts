// Web Push naar de admin (Android/Chrome). Alleen server-side.
// Sleutels maken: `npm run push:keys`.
import webpush from "web-push";
import { getSql } from "@/lib/db";

export type PushPayload = {
  title: string;
  body: string;
  url?: string;
  tag?: string;
};

let configured: boolean | null = null;

function configure(): boolean {
  if (configured !== null) return configured;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:info@praktijkdenieuweweelde.nl";
  if (!publicKey || !privateKey) {
    configured = false;
    return false;
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
  return true;
}

export function isPushConfigured(): boolean {
  return configure();
}

/** Stuurt een melding naar alle geregistreerde apparaten. Retourneert het aantal geslaagde verzendingen. */
export async function sendPushToAll(payload: PushPayload): Promise<number> {
  if (!configure()) return 0;
  const sql = getSql();
  const subs = (await sql`
    select endpoint, p256dh, auth from push_subscriptions
  `) as { endpoint: string; p256dh: string; auth: string }[];

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
