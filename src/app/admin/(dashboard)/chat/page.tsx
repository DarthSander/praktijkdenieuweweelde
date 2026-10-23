import { getSql } from "@/lib/db";
import ChatTest from "./ChatTest";

export const dynamic = "force-dynamic";

type VraagRij = {
  session_id: string;
  page_url: string | null;
  gestart: Date;
  vragen: string[];
};

// Woorden die niets zeggen over het onderwerp. Zonder deze lijst staat de
// top tien vol met "en", "het" en "ik".
const STOPWOORDEN = new Set([
  "de","het","een","en","van","ik","je","jij","we","wij","ze","zij","hij","hem","haar","mijn","jouw","ons","onze",
  "is","ben","bent","zijn","was","waren","wordt","worden","word","heb","hebt","heeft","hebben","had","hadden",
  "niet","geen","wel","ook","maar","of","als","dan","dat","die","dit","deze","er","daar","hier","nog","al","wat",
  "hoe","wie","waar","waarom","welke","kan","kun","kunt","kunnen","kon","zou","zal","zult","moet","moeten","mag",
  "te","om","voor","met","aan","op","in","bij","uit","naar","over","door","tot","per","dus","heel","erg","veel",
  "me","mij","zich","zelf","iets","niets","wat","even","nu","toch","want","omdat","terwijl","want","hun","jullie",
  "doen","doet","gaat","gaan","ging","komt","komen","kom","weet","weten","zie","zien","zeg","zeggen","vraag",
]);

function telWoorden(vragen: string[]): [string, number][] {
  const tel = new Map<string, number>();
  for (const vraag of vragen) {
    const woorden = vraag
      .toLowerCase()
      .replace(/[^a-zà-ÿ\s-]/gi, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOPWOORDEN.has(w));
    for (const w of new Set(woorden)) tel.set(w, (tel.get(w) ?? 0) + 1);
  }
  return [...tel.entries()].sort((a, b) => b[1] - a[1]).slice(0, 18);
}

type Storing = {
  seen_at: Date;
  status: number | null;
  code: string | null;
  message: string | null;
};

export default async function AdminChatPage() {
  let rijen: VraagRij[] = [];
  let storingen: Storing[] = [];
  let fout = false;
  try {
    const sql = getSql();
    storingen = (await sql`
      select seen_at, status, code, message
      from chat_errors
      where seen_at > now() - interval '30 days'
      order by seen_at desc
      limit 3
    `) as Storing[];
    rijen = (await sql`
      select s.id as session_id,
             s.page_url,
             s.created_at as gestart,
             array_agg(m.content order by m.created_at) as vragen
      from chat_sessions s
      join chat_messages m on m.session_id = s.id and m.role = 'user'
      where s.created_at > now() - interval '30 days'
      group by s.id, s.page_url, s.created_at
      order by s.created_at desc
      limit 200
    `) as VraagRij[];
  } catch (err) {
    console.error("Kon chatvragen niet laden", err);
    fout = true;
  }

  const alleVragen = rijen.flatMap((r) => r.vragen);
  const woorden = telWoorden(alleVragen);
  const meest = woorden[0]?.[1] ?? 1;

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F] mb-1">
          Wat bezoekers vragen
        </h1>
        <p className="text-[#5E524F]/70 text-sm">
          De vragen die bezoekers in het chatvenster typten, in hun eigen woorden.
          Gesprekken worden na 30 dagen gewist, dus dit is wat er nu is.
          E-mailadressen en telefoonnummers zijn er al uit gehaald voordat ze
          werden opgeslagen.
        </p>
      </section>

      <section className="space-y-4">
        <ChatTest />
        {storingen.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-semibold text-amber-900">
              Het chatvenster liep vast
            </h2>
            <p className="text-amber-900/80 text-sm mt-1">
              De bezoeker kreeg op dat moment alleen te zien dat er iets misging.
              Dit is wat eronder zat.
            </p>
            <ul className="mt-3 space-y-2">
              {storingen.map((s, i) => (
                <li key={i} className="text-sm text-amber-900">
                  <span className="text-amber-900/70">
                    {new Date(s.seen_at).toLocaleString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" · "}
                  </span>
                  {s.status ? `${s.status} · ` : ""}
                  {s.code ? `${s.code} · ` : ""}
                  <span className="break-words">{s.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {fout ? (
        <p className="text-sm text-[#5E524F]/60">
          De gegevens konden niet worden geladen. Probeer het zo nog eens.
        </p>
      ) : rijen.length === 0 ? (
        <p className="text-sm text-[#5E524F]/60">
          Er zijn in de afgelopen 30 dagen geen vragen gesteld in het chatvenster.
        </p>
      ) : (
        <>
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-3xl font-semibold text-[#5E524F]">{rijen.length}</p>
              <p className="text-[#5E524F]/60 text-sm mt-1">gesprekken</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-3xl font-semibold text-[#5E524F]">{alleVragen.length}</p>
              <p className="text-[#5E524F]/60 text-sm mt-1">vragen</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-3xl font-semibold text-[#5E524F]">
                {rijen.length ? (alleVragen.length / rijen.length).toFixed(1) : "0"}
              </p>
              <p className="text-[#5E524F]/60 text-sm mt-1">vragen per gesprek</p>
            </div>
          </section>

          {woorden.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-[#5E524F] mb-1">Woorden die terugkomen</h2>
              <p className="text-[#5E524F]/60 text-sm mb-4">
                Hoe vaak een woord in een gesprek voorkwam. Eén keer per gesprek geteld,
                dus iemand die vijf keer &ldquo;kosten&rdquo; typt telt één keer.
              </p>
              <div className="bg-white rounded-2xl shadow-sm p-5 space-y-2.5">
                {woorden.map(([woord, aantal]) => (
                  <div key={woord} className="flex items-center gap-3">
                    <span className="w-40 shrink-0 text-sm text-[#5E524F]">{woord}</span>
                    <span
                      className="h-2.5 rounded-full bg-[#C4A4A0]"
                      style={{ width: `${Math.max(6, (aantal / meest) * 100)}%` }}
                    />
                    <span className="text-sm text-[#5E524F]/60 tabular-nums">{aantal}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold text-[#5E524F] mb-4">De gesprekken</h2>
            <ul className="space-y-4">
              {rijen.map((rij) => (
                <li key={rij.session_id} className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <p className="text-sm text-[#5E524F]/60">
                      {new Date(rij.gestart).toLocaleString("nl-NL", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {rij.page_url && (
                      <p className="text-xs text-[#5E524F]/50 break-all">
                        vanaf {rij.page_url.replace(/^https?:\/\/[^/]+/, "") || "/"}
                      </p>
                    )}
                  </div>
                  <ol className="space-y-2">
                    {rij.vragen.map((vraag, i) => (
                      <li key={i} className="text-sm text-[#5E524F] leading-relaxed">
                        <span className="text-[#C4A4A0] mr-2">{i + 1}.</span>
                        {vraag}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
