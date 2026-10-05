import { getAdminSession } from "@/lib/auth";
import { sendPushToAll } from "@/lib/push";

export const runtime = "nodejs";

// Testmelding naar alle aangemelde apparaten.
export async function POST() {
  const admin = await getAdminSession();
  if (!admin) return Response.json({ error: "Niet ingelogd" }, { status: 401 });

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
