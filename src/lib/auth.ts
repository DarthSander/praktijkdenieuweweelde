// Admin-login zonder externe dienst.
// - Inloggegevens: ADMIN_EMAIL + ADMIN_PASSWORD (gewoon wachtwoord), of in plaats
//   van ADMIN_PASSWORD een ADMIN_PASSWORD_HASH (maak met `npm run admin:hash`).
// - Sessie: cookie met vervaldatum, ondertekend met HMAC-SHA256. De sleutel is
//   ADMIN_SESSION_SECRET, of (als die ontbreekt) afgeleid van het wachtwoord en
//   de database-URL. Wachtwoord wijzigen logt dan alle sessies uit.
import { createHash, createHmac, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number
) => Promise<Buffer>;

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 dagen

export type AdminSession = { email: string };

function secret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit && explicit.length >= 32) return explicit;

  const passwordMaterial = process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD || "";
  if (!passwordMaterial) {
    throw new Error("ADMIN_PASSWORD (of ADMIN_PASSWORD_HASH) ontbreekt.");
  }
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
  return createHash("sha256")
    .update(`nw-admin-session\0${passwordMaterial}\0${dbUrl}`)
    .digest("base64url");
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** Controleert e-mail + wachtwoord tegen de env-variabelen. */
export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const expectedEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const plain = process.env.ADMIN_PASSWORD ?? "";
  const stored = process.env.ADMIN_PASSWORD_HASH ?? "";
  if (!expectedEmail || (!plain && !stored)) {
    console.error("ADMIN_EMAIL of ADMIN_PASSWORD ontbreekt.");
    return false;
  }

  let passwordOk = false;
  if (stored) {
    const [scheme, saltB64, hashB64] = stored.split(":");
    if (scheme !== "scrypt" || !saltB64 || !hashB64) {
      console.error("ADMIN_PASSWORD_HASH heeft een ongeldig formaat.");
      return false;
    }
    const expectedHash = Buffer.from(hashB64, "base64url");
    const actual = await scryptAsync(password, Buffer.from(saltB64, "base64url"), expectedHash.length);
    passwordOk = timingSafeEqual(actual, expectedHash);
  } else {
    // Vergelijk de SHA-256 van beide, zodat de vergelijking altijd even lang duurt.
    const a = createHash("sha256").update(password).digest();
    const b = createHash("sha256").update(plain).digest();
    passwordOk = timingSafeEqual(a, b);
  }
  const emailOk = safeEqual(email.trim().toLowerCase(), expectedEmail);
  return passwordOk && emailOk;
}

/** Maakt de waarde voor de sessiecookie. */
export function createSessionToken(email: string): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = Buffer.from(JSON.stringify({ email, exp })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Leest en controleert een sessietoken. */
export function readSessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  try {
    if (!safeEqual(signature, sign(payload))) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email?: string;
      exp?: number;
    };
    if (!data.email || !data.exp || data.exp * 1000 < Date.now()) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

/** Retourneert de ingelogde admin of null (server components + route handlers). */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  return readSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}
