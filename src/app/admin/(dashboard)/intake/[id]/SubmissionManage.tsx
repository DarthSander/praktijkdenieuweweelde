"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmissionManage({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const archived = status === "archived";

  async function setArchive(action: "archive" | "unarchive") {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/intake/submission/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setError("Actie mislukt. Probeer het opnieuw.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    const ok = window.confirm(
      "Definitief verwijderen? De antwoorden én de uitnodiging (naam en e-mailadres) worden permanent gewist. Dit kan niet ongedaan worden gemaakt."
    );
    if (!ok) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/intake/submission/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      router.push("/admin/intake");
      router.refresh();
    } catch {
      setError("Verwijderen mislukt. Probeer het opnieuw.");
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 print:hidden">
      <button
        type="button"
        onClick={() => setArchive(archived ? "unarchive" : "archive")}
        disabled={busy}
        className="px-4 py-2.5 rounded-full text-sm font-semibold border border-[#C4A4A0] text-[#946B66] bg-white hover:bg-[#F5F0EB] transition-all disabled:opacity-60"
      >
        {archived ? "Terugzetten uit archief" : "Archiveren"}
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={busy}
        className="px-4 py-2.5 rounded-full text-sm font-semibold border border-red-300 text-red-700 bg-white hover:bg-red-50 transition-all disabled:opacity-60"
      >
        Verwijderen
      </button>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}
