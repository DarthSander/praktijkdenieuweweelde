import { Check } from "lucide-react";

const plans = [
  {
    title: "Relatietherapie Sessie",
    subtitle: "Intake of vervolgsessie bij jullie thuis",
    sessions: "Gemiddeld 10 sessies",
    price: 150,
    priceSuffix: ",-",
    per: "/ 90 minuten",
    features: [
      "Inclusief reiskosten binnen Tilburg",
      "IBCT methode",
      "Praktische oefeningen voor thuis",
    ],
    cta: "Afspraak maken",
    primary: true,
    delay: "100",
  },
  {
    title: "APK voor Relaties",
    subtitle: "Preventieve check-up (3 sessies)",
    sessions: null,
    price: 325,
    priceSuffix: ",-",
    per: "/ totaal",
    features: [
      "Analyse van patronen",
      "Versterken wat goed gaat",
      "Voorkomen van relatieproblemen",
    ],
    cta: "Meer informatie",
    primary: false,
    delay: "200",
  },
];

export default function Tarieven() {
  return (
    <section id="tarieven" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866]">
            Tarieven
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {plans.map((plan) => (
            <div
              key={plan.title}
              data-aos="fade-up"
              data-aos-delay={plan.delay}
              className="tarief-card card-accent-hover bg-[#F5F0EB] rounded-2xl p-8 flex flex-col"
            >
              <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-1">
                {plan.title}
              </h3>
              <div className="min-h-[3.5rem] mb-5">
                <p className="text-[#C4A4A0] text-sm mb-1">{plan.subtitle}</p>
                {plan.sessions && (
                  <p className="text-[#C4A4A0] text-xs italic">{plan.sessions}</p>
                )}
              </div>
              <p className="text-3xl font-bold text-[#6B6866] mb-8">
                €{plan.price}{plan.priceSuffix}
                <span className="text-base font-normal text-[#C4A4A0] ml-1">{plan.per}</span>
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-[#5E524F] text-sm">
                    <Check className="w-4 h-4 text-[#D4B5B1] mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 mt-auto ${
                  plan.primary ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#C4A4A0] mt-8">
          * Relatietherapie wordt doorgaans niet vergoed door de basisverzekering. Raadpleeg je aanvullende verzekering.
        </p>
      </div>
    </section>
  );
}
