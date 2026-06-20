// E-mail voor de intake-flow via Resend.
// Het contactformulier blijft via Web3Forms (src/lib/email.ts) lopen.
import { Resend } from "resend";

function getClient(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY ontbreekt.");
  return new Resend(key);
}

function getFrom(): string {
  const from = process.env.RESEND_FROM;
  if (!from) throw new Error("RESEND_FROM ontbreekt.");
  return from;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Stuurt de magic link met het intake-formulier naar de klant. */
export async function sendIntakeMagicLink(args: {
  toEmail: string;
  name?: string | null;
  link: string;
}): Promise<void> {
  const greeting = args.name ? `Beste ${escapeHtml(args.name)},` : "Beste,";
  const safeLink = escapeHtml(args.link);

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#1f2937; line-height:1.6;">
      <p>${greeting}</p>
      <p>Fijn dat jullie aan de slag willen. Via onderstaande knop vul je het
      intake-formulier in. Zo kan ik onze eerste afspraak goed voorbereiden.</p>
      <p style="margin:28px 0;">
        <a href="${safeLink}"
           style="background:#946B66;color:#fff;text-decoration:none;padding:12px 22px;border-radius:9999px;display:inline-block;font-weight:600;">
          Open het intake-formulier
        </a>
      </p>
      <p>Werkt de knop niet? Kopieer dan deze link in je browser:<br>
        <a href="${safeLink}">${safeLink}</a></p>
      <p>Deze link is persoonlijk en blijft een beperkte tijd geldig.</p>
      <p>Hartelijke groet,<br>Eva Mulder<br>Relatiepraktijk de Nieuwe Weelde</p>
    </div>
  `;

  const text = `${args.name ? `Beste ${args.name},` : "Beste,"}

Fijn dat jullie aan de slag willen. Vul het intake-formulier in via deze link:
${args.link}

Deze link is persoonlijk en blijft een beperkte tijd geldig.

Hartelijke groet,
Eva Mulder
Relatiepraktijk de Nieuwe Weelde`;

  const { error } = await getClient().emails.send({
    from: getFrom(),
    to: args.toEmail,
    subject: "Je intake-formulier — Relatiepraktijk de Nieuwe Weelde",
    html,
    text,
  });
  if (error) throw new Error(`Resend fout: ${error.message}`);
}

/** Notificatie aan Eva dat er een nieuwe intake is ingevuld. */
export async function sendIntakeSubmittedNotice(args: {
  name?: string | null;
  email?: string | null;
}): Promise<void> {
  const eva = process.env.EVA_EMAIL;
  if (!eva) throw new Error("EVA_EMAIL ontbreekt.");

  const naam = args.name ? escapeHtml(args.name) : "(onbekend)";
  const mail = args.email ? escapeHtml(args.email) : "(onbekend)";

  const { error } = await getClient().emails.send({
    from: getFrom(),
    to: eva,
    subject: "Nieuwe intake ingevuld",
    html: `<p>Er is een nieuw intake-formulier ingevuld.</p>
           <p><strong>Naam:</strong> ${naam}<br>
           <strong>E-mail:</strong> ${mail}</p>
           <p>Bekijk de inzending in de Supabase-tabel <code>intake_submissions</code>.</p>`,
    text: `Er is een nieuw intake-formulier ingevuld.\nNaam: ${args.name ?? "(onbekend)"}\nE-mail: ${args.email ?? "(onbekend)"}`,
  });
  if (error) throw new Error(`Resend fout: ${error.message}`);
}
