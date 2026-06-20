// Cookie-gebaseerde Supabase-client voor de browser (admin-login).
import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClientSupabase() {
  if (!url || !anonKey) {
    throw new Error("Supabase env vars ontbreken (URL of ANON_KEY).");
  }
  return createBrowserClient(url, anonKey);
}
