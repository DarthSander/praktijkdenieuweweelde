import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase";
import InviteForm from "./InviteForm";

export const dynamic = "force-dynamic";

type InviteListRow = {
  id: string;
  created_at: string;
  client_name: string | null;
  client_email: string;
  expires_at: string;
  used_at: string | null;
  submission_id: string | null;
};

function statusLabel(row: InviteListRow): { text: string; className: string } {
  if (row.used_at) return { text: "Ingevuld", className: "bg-green-100 text-green-800" };
  if (new Date(row.expires_at).getTime() <= Date.now())
    return { text: "Verlopen", className: "bg-gray-200 text-gray-600" };
  return { text: "Verstuurd", className: "bg-amber-100 text-amber-800" };
}

export default async function AdminIntakePage() {
  let invites: InviteListRow[] = [];
  try {
    const supabase = getServerSupabase();
    const { data } = await supabase
      .from("intake_invites")
      .select("id, created_at, client_name, client_email, expires_at, used_at, submission_id")
      .order("created_at", { ascending: false })
      .limit(25);
    invites = data ?? [];
  } catch (err) {
    console.error("Kon uitnodigingen niet laden", err);
  }

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F] mb-1">
          Intake-link versturen
        </h1>
        <p className="text-[#5E524F]/70 text-sm mb-6">
          Vul de gegevens van de klant in. Ze ontvangen een persoonlijke link naar
          het intake-formulier.
        </p>
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg">
          <InviteForm />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[#5E524F] mb-4">
          Recente uitnodigingen
        </h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {invites.length === 0 ? (
            <p className="text-[#5E524F]/60 text-sm p-6">Nog geen uitnodigingen.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#5E524F]/60 border-b border-[#EDE6DD]">
                  <th className="px-4 py-3 font-medium">Naam</th>
                  <th className="px-4 py-3 font-medium">E-mail</th>
                  <th className="px-4 py-3 font-medium">Verstuurd</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {invites.map((row) => {
                  const s = statusLabel(row);
                  return (
                    <tr key={row.id} className="border-b border-[#F5F0EB] last:border-0">
                      <td className="px-4 py-3 text-[#5E524F]">
                        {row.client_name || "—"}
                      </td>
                      <td className="px-4 py-3 text-[#5E524F]">{row.client_email}</td>
                      <td className="px-4 py-3 text-[#5E524F]/70">
                        {new Date(row.created_at).toLocaleDateString("nl-NL")}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${s.className}`}>
                          {s.text}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {row.used_at && row.submission_id ? (
                          <Link
                            href={`/admin/intake/${row.submission_id}`}
                            className="text-[#946B66] font-medium hover:underline whitespace-nowrap"
                          >
                            Bekijken →
                          </Link>
                        ) : (
                          <span className="text-[#5E524F]/30">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
