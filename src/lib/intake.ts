// Intake magic-link-logica.
// We bewaren nooit de ruwe token in de database — alleen de SHA-256 hash.
// De ruwe token zit alleen in de magic link (de e-mail naar de klant).
import { randomBytes, createHash } from "node:crypto";
import { getServerSupabase } from "@/lib/supabase";

const DEFAULT_EXPIRY_DAYS = 14;

export type InviteRow = {
  id: string;
  created_at: string;
  client_name: string | null;
  client_email: string;
  token_hash: string;
  expires_at: string;
  used_at: string | null;
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
  const supabase = getServerSupabase();
  const rawToken = generateToken();
  const expiresAt = new Date(
    Date.now() + expiryDays() * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from("intake_invites")
    .insert({
      client_name: args.name ?? null,
      client_email: args.email,
      token_hash: hashToken(rawToken),
      expires_at: expiresAt,
      created_by: args.createdBy ?? null,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`Kon uitnodiging niet aanmaken: ${error?.message ?? "onbekend"}`);
  }

  return { inviteId: data.id, rawToken, expiresAt };
}

/** Valideert een ruwe token: bestaat hij, niet verlopen en niet gebruikt? */
export async function getValidInvite(rawToken: string): Promise<ValidationResult> {
  if (!rawToken) return { ok: false, reason: "invalid" };

  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("intake_invites")
    .select("*")
    .eq("token_hash", hashToken(rawToken))
    .maybeSingle<InviteRow>();

  if (error || !data) return { ok: false, reason: "invalid" };
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
  const supabase = getServerSupabase();

  const { data: submission, error: submissionError } = await supabase
    .from("intake_submissions")
    .insert({
      invite_id: invite.id,
      client_name: invite.client_name,
      client_email: invite.client_email,
      answers,
    })
    .select("id")
    .single();

  if (submissionError || !submission) {
    throw new Error(
      `Kon inzending niet opslaan: ${submissionError?.message ?? "onbekend"}`
    );
  }

  // Markeer de uitnodiging als gebruikt. Voorwaarde used_at is null voorkomt
  // dubbele inzendingen bij een race.
  const { error: updateError } = await supabase
    .from("intake_invites")
    .update({ used_at: new Date().toISOString(), submission_id: submission.id })
    .eq("id", invite.id)
    .is("used_at", null);

  if (updateError) {
    throw new Error(`Kon uitnodiging niet afsluiten: ${updateError.message}`);
  }

  return { submissionId: submission.id, invite };
}
