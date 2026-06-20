import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase";
import SubmissionActions from "./SubmissionActions";

export const dynamic = "force-dynamic";

type Submission = {
  id: string;
  created_at: string;
  client_name: string | null;
  client_email: string | null;
  status: string;
  answers: Record<string, unknown>;
};

// Secties + veldlabels spiegelen het intakeformulier zodat de admin de
// antwoorden in dezelfde volgorde en bewoording terugziet.
const SECTIONS: { num: string; title: string; fields: [string, string][] }[] = [
  {
    num: "01",
    title: "Persoonlijke gegevens",
    fields: [
      ["naam", "Je naam"],
      ["partner_naam", "Naam van je partner"],
      ["gebdatum", "Geboortedatum"],
      ["tel", "Telefoonnummer"],
      ["email", "E-mailadres"],
      ["werk", "Werk"],
      ["adres", "Adres & woonplaats"],
    ],
  },
  {
    num: "02",
    title: "Jullie relatie",
    fields: [
      ["samen_sinds", "Hoe lang bij elkaar"],
      ["samenwonend", "Samenwonend"],
      ["kinderen", "Thuiswonende kinderen"],
      ["kinderen_detail", "Aantal / leeftijd kinderen"],
    ],
  },
  {
    num: "03",
    title: "Het vraagstuk in jullie relatie",
    fields: [
      ["probleem", "Beschrijving"],
      ["tijdpad", "Tijdpad"],
      ["ontwikkeling", "Ontwikkeling"],
      ["ontwikkeling_toelichting", "Toelichting ontwikkeling"],
      ["coping", "Coping"],
    ],
  },
  {
    num: "04",
    title: "Jouw beleving",
    fields: [
      ["gedachten", "Gedachten"],
      ["emoties", "Emoties"],
      ["lichaam", "Lichamelijke gewaarwordingen"],
    ],
  },
  {
    num: "05",
    title: "Wat wil je bereiken?",
    fields: [["doel", "Doel"]],
  },
  {
    num: "07",
    title: "Begeleiding",
    fields: [["andere_begeleiding", "Andere begeleiding/therapie"]],
  },
  {
    num: "08",
    title: "Veiligheid",
    fields: [
      ["veiligheid", "Dreiging/intimidatie/geweld"],
      ["veiligheid_toelichting", "Toelichting"],
    ],
  },
  {
    num: "09",
    title: "Motivatie & toewijding",
    fields: [
      ["vastbesloten_0_10", "Vastbeslotenheid (0–10)"],
      ["einde", "Nagedacht over beëindigen"],
      ["einde_toelichting", "Toelichting"],
    ],
  },
  {
    num: "10",
    title: "Verwachtingen",
    fields: [["verwachtingen", "Verwachtingen"]],
  },
  {
    num: "11",
    title: "Tot slot",
    fields: [
      ["overig", "Overige zaken"],
      ["herkomst", "Hoe terechtgekomen"],
    ],
  },
  {
    num: "12",
    title: "Digitale ondertekening",
    fields: [
      ["akkoord", "Akkoord gegeven"],
      ["ondertekening_naam", "Naam (ondertekening)"],
      ["plaats", "Plaats"],
      ["datum", "Datum"],
    ],
  },
];

function fmt(v: unknown): string {
  if (v === null || v === undefined || v === "") return "—";
  if (v === "ja") return "Ja";
  if (v === "nee") return "Nee";
  return String(v);
}

function FieldRow({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="py-2.5 border-b border-[#F5F0EB] last:border-0 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-[#C4A4A0] pt-0.5">
        {label}
      </div>
      <div className="text-[#5E524F] text-sm whitespace-pre-wrap">{fmt(value)}</div>
    </div>
  );
}

function SectionCard({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 break-inside-avoid">
      <div className="flex items-baseline gap-3 mb-3 pb-2 border-b border-[#EDE6DD]">
        <span className="font-[family-name:var(--font-playfair)] text-[#C4A4A0]">
          {num}
        </span>
        <h2 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-[#946B66]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let submission: Submission | null = null;
  try {
    const supabase = getServerSupabase();
    const { data } = await supabase
      .from("intake_submissions")
      .select("id, created_at, client_name, client_email, status, answers")
      .eq("id", id)
      .maybeSingle<Submission>();
    submission = data;
  } catch (err) {
    console.error("Kon inzending niet laden", err);
  }

  if (!submission) {
    return (
      <div className="space-y-4">
        <Link href="/admin/intake" className="text-[#946B66] text-sm hover:underline">
          ← Terug naar overzicht
        </Link>
        <p className="text-[#5E524F]/70 text-sm">
          Inzending niet gevonden.
        </p>
      </div>
    );
  }

  const answers = submission.answers ?? {};
  const tevredenheid = (answers["tevredenheid"] ?? {}) as Record<string, unknown>;
  const belangrijkste = (answers["belangrijkste_onderwerpen"] ?? []) as unknown[];
  const naam =
    (answers["naam"] as string) || submission.client_name || "Onbekend";
  const ingevuldOp = new Date(submission.created_at).toLocaleString("nl-NL");
  const filename = `intake-${naam.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <Link href="/admin/intake" className="text-[#946B66] text-sm hover:underline">
          ← Terug naar overzicht
        </Link>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F]">
            Intake — {naam}
          </h1>
          <p className="text-[#5E524F]/60 text-sm mt-1">
            {submission.client_email || answers["email"] as string || "—"} ·
            ingevuld op {ingevuldOp}
          </p>
        </div>
        <SubmissionActions filename={filename} data={submission} />
      </div>

      <div className="space-y-4">
        {SECTIONS.flatMap((section) => {
          const cards = [];
          // Sectie 06 (tevredenheid) tussen 05 en 07 invoegen.
          if (section.num === "07") {
            cards.push(
              <SectionCard key="06" num="06" title="Tevredenheid per onderwerp">
                <div className="mb-3">
                  {Object.keys(tevredenheid).length === 0 ? (
                    <p className="text-[#5E524F]/60 text-sm">— niet ingevuld —</p>
                  ) : (
                    Object.entries(tevredenheid).map(([topic, score]) => (
                      <div
                        key={topic}
                        className="flex justify-between py-1.5 border-b border-[#F5F0EB] last:border-0 text-sm"
                      >
                        <span className="text-[#5E524F]">{topic}</span>
                        <span className="text-[#946B66] font-medium">
                          {score == null || score === "" ? "—" : `${score} / 7`}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <FieldRow
                  label="Belangrijkste 3 onderwerpen"
                  value={belangrijkste.length ? belangrijkste.join(", ") : ""}
                />
              </SectionCard>
            );
          }
          cards.push(
            <SectionCard key={section.num} num={section.num} title={section.title}>
              {section.fields.map(([key, label]) => (
                <FieldRow key={key} label={label} value={answers[key]} />
              ))}
            </SectionCard>
          );
          return cards;
        })}
      </div>
    </div>
  );
}
