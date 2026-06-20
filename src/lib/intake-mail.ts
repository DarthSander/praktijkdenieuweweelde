// E-mail voor de intake-flow via Strato SMTP (nodemailer).
// Het contactformulier blijft via Web3Forms (src/lib/email.ts) lopen.
import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransport(): Transporter {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 465;
  if (!host || !user || !pass) {
    throw new Error("SMTP-config ontbreekt (SMTP_HOST, SMTP_USER of SMTP_PASS).");
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user, pass },
  });
  return transporter;
}

// Strato verlangt dat het From-adres het geauthenticeerde postvak is.
function getFrom(): string {
  const explicit = process.env.SMTP_FROM;
  if (explicit) return explicit;
  const user = process.env.SMTP_USER ?? "Info@praktijkdenieuweweelde.nl";
  return `Relatiepraktijk de Nieuwe Weelde <${user}>`;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Stuurt de magic link met het intakeformulier naar de klant. */
export async function sendIntakeMagicLink(args: {
  toEmail: string;
  name?: string | null;
  link: string;
}): Promise<void> {
  const greeting = args.name ? `Beste ${escapeHtml(args.name)},` : "Beste,";
  const safeLink = escapeHtml(args.link);

  // E-mail in de huisstijl van de website (crème achtergrond, witte kaart,
  // Playfair-achtige serif kop, sage CTA-knop). Tabel-gebaseerd en met inline
  // styles voor betrouwbare weergave in e-mailclients.
  const html = `
  <!doctype html>
  <html lang="nl">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#F5F0EB;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0EB;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;">
            <!-- merkkop -->
            <tr>
              <td align="center" style="padding:8px 0 22px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:bold;color:#946B66;letter-spacing:.3px;">
                  Relatiepraktijk de Nieuwe Weelde
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8A7F7C;letter-spacing:.08em;text-transform:uppercase;margin-top:6px;">
                  Relatietherapie aan huis · Tilburg
                </div>
              </td>
            </tr>
            <!-- kaart -->
            <tr>
              <td style="background:#ffffff;border-radius:16px;box-shadow:0 8px 30px rgba(94,82,79,.08);padding:40px 40px 36px;">
                <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:bold;color:#6B6866;line-height:1.25;">
                  Je intakeformulier
                </h1>
                <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#5E524F;">
                  ${greeting}
                </p>
                <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#5E524F;">
                  Fijn dat jullie aan de slag willen. Via onderstaande knop open je
                  jouw persoonlijke intakeformulier. Vul het rustig en zelfstandig in
                  &mdash; zo kan ik onze eerste afspraak goed voorbereiden.
                </p>
                <!-- CTA -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                  <tr>
                    <td align="center" bgcolor="#946B66" style="border-radius:9999px;">
                      <a href="${safeLink}" target="_blank"
                         style="display:inline-block;padding:14px 30px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:9999px;">
                        Open het intakeformulier
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#8A7F7C;">
                  Werkt de knop niet? Kopieer dan deze link in je browser:<br>
                  <a href="${safeLink}" target="_blank" style="color:#946B66;word-break:break-all;">${safeLink}</a>
                </p>
                <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#8A7F7C;">
                  Deze link is persoonlijk en blijft een beperkte tijd geldig.
                </p>
                <div style="border-top:1px solid #EDE6DD;padding-top:20px;">
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#5E524F;">
                    Hartelijke groet,<br>
                    <span style="font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#6B6866;">Eva Mulder</span><br>
                    <span style="font-size:14px;color:#8A7F7C;">Relatietherapeut · de Nieuwe Weelde</span>
                  </p>
                </div>
              </td>
            </tr>
            <!-- voettekst -->
            <tr>
              <td align="center" style="padding:24px 16px 8px;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;line-height:1.7;color:#A19890;">
                Relatiepraktijk de Nieuwe Weelde · Tilburg e.o.<br>
                <a href="mailto:info@praktijkdenieuweweelde.nl" style="color:#946B66;text-decoration:none;">info@praktijkdenieuweweelde.nl</a>
                &nbsp;·&nbsp; 06 10096923
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  const text = `${args.name ? `Beste ${args.name},` : "Beste,"}

Fijn dat jullie aan de slag willen. Vul het intakeformulier in via deze link:
${args.link}

Deze link is persoonlijk en blijft een beperkte tijd geldig.

Hartelijke groet,
Eva Mulder
Relatiepraktijk de Nieuwe Weelde`;

  await getTransport().sendMail({
    from: getFrom(),
    to: args.toEmail,
    subject: "Je intakeformulier — Relatiepraktijk de Nieuwe Weelde",
    html,
    text,
  });
}

/** Notificatie aan Eva dat er een nieuwe intake is ingevuld. */
export async function sendIntakeSubmittedNotice(args: {
  name?: string | null;
  email?: string | null;
}): Promise<void> {
  // Notificatie gaat naar Eva: EVA_EMAIL, anders MAIL_TO, anders het SMTP-postvak.
  const to =
    process.env.EVA_EMAIL ||
    process.env.MAIL_TO ||
    process.env.SMTP_USER;
  if (!to) throw new Error("Geen ontvanger voor notificatie (EVA_EMAIL/MAIL_TO/SMTP_USER).");

  const naam = args.name ? escapeHtml(args.name) : "(onbekend)";
  const mail = args.email ? escapeHtml(args.email) : "(onbekend)";

  await getTransport().sendMail({
    from: getFrom(),
    to,
    subject: "Nieuwe intake ingevuld",
    html: `<p>Er is een nieuw intakeformulier ingevuld.</p>
           <p><strong>Naam:</strong> ${naam}<br>
           <strong>E-mail:</strong> ${mail}</p>
           <p>Bekijk en download de inzending in de admin onder <strong>Intake</strong>.</p>`,
    text: `Er is een nieuw intakeformulier ingevuld.\nNaam: ${args.name ?? "(onbekend)"}\nE-mail: ${args.email ?? "(onbekend)"}\n\nBekijk de inzending in de admin onder Intake.`,
  });
}
