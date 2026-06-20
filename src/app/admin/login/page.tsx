"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientSupabase } from "@/lib/supabase-browser";

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-[#EDE6DD] bg-white text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition placeholder:text-[#C4A4A0]/60";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const supabase = createClientSupabase();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Inloggen mislukt. Controleer je gegevens.");
      setLoading(false);
      return;
    }

    router.replace("/admin/intake");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-wider text-[#C4A4A0] mb-1">
            Relatiepraktijk de Nieuwe Weelde
          </p>
          <h1 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F]">
            Inloggen
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">
              E-mailadres
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">
              Wachtwoord
            </label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className={inputClass} />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-sm btn-primary transition-all ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Bezig…" : "Inloggen"}
          </button>
        </form>
        <p className="text-center mt-6">
          <Link href="/" className="text-[#C4A4A0] text-sm underline underline-offset-2 hover:text-[#946B66] transition">
            Terug naar de website
          </Link>
        </p>
      </div>
    </div>
  );
}
