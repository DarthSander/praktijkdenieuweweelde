import type { Metadata } from "next";
import { getValidInvite } from "@/lib/intake";
import IntakeForm from "@/components/IntakeForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Intakeformulier — Relatiepraktijk de Nieuwe Weelde" },
  robots: { index: false, follow: false },
};

const REASON_MESSAGE: Record<string, string> = {
  invalid: "Deze link is niet (meer) geldig. Vraag gerust een nieuwe link aan.",
  expired: "Deze link is verlopen. Vraag gerust een nieuwe link aan.",
  used: "Dit formulier is al ingevuld. Bedankt!",
};

function InvalidNotice({ reason }: { reason: string }) {
  return (
    <div className="min-h-screen bg-[#E7DED3] flex items-center justify-center px-4 py-12">
      <div className="bg-[#FBF7F2] rounded-2xl shadow-[0_24px_60px_rgba(63,58,53,0.12)] p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-semibold text-[#6A4744] mb-3">
          Intakeformulier
        </h1>
        <p className="text-[#6E665E] text-[15px] leading-relaxed">
          {REASON_MESSAGE[reason]}
        </p>
      </div>
    </div>
  );
}

export default async function IntakePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Zonder geldige uitnodigingslink (auth) kan het formulier niet worden
  // getoond of ingestuurd — de token is de toegangssleutel.
  const result = await getValidInvite(token);

  if (!result.ok) {
    return <InvalidNotice reason={result.reason} />;
  }

  return (
    <IntakeForm
      token={token}
      defaultName={result.invite.client_name}
      defaultEmail={result.invite.client_email}
    />
  );
}
