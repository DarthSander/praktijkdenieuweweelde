// Intake magic-link-logica.
// We bewaren nooit de ruwe token in de database — alleen de SHA-256 hash.
// De ruwe token zit alleen in de magic link (de e-mail naar de klant).
import { randomBytes, randomUUID, createHash } from "node:crypto";
import { getSql } from "@/lib/db";

const DEFAULT_EXPIRY_DAYS = 14;

// Neon geeft timestamptz-kolommen terug als Date-objecten.
export type InviteRow = {
  id: string;
  created_at: Date;
  client_name: string | null;
  client_email: string;
  token_hash: string;
  expires_at: Date;
  used_at: Date | null;
  submission_id: string | null;
  created_by: string | null;
};

export type ValidationResult =
  | { ok: true; invite: InviteRow }
  | { ok: false; reason: "invalid" | "expired" | "used" };

function expiryDays(): number {
  const raw = Number(process.env.INTAKE_INVITE_EXPIRY_DAYS);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_EXPIRY_DAYS;
}

/** Cryptografisch random token voor in de magic link. */
export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

/** SHA-256 hash (hex) van de ruwe token — dit wordt opgeslagen. */
export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

/**
 * Maakt een uitnodiging aan: genereert een token, slaat de hash op en
 * retourneert de ruwe token zodat de aanroeper de magic link kan bouwen.
 */
export async function createInvite(args: {
  name?: string | null;
  email: string;
  createdBy?: string | null;
}): Promise<{ inviteId: string; rawToken: string; expiresAt: string }> {
  const sql = getSql();
  const rawToken = generateToken();
  const expiresAt = new Date(
    Date.now() + expiryDays() * 24 * 60 * 60 * 1000
  ).toISOString();

  const rows = (await sql`
    insert into intake_invites (client_name, client_email, token_hash, expires_at, created_by)
    values (${args.name ?? null}, ${args.email}, ${hashToken(rawToken)}, ${expiresAt}, ${args.createdBy ?? null})
    returning id
  `) as { id: string }[];
  const data = rows[0];

  if (!data) {
    throw new Error("Kon uitnodiging niet aanmaken.");
  }

  return { inviteId: data.id, rawToken, expiresAt };
}

/** Valideert een ruwe token: bestaat hij, niet verlopen en niet gebruikt? */
export async function getValidInvite(rawToken: string): Promise<ValidationResult> {
  if (!rawToken) return { ok: false, reason: "invalid" };

  let data: InviteRow | undefined;
  try {
    const sql = getSql();
    const rows = (await sql`
      select id, created_at, client_name, client_email, token_hash, expires_at,
             used_at, submission_id, created_by
      from intake_invites
      where token_hash = ${hashToken(rawToken)}
      limit 1
    `) as InviteRow[];
    data = rows[0];
  } catch (err) {
    console.error("Kon uitnodiging niet ophalen", err);
    return { ok: false, reason: "invalid" };
  }

  if (!data) return { ok: false, reason: "invalid" };
  if (data.used_at) return { ok: false, reason: "used" };
  if (new Date(data.expires_at).getTime() <= Date.now()) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true, invite: data };
}

/**
 * Slaat een inzending op en sluit de uitnodiging af (eenmalig gebruik).
 * Valideert de token opnieuw vlak voor het schrijven.
 */
export async function recordSubmission(
  rawToken: string,
  answers: Record<string, unknown>
): Promise<{ submissionId: string; invite: InviteRow }> {
  const validation = await getValidInvite(rawToken);
  if (!validation.ok) {
    throw new Error(`Uitnodiging niet geldig: ${validation.reason}`);
  }
  const invite = validation.invite;
  const sql = getSql();

  // Eén atomaire query: uitnodiging afsluiten (alleen als used_at nog leeg is,
  // dat voorkomt dubbele inzendingen bij een race) en de inzending opslaan.
  // Mislukt een stap, dan gebeurt er niets.
  const submissionId = randomUUID();
  const rows = (await sql`
    with claimed as (
      update intake_invites
      set used_at = now(), submission_id = ${submissionId}
      where id = ${invite.id} and used_at is null
      returning id, client_name, client_email
    )
    insert into intake_submissions (id, invite_id, client_name, client_email, answers)
    select ${submissionId}, id, client_name, client_email, ${JSON.stringify(answers)}::jsonb
    from claimed
    returning id
  `) as { id: string }[];
  const submission = rows[0];
  if (!submission) {
    throw new Error("Uitnodiging niet geldig: used");
  }

  return { submissionId: submission.id, invite };
}
