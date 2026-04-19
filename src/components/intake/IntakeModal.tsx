"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ArrowRight, ArrowLeft, Check, Calendar, Sparkles } from "lucide-react";
import IntakeChips from "./IntakeChips";
import SlotPicker from "./SlotPicker";
import Link from "next/link";

type Props = { open: boolean; onClose: () => void };

type AloneOrCouple = "alleen" | "samen";

const PROBLEMS = [
  { value: "communicatie", label: "Communicatie" },
  { value: "vreemdgaan", label: "Vreemdgaan / vertrouwen" },
  { value: "uit-elkaar-groeien", label: "Uit elkaar gegroeid" },
  { value: "intimiteit", label: "Intimiteit & seksualiteit" },
  { value: "ouderschap", label: "Ouderschap & gezin" },
  { value: "twijfel", label: "Twijfel: doorgaan of niet" },
  { value: "anders", label: "Iets anders" },
];

const GENDERS = [
  { value: "vrouw", label: "Vrouw" },
  { value: "man", label: "Man" },
  { value: "anders", label: "Anders / liever niet zeggen" },
];

const ALONE_OR_COUPLE = [
  {
    value: "samen",
    label: "Samen met mijn partner",
    description: "We willen dit allebei en doen het samen.",
  },
  {
    value: "alleen",
    label: "Alleen, voor nu",
    description: "Ik onderzoek het voor mezelf, mijn partner is (nog) niet zo ver.",
  },
];

const STEP_TITLES: Record<number, string> = {
  0: "Korte intake",
  1: "Doe je dit alleen of samen?",
  2: "Wat is je geslacht?",
  3: "Wat speelt er vooral?",
  4: "Vertel iets meer",
  5: "En verder…",
  6: "Tot slot",
  7: "Hoe kunnen we je bereiken?",
  8: "Plan een gratis kennismaking",
  9: "Bedankt!",
};

type AiTurn = { question: string; answer: string };

type Slot = { id: string; starts_at: string; ends_at: string };

