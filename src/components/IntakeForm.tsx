"use client";

// Intakeformulier — opgebouwd volgens het vastgestelde ontwerp van
// Praktijk de Nieuwe Weelde. Alle antwoorden worden als één `answers`-object
// (JSONB) opgeslagen via /api/intake/submit, dus uitbreiden kan zonder
// database-wijziging: geef nieuwe velden simpelweg een `name`.
import { useEffect, useRef, useState } from "react";
import styles from "./IntakeForm.module.css";

const TOPICS = [
  "Financiën",
  "Kinderen / opvoeden",
  "Uiten van liefde",
  "Seks",
  "Werk / carrière",
  "Huishouden",
  "Vertrouwen en jaloezie",
  "(Schoon-)familie",
  "Vrije tijd",
  "Drugs, alcohol",
  "Geloof",
  "Humeur, temperament",
  "Doelen en prioriteiten",
  "Uiterlijk of gepast gedrag",
];

// Combineert module-classnames (incl. kebab-case) tot één className-string.
function cx(...names: Array<string | false | undefined>): string {
  return names
    .filter(Boolean)
    .map((n) => styles[n as string])
    .filter(Boolean)
    .join(" ");
}

export default function IntakeForm({
  token,
  defaultName,
  defaultEmail,
}: {
  token: string;
  defaultName?: string | null;
  defaultEmail?: string | null;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  // Interactieve onderdelen die geen native form-velden zijn:
  const [vast, setVast] = useState<number | null>(null);
  const [matrix, setMatrix] = useState<Record<number, number>>({});
  const [tops, setTops] = useState<number[]>([]);

  // Datum van ondertekening: prefill vandaag via een ref (uncontrolled), zodat
  // er geen hydration-mismatch ontstaat en de gebruiker hem nog kan aanpassen.
  const dateRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (dateRef.current && !dateRef.current.value) {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      dateRef.current.value = `${dd}-${mm}-${now.getFullYear()}`;
    }
  }, []);

  function toggleTop(idx: number) {
    setTops((prev) => {
      if (prev.includes(idx)) return prev.filter((i) => i !== idx);
      if (prev.length >= 3) return prev;
      return [...prev, idx];
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const answers: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      answers[key] = value;
    }

    // Niet-native onderdelen toevoegen, in leesbare vorm voor de admin.
    answers["vastbesloten_0_10"] = vast;
    answers["tevredenheid"] = Object.fromEntries(
      TOPICS.map((label, i) => [label, matrix[i] ?? null])
    );
    answers["belangrijkste_onderwerpen"] = tops.map((i) => TOPICS[i]);

    try {
      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, answers }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Er ging iets mis. Probeer het opnieuw.");
        setStatus("error");
        return;
      }
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Netwerkfout. Probeer het opnieuw.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.page}>
        <div className={styles.notice}>
          <h1>Bedankt!</h1>
          <p>
            Je intakeformulier is verstuurd. Ik neem contact met je op voor de
            afspraak. Wat je hebt gedeeld, behandel ik vertrouwelijk.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <form className={styles.sheet} onSubmit={handleSubmit}>
        <header className={styles.head}>
          <div className={cx("lock-head")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-512.png" alt="" />
            <div className={styles.nm}>
              <b>Praktijk</b>
              <i>de Nieuwe Weelde</i>
            </div>
          </div>
          <h1>Intakeformulier relatietherapie</h1>
          <p>
            Vul dit formulier zelfstandig in, dus zonder je partner. Er zijn geen
            goede of foute antwoorden. Vind je een vraag lastig te beantwoorden,
            sla hem dan gerust over. Alles wat je hier deelt, behandel ik
            vertrouwelijk. Klik onderaan op &lsquo;Verstuur intake&rsquo; wanneer
            je klaar bent.
          </p>
        </header>

        <div className={styles.body}>
          {/* 01 Persoonlijke gegevens */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>01</span>
              <h2>Persoonlijke gegevens</h2>
            </div>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Je naam</label>
                <input name="naam" type="text" defaultValue={defaultName ?? ""} required />
              </div>
              <div className={styles.field}>
                <label>Naam van je partner</label>
                <input name="partner_naam" type="text" />
              </div>
              <div className={styles.field}>
                <label>Geboortedatum</label>
                <input name="gebdatum" type="text" placeholder="dd-mm-jjjj" />
              </div>
              <div className={styles.field}>
                <label>Telefoonnummer</label>
                <input name="tel" type="tel" />
              </div>
              <div className={styles.field}>
                <label>E-mailadres</label>
                <input name="email" type="email" defaultValue={defaultEmail ?? ""} />
              </div>
              <div className={styles.field}>
                <label>Wat voor werk doe je?</label>
                <input name="werk" type="text" />
              </div>
              <div className={cx("field", "full")}>
                <label>Adres &amp; woonplaats</label>
                <input name="adres" type="text" />
              </div>
            </div>
          </section>

          {/* 02 Jullie relatie */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>02</span>
              <h2>Jullie relatie</h2>
            </div>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Hoe lang zijn jullie al bij elkaar?</label>
                <input name="samen_sinds" type="text" />
              </div>
              <div className={styles.field}>
                <label>Wonen jullie samen?</label>
                <div className={styles.choice}>
                  <label className={styles.opt}>
                    <input type="radio" name="samenwonend" value="ja" />
                    Ja
                  </label>
                  <label className={styles.opt}>
                    <input type="radio" name="samenwonend" value="nee" />
                    Nee
                  </label>
                </div>
              </div>
              <div className={styles.field}>
                <label>Hebben jullie thuiswonende kinderen?</label>
                <div className={styles.choice}>
                  <label className={styles.opt}>
                    <input type="radio" name="kinderen" value="ja" />
                    Ja
                  </label>
                  <label className={styles.opt}>
                    <input type="radio" name="kinderen" value="nee" />
                    Nee
                  </label>
                </div>
              </div>
              <div className={styles.field}>
                <label>Zo ja, hoeveel en hoe oud zijn ze?</label>
                <input name="kinderen_detail" type="text" />
              </div>
            </div>
          </section>

          {/* 03 Het vraagstuk */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>03</span>
              <h2>Het vraagstuk in jullie relatie</h2>
            </div>
            <div className={cx("field", "full")} style={{ marginBottom: 20 }}>
              <span className={cx("qlabel")}>
                Beschrijf het probleem of vraagstuk in jullie relatie.
              </span>
              <textarea className={cx("lines", "tall")} name="probleem" />
            </div>
            <div className={cx("field", "full")} style={{ marginBottom: 20 }}>
              <span className={cx("qlabel")}>
                Tijdpad: wanneer is het relatieprobleem of vraagstuk begonnen?
              </span>
              <textarea className={cx("lines")} name="tijdpad" />
            </div>
            <div className={cx("field", "full")} style={{ marginBottom: 20 }}>
              <span className={cx("qlabel")}>
                Ontwikkeling: hoe heeft het zich ontwikkeld?
              </span>
              <div className={styles.choice} style={{ margin: "4px 0 10px" }}>
                <label className={styles.opt}>
                  <input type="radio" name="ontwikkeling" value="erger" />
                  Erger geworden
                </label>
                <label className={styles.opt}>
                  <input type="radio" name="ontwikkeling" value="stabiel" />
                  Stabiel gebleven
                </label>
                <label className={styles.opt}>
                  <input type="radio" name="ontwikkeling" value="verminderd" />
                  Verminderd
                </label>
              </div>
              <textarea
                className={cx("lines")}
                name="ontwikkeling_toelichting"
                placeholder="Eventuele toelichting"
              />
            </div>
            <div className={cx("field", "full")}>
              <span className={cx("qlabel")}>
                Coping: wat heb je of hebben jullie al gedaan aan het vraagstuk, en
                wat heeft dat opgeleverd?
              </span>
              <textarea className={cx("lines")} name="coping" />
            </div>
          </section>

          {/* 04 Jouw beleving */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>04</span>
              <h2>Jouw beleving</h2>
            </div>
            <div className={cx("field", "full")} style={{ marginBottom: 20 }}>
              <span className={cx("qlabel")}>
                Welke gedachten ervaar je bij het vraagstuk?
              </span>
              <textarea className={cx("lines")} name="gedachten" />
            </div>
            <div className={cx("field", "full")} style={{ marginBottom: 20 }}>
              <span className={cx("qlabel")}>
                Welke emoties ervaar je bij het vraagstuk?
              </span>
              <textarea className={cx("lines")} name="emoties" />
            </div>
            <div className={cx("field", "full")}>
              <span className={cx("qlabel")}>
                Welke lichamelijke gewaarwordingen of klachten ervaar je bij of
                door het vraagstuk?
              </span>
              <textarea className={cx("lines")} name="lichaam" />
            </div>
          </section>

          {/* 05 Doel */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>05</span>
              <h2>Wat wil je bereiken?</h2>
            </div>
            <div className={cx("field", "full")}>
              <span className={cx("qlabel")}>
                Wat zou je graag willen bereiken met de relatietherapie? Welk doel
                zie je voor jezelf en voor jullie relatie?
              </span>
              <textarea className={cx("lines", "tall")} name="doel" />
            </div>
          </section>

          {/* 06 Tevredenheid per onderwerp */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>06</span>
              <h2>Tevredenheid per onderwerp</h2>
            </div>
            <p className={cx("sec-note")}>
              Hieronder staan onderwerpen waarover partners het oneens kunnen zijn.
              Geef per onderwerp aan hoe tevreden je bent over hoe jullie er samen
              mee omgaan. Het gaat louter om jouw eigen beleving.
            </p>
            <div className={cx("m-legend")}>
              <span>
                1 = heel ontevreden
                <i style={{ fontStyle: "normal" }}>7 = heel tevreden</i>
              </span>
            </div>
            <div>
              {TOPICS.map((label, ri) => (
                <div className={cx("mrow")} key={label}>
                  <div className={cx("mlabel")}>
                    {ri + 1}. {label}
                  </div>
                  <div className={cx("mpips")}>
                    {Array.from({ length: 7 }, (_, k) => k + 1).map((v) => (
                      <div
                        key={v}
                        className={cx("mp", matrix[ri] === v && "on")}
                        onClick={() =>
                          setMatrix((prev) => ({ ...prev, [ri]: v }))
                        }
                        role="button"
                        aria-label={`${label}: ${v}`}
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={cx("field", "full")} style={{ marginTop: 26 }}>
              <span className={cx("qlabel")}>
                Welke 3 onderwerpen zijn voor jou het belangrijkst om in therapie
                aan te werken?
              </span>
              <div className={cx("chips")}>
                {TOPICS.map((label, ri) => {
                  const on = tops.includes(ri);
                  return (
                    <button
                      type="button"
                      key={label}
                      className={cx("chip", on && "on")}
                      disabled={!on && tops.length >= 3}
                      onClick={() => toggleTop(ri)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className={cx("chip-count")}>{tops.length} van 3 gekozen</div>
            </div>
          </section>

          {/* 07 Begeleiding */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>07</span>
              <h2>Begeleiding</h2>
            </div>
            <div className={cx("field", "full")}>
              <span className={cx("qlabel")}>
                Ontvangen jullie momenteel nog andere begeleiding, therapie of
                behandeling, individueel of samen?
              </span>
              <textarea className={cx("lines")} name="andere_begeleiding" />
            </div>
          </section>

          {/* 08 Veiligheid */}
          <section className={styles.section}>
            <div className={cx("care")}>
              <div className={cx("sec-head")}>
                <span className={cx("sec-num")}>08</span>
                <h2>Veiligheid</h2>
              </div>
              <p className={cx("lead")}>
                Deze vraag stel ik aan iedereen. Je hoeft niet in detail te treden;
                het helpt mij om jullie traject veilig en passend vorm te geven.
              </p>
              <div className={cx("field", "full")}>
                <span className={cx("qlabel")}>
                  Is er in jullie relatie ooit sprake geweest van dreiging,
                  intimidatie of geweld?
                </span>
                <div className={styles.choice} style={{ margin: "6px 0 10px" }}>
                  <label className={styles.opt}>
                    <input type="radio" name="veiligheid" value="nee" />
                    Nee
                  </label>
                  <label className={styles.opt}>
                    <input type="radio" name="veiligheid" value="ja" />
                    Ja
                  </label>
                  <label className={styles.opt}>
                    <input type="radio" name="veiligheid" value="bespreken" />
                    Liever persoonlijk bespreken
                  </label>
                </div>
                <textarea
                  className={cx("lines")}
                  name="veiligheid_toelichting"
                  placeholder="Eventuele toelichting (optioneel)"
                />
              </div>
            </div>
          </section>

          {/* 09 Motivatie */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>09</span>
              <h2>Motivatie &amp; toewijding</h2>
            </div>
            <div className={cx("scale-wrap")}>
              <div className={cx("who")}>
                Hoe vastbesloten voel jij je om aan je relatie te blijven werken?
              </div>
              <div className={cx("scale")}>
                {Array.from({ length: 11 }, (_, v) => (
                  <div
                    key={v}
                    className={cx("pip", vast === v && "on")}
                    onClick={() => setVast(v)}
                    role="button"
                    aria-label={`Vastbeslotenheid ${v}`}
                  >
                    {v}
                  </div>
                ))}
              </div>
              <div className={cx("scale-ends")}>
                <span>0 = twijfel sterk</span>
                <span>10 = volledig vastbesloten</span>
              </div>
            </div>
            <div className={cx("field", "full")} style={{ marginTop: 18 }}>
              <span className={cx("qlabel")}>
                Heb je de afgelopen tijd nagedacht over het beëindigen van je
                relatie?
              </span>
              <div className={styles.choice} style={{ margin: "6px 0 10px" }}>
                <label className={styles.opt}>
                  <input type="radio" name="einde" value="nee" />
                  Nee
                </label>
                <label className={styles.opt}>
                  <input type="radio" name="einde" value="soms" />
                  Soms
                </label>
                <label className={styles.opt}>
                  <input type="radio" name="einde" value="ja" />
                  Ja, serieus
                </label>
              </div>
              <textarea
                className={cx("lines")}
                name="einde_toelichting"
                placeholder="Eventuele toelichting (optioneel)"
              />
            </div>
          </section>

          {/* 10 Verwachtingen */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>10</span>
              <h2>Verwachtingen</h2>
            </div>
            <div className={cx("field", "full")}>
              <span className={cx("qlabel")}>
                Wat verwacht je van mij als begeleider, en van het traject?
              </span>
              <textarea className={cx("lines")} name="verwachtingen" />
            </div>
          </section>

          {/* 11 Tot slot */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>11</span>
              <h2>Tot slot</h2>
            </div>
            <div className={cx("field", "full")} style={{ marginBottom: 20 }}>
              <span className={cx("qlabel")}>
                Zijn er nog andere zaken die je zou willen bespreken of benoemen?
              </span>
              <textarea className={cx("lines")} name="overig" />
            </div>
            <div className={cx("field", "full")}>
              <label>Hoe ben je bij mij terechtgekomen?</label>
              <input
                name="herkomst"
                type="text"
                placeholder="bijv. via de huisarts, Google, een bekende"
              />
            </div>
          </section>

          {/* 12 Digitale ondertekening */}
          <section className={styles.section}>
            <div className={cx("sec-head")}>
              <span className={cx("sec-num")}>12</span>
              <h2>Digitale ondertekening</h2>
            </div>
            <p className={cx("sec-note")} style={{ margin: "-6px 0 18px 42px" }}>
              Vink aan en vul je gegevens in om het formulier te ondertekenen. Dit
              is verplicht om de intake te kunnen versturen.
            </p>
            <div className={cx("consent")}>
              <input type="checkbox" id="akk" name="akkoord" value="ja" required />
              <label htmlFor="akk">
                Ik onderteken dit formulier digitaal en ga akkoord met de
                verwerking van mijn gegevens zoals beschreven in de{" "}
                <a
                  href="https://www.praktijkdenieuweweelde.nl/privacyverklaring"
                  target="_blank"
                  rel="noopener"
                >
                  privacyverklaring
                </a>
                . Ik verklaar dit formulier naar waarheid te hebben ingevuld en
                begrijp dat de informatie vertrouwelijk wordt behandeld.
              </label>
            </div>
            <div className={cx("sign")}>
              <div className={styles.field}>
                <label>Naam (ondertekening)</label>
                <input
                  name="ondertekening_naam"
                  type="text"
                  defaultValue={defaultName ?? ""}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Plaats</label>
                <input name="plaats" type="text" required />
              </div>
            </div>
            <div className={cx("field")} style={{ maxWidth: 220, marginTop: 22 }}>
              <label>Datum</label>
              <input
                ref={dateRef}
                name="datum"
                type="text"
                placeholder="dd-mm-jjjj"
                defaultValue=""
                required
              />
            </div>

            <div className={cx("submit-row")}>
              <button
                type="submit"
                disabled={status === "sending"}
                className={cx("btn", "btn-primary")}
              >
                {status === "sending" ? "Bezig met verzenden…" : "Verstuur intake"}
              </button>
              {status === "error" && <p className={cx("error")}>{error}</p>}
            </div>
            <p
              className={cx("chip-count")}
              style={{ marginTop: 4 }}
            >
              Verzenden kan alleen via je persoonlijke uitnodigingslink.
            </p>
          </section>
        </div>

        <footer className={styles.foot}>
          <div className={cx("lock")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-512.png" alt="" />
            <div className={styles.nm}>
              <b>Praktijk</b>
              <i>de Nieuwe Weelde</i>
              <span>Relatietherapie aan huis</span>
            </div>
          </div>
          <div className={cx("contact")}>
            <div className={cx("row")}>
              <span>Eva Mulder · Relatietherapeut</span>
            </div>
            <div className={cx("row")}>
              <a href="mailto:info@praktijkdenieuweweelde.nl">
                info@praktijkdenieuweweelde.nl
              </a>
            </div>
            <div className={cx("row")}>
              <span>06 10096923 · Tilburg e.o.</span>
            </div>
          </div>
        </footer>
      </form>
    </div>
  );
}
