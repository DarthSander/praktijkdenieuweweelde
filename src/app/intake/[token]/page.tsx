import type { Metadata } from "next";
import { getValidInvite } from "@/lib/intake";
import IntakeForm from "@/components/IntakeForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Intake-formulier — Relatiepraktijk de Nieuwe Weelde" },
  robots: { index: false, follow: false },
};

const REASON_MESSAGE: Record<string, string> = {
  invalid: "Deze link is niet (meer) geldig. Vraag gerust een nieuwe link aan.",
  expired: "Deze link is verlopen. Vraag gerust een nieuwe link aan.",
  used: "Dit formulier is al ingevuld. Bedankt!",
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-xl">{children}</div>
    </div>
  );
}

export default async function IntakePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = await getValidInvite(token);

  if (!result.ok) {
    return (
      <Shell>
        <h1 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F] mb-3">
          Intake-formulier
        </h1>
        <p className="text-[#5E524F]/80 text-sm">{REASON_MESSAGE[result.reason]}</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F] mb-1">
        Intake-formulier
      </h1>
      <p className="text-[#5E524F]/70 text-sm mb-6">
        {result.invite.client_name
          ? `Welkom ${result.invite.client_name}. `
          : "Welkom. "}
        Vul dit formulier in zodat we onze eerste afspraak goed kunnen voorbereiden.
      </p>
      <IntakeForm token={token} />
    </Shell>
  );
}
