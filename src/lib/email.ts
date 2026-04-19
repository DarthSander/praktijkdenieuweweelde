// Verstuurt e-mail via Web3Forms (zelfde route als het contactformulier).
// Zet optioneel WEB3FORMS_ACCESS_KEY in env om de key te overschrijven.

const FALLBACK_KEY = "cd65f5d3-eb8f-4281-91e1-94e7d38bd740";

type SendArgs = {
  subject: string;
  body: string;
  fromName?: string;
  toEmail?: string; // override; standaard via Web3Forms naar Eva's account
};

export async function sendNotificationEmail({ subject, body, fromName, toEmail }: SendArgs) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY ?? FALLBACK_KEY;
  const payload: Record<string, unknown> = {
    access_key: accessKey,
    subject,
    message: body,
    from_name: fromName ?? "Relatiepraktijk de Nieuwe Weelde",
  };
  if (toEmail) payload.to = toEmail;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`web3forms HTTP ${res.status}`);
  const json = (await res.json()) as { success?: boolean; message?: string };
  if (!json.success) throw new Error(json.message ?? "web3forms error");
}
