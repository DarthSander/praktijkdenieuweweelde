import { getAdminSession } from "@/lib/auth";
import { isPushConfigured, sendPushToAll } from "@/lib/push";

export const runtime = "nodejs";

// Testmelding naar alle aangemelde apparaten.
export async function POST() {
  const admin = await getAdminSession();
  if (!admin) return Response.json({ error: "Niet ingelogd" }, { status: 401 });

  if (!isPushConfigured()) {
    return Response.json(
      { error: "VAPID-sleutels ontbreken (NEXT_PUBLIC_VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY)." },
      { status: 500 }
    );
  }

  try {
    const sent = await sendPushToAll({
      title: "Testmelding",
      body: "Pushmeldingen werken.",
      url: "/admin/analyse",
      tag: "test",
    });
    return Response.json({ ok: true, sent });
  } catch (err) {
    console.error("Testmelding mislukt", err);
    return Response.json({ error: "Versturen mislukt" }, { status: 500 });
  }
}
