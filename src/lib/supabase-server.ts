// Cookie-gebaseerde Supabase-client voor server components / route handlers.
// Gebruikt de anon key + de sessie-cookies van de ingelogde admin (Supabase Auth).
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function createServerSupabaseClient() {
  if (!url || !anonKey) {
    throw new Error("Supabase env vars ontbreken (URL of ANON_KEY).");
  }
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll kan falen in een pure Server Component (read-only cookies).
          // Dat is prima: de sessie wordt dan elders ververst.
        }
      },
    },
  });
}

/** Retourneert de ingelogde admin-user of null. */
export async function getAdminUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