export default function IntakeModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [aloneOrCouple, setAloneOrCouple] = useState<AloneOrCouple | "">("");
  const [gender, setGender] = useState("");
  const [problem, setProblem] = useState("");
  const [aiTurns, setAiTurns] = useState<AiTurn[]>([]);
  const [currentAiQuestion, setCurrentAiQuestion] = useState("");
  const [currentAiAnswer, setCurrentAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [naam, setNaam] = useState("");
  const [partnerNaam, setPartnerNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [slot, setSlot] = useState<Slot | null>(null);
  const [consentAi, setConsentAi] = useState(false);
  const [consentStorage, setConsentStorage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedLabel, setConfirmedLabel] = useState<string | null>(null);
  const aiAbortRef = useRef<AbortController | null>(null);

  // Lock body scroll
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const reset = () => {
    setStep(0);
    setAloneOrCouple("");
    setGender("");
    setProblem("");
    setAiTurns([]);
    setCurrentAiQuestion("");
    setCurrentAiAnswer("");
    setAiSummary("");
    setNaam("");
    setPartnerNaam("");
    setEmail("");
    setTelefoon("");
    setSlot(null);
    setConsentAi(false);
    setConsentStorage(false);
    setSubmitError(null);
    setConfirmedLabel(null);
  };

  const handleClose = () => {
    aiAbortRef.current?.abort();
    onClose();
    setTimeout(reset, 300);
  };

  // Stream een AI-vraag (of samenvatting)
  const fetchAi = useCallback(
    async (mode: "next-question" | "summary", history: AiTurn[]) => {
      aiAbortRef.current?.abort();
      const ctrl = new AbortController();
      aiAbortRef.current = ctrl;
      setAiLoading(true);
      setCurrentAiQuestion("");
      setCurrentAiAnswer("");

      try {
        const res = await fetch("/api/intake/ai-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aloneOrCouple,
            gender,
            problem,
            history,
            mode,
          }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) throw new Error("HTTP " + res.status);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          if (mode === "summary") setAiSummary(acc);
          else setCurrentAiQuestion(acc);
        }
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        console.error(e);
        if (mode === "next-question") {
          setCurrentAiQuestion("Vertel eens iets meer over wat er nu speelt?");
        } else {
          setAiSummary(
            "Ik heb gehoord wat er speelt. Eva kan hier goed mee aan de slag. Zal ik je naar de agenda brengen om een gratis kennismaking in te plannen?"
          );
        }
      } finally {
        setAiLoading(false);
      }
    },
    [aloneOrCouple, gender, problem]
  );

  // Trigger AI-vraag bij betreden van AI-stappen
  useEffect(() => {
    if (!open) return;
    if (step === 4 || step === 5 || step === 6) {
      fetchAi("next-question", aiTurns);
    } else if (step === 7 && !aiSummary) {
      fetchAi("summary", aiTurns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, open]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submitAiAnswer = () => {
    const a = currentAiAnswer.trim();
    if (!a) return;
    setAiTurns((prev) => [...prev, { question: currentAiQuestion, answer: a }]);
    setCurrentAiAnswer("");
    setCurrentAiQuestion("");
    next();
  };

  const submit = async () => {
    setSubmitError(null);
    if (!slot) {
      setSubmitError("Kies een tijdstip.");
      return;
    }
    if (!consentStorage) {
      setSubmitError("Je moet akkoord gaan met de verwerking van je gegevens.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aloneOrCouple,
          gender,
          problem,
          aiAnswers: aiTurns,
          aiSummary,
          naam,
          partnerNaam: partnerNaam || undefined,
          email,
          telefoon: telefoon || undefined,
          slotId: slot.id,
          consentAi,
          consentStorage,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; slotLabel?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Onbekende fout");
      setConfirmedLabel(json.slotLabel ?? null);
      setStep(9);
    } catch (e) {
      setSubmitError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  // Voortgangsbalk
  const totalSteps = 8; // intro + 1-7 = 8 voortgangsstappen
  const progress = step === 0 ? 0 : Math.min(step, totalSteps) / totalSteps;

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white w-full md:w-[560px] md:max-h-[90vh] h-full md:h-auto md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F5F0EB] bg-[#946B66] text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <div className="font-semibold text-sm">{STEP_TITLES[step]}</div>
          </div>
          <button onClick={handleClose} aria-label="Sluit" className="p-1 hover:bg-white/10 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        {step > 0 && step < 9 && (
          <div className="h-1 bg-[#F5F0EB]">
            <div
              className="h-full bg-[#C4A4A0] transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-playfair)] font-bold text-2xl text-[#6B6866]">
                Welkom
              </h2>
              <p className="text-[#5E524F] text-sm leading-relaxed">
                In een paar korte stappen leren we jullie iets beter kennen, zodat Eva goed voorbereid is op de
                gratis kennismaking. Een paar vragen zijn met een AI-assistent, zodat het persoonlijker aanvoelt.
                Aan het einde plan je direct een moment in.
              </p>
              <p className="text-[#5E524F] text-xs leading-relaxed">
                Duurt ongeveer 3 minuten. Je gegevens worden vertrouwelijk behandeld — lees de{" "}
                <Link href="/privacyverklaring" className="text-[#946B66] underline">
                  privacyverklaring
                </Link>
                .
              </p>
              <label className="flex items-start gap-2 text-xs text-[#5E524F] leading-relaxed pt-2">
                <input
                  type="checkbox"
                  checked={consentAi}
                  onChange={(e) => setConsentAi(e.target.checked)}
                  className="mt-0.5 accent-[#946B66]"
                />
                <span>
                  Ik geef toestemming dat mijn antwoorden tijdelijk worden verwerkt door een AI-assistent
                  (Anthropic, EU/VS) om vervolgvragen te formuleren. Zonder dit vinkje krijg je gewone vragen
                  zonder AI.
                </span>
              </label>
            </div>
          )}

          {step === 1 && (
            <IntakeChips
              variant="card"
              options={ALONE_OR_COUPLE}
              value={aloneOrCouple}
              onChange={(v) => setAloneOrCouple(v as AloneOrCouple)}
            />
          )}

          {step === 2 && (
            <IntakeChips options={GENDERS} value={gender} onChange={setGender} />
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-[#5E524F]">Kies wat het meest in de buurt komt — je kan straks nuanceren.</p>
              <IntakeChips options={PROBLEMS} value={problem} onChange={setProblem} />
            </div>
          )}

          {(step === 4 || step === 5 || step === 6) && (
            <div className="space-y-4">
              {consentAi ? (
                <div className="bg-[#F5F0EB] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#946B66] flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-[#946B66] uppercase tracking-wide">
                      AI-assistent
                    </span>
                  </div>
                  {aiLoading && !currentAiQuestion ? (
                    <div className="flex gap-1 py-1">
                      <span className="w-1.5 h-1.5 bg-[#C4A4A0] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#C4A4A0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#C4A4A0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  ) : (
                    <p className="text-[#5E524F] text-sm leading-relaxed whitespace-pre-wrap">
                      {currentAiQuestion}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-[#5E524F] text-sm leading-relaxed">
                  {step === 4 && "Wat speelt er nu het meest in jullie relatie?"}
                  {step === 5 && "Hoe lang loopt dit al, en wat hebben jullie zelf geprobeerd?"}
                  {step === 6 && "Stel: over een half jaar gaat het beter. Wat is er dan anders?"}
                </p>
              )}
              <textarea
                value={currentAiAnswer}
                onChange={(e) => setCurrentAiAnswer(e.target.value)}
                placeholder="Schrijf zoveel of weinig als je wilt…"
                rows={5}
                maxLength={600}
                className="w-full px-4 py-3 text-sm bg-white border-2 border-[#E8D5D2] rounded-xl focus:outline-none focus:border-[#C4A4A0] resize-none"
              />
              <div className="text-right text-[11px] text-[#B0ADAB]">{currentAiAnswer.length}/600</div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-4">
              {aiSummary && (
                <div className="bg-[#F5F0EB] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#946B66] flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-[#946B66] uppercase tracking-wide">
                      Samenvatting
                    </span>
                  </div>
                  <p className="text-[#5E524F] text-sm leading-relaxed whitespace-pre-wrap">{aiSummary}</p>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#946B66] uppercase tracking-wide mb-1.5">
                    Jouw naam *
                  </label>
                  <input
                    type="text"
                    value={naam}
                    onChange={(e) => setNaam(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-white border-2 border-[#E8D5D2] rounded-xl focus:outline-none focus:border-[#C4A4A0]"
                  />
                </div>
                {aloneOrCouple === "samen" && (
                  <div>
                    <label className="block text-xs font-semibold text-[#946B66] uppercase tracking-wide mb-1.5">
                      Naam partner
                    </label>
                    <input
                      type="text"
                      value={partnerNaam}
                      onChange={(e) => setPartnerNaam(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white border-2 border-[#E8D5D2] rounded-xl focus:outline-none focus:border-[#C4A4A0]"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-[#946B66] uppercase tracking-wide mb-1.5">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-white border-2 border-[#E8D5D2] rounded-xl focus:outline-none focus:border-[#C4A4A0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#946B66] uppercase tracking-wide mb-1.5">
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    value={telefoon}
                    onChange={(e) => setTelefoon(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-white border-2 border-[#E8D5D2] rounded-xl focus:outline-none focus:border-[#C4A4A0]"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-4">
              <p className="text-sm text-[#5E524F]">
                Kies een moment voor de gratis kennismaking (90 min, aan huis in Tilburg en omgeving).
              </p>
              <SlotPicker
                selectedSlotId={slot?.id}
                onSelect={(s) => {
                  setSlot(s);
                  setSubmitError(null);
                }}
              />
              <label className="flex items-start gap-2 text-xs text-[#5E524F] leading-relaxed pt-2">
                <input
                  type="checkbox"
                  checked={consentStorage}
                  onChange={(e) => setConsentStorage(e.target.checked)}
                  className="mt-0.5 accent-[#946B66]"
                />
                <span>
                  Ik ga akkoord dat mijn gegevens worden verwerkt en gedeeld met Eva ter voorbereiding van de
                  intake (
                  <Link href="/privacyverklaring" className="text-[#946B66] underline">
                    privacyverklaring
                  </Link>
                  ).
                </span>
              </label>
              {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
            </div>
          )}

          {step === 9 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E8D5D2] flex items-center justify-center">
                <Check className="w-8 h-8 text-[#946B66]" />
              </div>
              <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866]">
                Afspraak gepland
              </h3>
              <p className="text-[#5E524F] text-sm leading-relaxed">
                {confirmedLabel ? (
                  <>
                    Je staat genoteerd voor <strong>{confirmedLabel}</strong>. Eva neemt binnen 24 uur contact op
                    via e-mail om jullie adres te bevestigen.
                  </>
                ) : (
                  "Je staat genoteerd. Eva neemt binnen 24 uur contact op."
                )}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 9 && (
          <div className="border-t border-[#F5F0EB] px-5 py-4 flex items-center justify-between bg-white">
            {step > 0 ? (
              <button
                onClick={back}
                className="flex items-center gap-1 text-sm text-[#5E524F] hover:text-[#946B66] transition"
                disabled={submitting}
              >
                <ArrowLeft className="w-4 h-4" /> Terug
              </button>
            ) : (
              <span />
            )}

            {step === 0 && (
              <button onClick={next} className="px-5 py-2.5 rounded-full text-sm font-semibold btn-primary inline-flex items-center gap-1.5">
                Beginnen <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {step === 1 && (
              <button
                onClick={next}
                disabled={!aloneOrCouple}
                className="px-5 py-2.5 rounded-full text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                Volgende <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {step === 2 && (
              <button
                onClick={next}
                disabled={!gender}
                className="px-5 py-2.5 rounded-full text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                Volgende <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {step === 3 && (
              <button
                onClick={next}
                disabled={!problem}
                className="px-5 py-2.5 rounded-full text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                Volgende <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {(step === 4 || step === 5 || step === 6) && (
              <button
                onClick={submitAiAnswer}
                disabled={!currentAiAnswer.trim() || aiLoading}
                className="px-5 py-2.5 rounded-full text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                Volgende <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {step === 7 && (
              <button
                onClick={next}
                disabled={!naam || !email}
                className="px-5 py-2.5 rounded-full text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                Naar agenda <Calendar className="w-4 h-4" />
              </button>
            )}
            {step === 8 && (
              <button
                onClick={submit}
                disabled={submitting || !slot || !consentStorage}
                className="px-5 py-2.5 rounded-full text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                {submitting ? "Versturen…" : "Bevestig afspraak"}
              </button>
            )}
          </div>
        )}
        {step === 9 && (
          <div className="border-t border-[#F5F0EB] px-5 py-4 flex justify-end bg-white">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 rounded-full text-sm font-semibold btn-primary"
            >
              Sluiten
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
