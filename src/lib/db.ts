// Neon Postgres-client (HTTP). Alleen server-side gebruiken.
// DATABASE_URL (of POSTGRES_URL) wordt op Vercel automatisch gezet door de
// Neon-integratie.
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!url) throw new Error("DATABASE_URL ontbreekt.");
    client = neon(url);
  }
  return client;
}
