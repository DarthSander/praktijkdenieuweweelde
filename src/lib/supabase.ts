import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getServerSupabase() {
  if (!url || !serviceKey) {
    throw new Error("Supabase env vars ontbreken (URL of SERVICE_ROLE_KEY).");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getBrowserSupabase() {
  if (!url || !anonKey) {
    throw new Error("Supabase env vars ontbreken (URL of ANON_KEY).");
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
