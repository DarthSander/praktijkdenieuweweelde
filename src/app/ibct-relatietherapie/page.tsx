import type { Metadata } from "next";
import { Heart, HandHeart, Sparkles, MessageCircle, Compass, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "ibct-relatietherapie";
const page = getLandingBySlug(slug)!;

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.description,
  alternates: {
    canonical: `https://www.praktijkdenieuweweelde.nl/${slug}`,
  },
  openGraph: {
    title: page.metaTitle,
    description: page.description,
    url: `https://www.praktijkdenieuweweelde.nl/${slug}`,
    type: "website",
    images: [{ url: page.image, alt: page.imageAlt }],
  },
};

const faqs: FAQItem[] = [
  {
    q: "Waar staat IBCT precies voor?",
    a: "IBCT staat voor Integrative Behavioral Couple Therapy. Het is een vorm van relatietherapie die acceptatie en gedragsverandering combineert. De methode helpt koppels om patronen te begrijpen, verschillen te accepteren en nieuwe manieren van omgaan met elkaar te ontwikkelen.",
  },
  {
    q: "Wat maakt IBCT anders dan andere vormen van relatietherapie?",
    a: "IBCT richt zich niet alleen op communicatie of gedrag, maar ook op de onderliggende gevoeligheden en verschillen die spanning veroorzaken. Door acceptatie en verandering te combineren ontstaat er ruimte voor echte beweging, zonder dat één van jullie zich moet aanpassen of “de schuld” krijgt.",
  },
  {
    q: "Hoe wetenschappelijk is IBCT eigenlijk?",
    a: "IBCT is een van de best onderzochte vormen van relatietherapie wereldwijd. De methode is ontwikkeld aan de University of California en wordt ondersteund door tientallen jaren onderzoek. In Nederland wordt IBCT gebruikt door veel relatietherapeuten en systeemtherapeuten vanwege de sterke wetenschappelijke basis.",
  },
  {
    q: "Hoeveel sessies zijn er meestal nodig?",
    a: "Er worden 10 sessies per koppel ingericht voor het gehele traject. De meeste koppels volgen tussen de 8 en 15 sessies. De duur hangt af van jullie situatie, de intensiteit van de patronen en wat jullie willen bereiken. Tijdens de intake bespreken we wat voor jullie passend lijkt en evalueren we regelmatig het tempo.",
  },
  {
    q: "Wat is de PEEP-analyse?",
    a: "De PEEP-analyse is een manier om jullie interactiepatroon helder te krijgen. We kijken naar persoonlijke verschillen, emotionele gevoeligheden, externe stressoren en patronen in de interactie. Dit geeft inzicht in waar jullie vastlopen en waar ruimte zit voor verandering.",
  },
  {
    q: "Is IBCT geschikt voor elk koppel?",
    a: "IBCT is geschikt voor koppels die vastlopen in terugkerende patronen, botsende verschillen, afstand, twijfels of een vertrouwensbreuk. Ook wanneer één van jullie twijfelt over samen verder gaan, kan IBCT helpen om helderheid te krijgen, zonder druk of sturing naar een bepaalde uitkomst.",
  },
];

const bouwstenen = [
  {
    number: "1",
    icon: Heart,
    title: "Onderlinge verschillen accepteren",
    text: "We onderzoeken welke gevoeligheden, verwachtingen en emoties er onder jullie reacties liggen. Hierdoor ontstaat meer begrip en zachtheid, wat ruimte geeft om elkaar weer te bereiken.",
  },
  {
    number: "2",
    icon: HandHeart,
    title: "Verschillen en spanningen leren verdragen",
    text: "Niet alle verschillen verdwijnen. Met technieken zoals exposure en zelfzorg leren jullie omgaan met terugkerende spanningen zonder dat ze steeds opnieuw escaleren.",
  },
  {
    number: "3",
    icon: Sparkles,
    title: "Uitwisselen van positief gedrag",
    text: "We bouwen aan kleine, haalbare gedragsveranderingen die direct effect hebben in het dagelijks leven. Denk aan waardering uitspreken, positieve momenten creëren en gedrag dat spanning oproept vervangen door gedrag dat wél werkt.",
  },
  {
    number: "4",
    icon: MessageCircle,
    title: "Communicatie verbeteren",
    text: "We oefenen met duidelijk aangeven wat je bedoelt, luisteren zonder te onderbreken en escalatie tijdig stoppen.",
  },
  {
    number: "5",
    icon: Target,
    title: "Samen problemen oplossen",
    text: "Niet elk probleem verdwijnt vanzelf door meer begrip of acceptatie. In dit onderdeel nemen we de huidige manier van problemen oplossen onder de loep en oefenen we met een gestructureerde aanpak via het TOP-plan.",
  },
];

const deepPeep = [
  {
    title: "Persoonlijke verschillen",
    text: "De onderlinge verschillen die spanning oproepen of botsingen veroorzaken.",
  },
  {
    title: "Emotionele gevoeligheden",
    text: "De kwetsbaarheden, verwachtingen en pijnpunten die onder jullie reacties liggen.",
  },
  {
    title: "Externe stressoren",
    text: "Factoren van buitenaf die druk geven, zoals werkstress, ouderschap, mantelzorg of financiële zorgen.",
  },
  {
    title: "Patronen in de interactie",
    text: "De manier waarop jullie op elkaar reageren en hoe die reacties elkaar versterken.",
  },
];

const fasen = [
  {
    label: "Fase 1",
    sessions: "1–3 sessies",
    title: "Intake en assessment",
    intro: "In deze fase leer ik jullie en jullie relatiegeschiedenis goed kennen. We verkennen:",
    bullets: [
      "wat er speelt",
      "welke patronen zichtbaar zijn",
      "wat jullie verlangen of missen",
    ],
    outro:
      "Soms spreek ik partners individueel wanneer dat helpt om het geheel beter te begrijpen. Op basis hiervan maak ik een casusconceptualisatie: een helder overzicht van jullie persoonlijke verschillen, emotionele gevoeligheden, externe stressoren en patronen in de interactie.",
  },
  {
    label: "Fase 2",
    sessions: "5–15 sessies",
    title: "Acceptatie en verandering",
    intro: "Dit is het hart van de therapie. We werken aan acceptatie, verdraagzaamheid, gedragsverandering en communicatie. Steeds afgestemd op wat jullie op dat moment nodig hebben.",
    bullets: [],
    outro:
      "In deze fase zie je vaak beweging: de ene week voelt het lichter, de volgende week is het weer moeilijker. Dat hoort bij het proces.",
  },
  {
    label: "Fase 3",
    sessions: "2–3 sessies",
    title: "Afronden en bestendigen",
    intro: "We richten ons op:",
    bullets: [
      "het vasthouden van wat jullie hebben geleerd",
      "signalen herkennen",
      "terugval voorkomen",
      "weten wat te doen als het toch even misloopt",
    ],
    outro:
      "Soms plannen we een terugkommoment om te kijken hoe het gaat en waar eventueel bijgestuurd kan worden.",
  },
];

const themas = [
  "vastlopende communicatie",
  "het aandringen-terugtrekken patroon (de één dringt aan, de ander trekt zich terug)",
  "intimiteit en seksualiteit",
  "vertrouwen herstellen na ontrouw of een andere vertrouwensbreuk",
  "rolverdeling en verwachtingen",
  "grote levensovergangen (kinderen, verhuizing, baanwissel)",
  "vermijding van lastige gesprekken",
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Navbar />
      <main className="bg-[#F5F0EB]">
        <LandingHero
          kicker={page.heroKicker}
          h1={page.h1}
          subtitle={page.heroSubtitle}
          image={page.image}
          imageAlt={page.imageAlt}
        />

        <section id="inhoud" className="section-padding bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                IBCT (Integrative Behavioral Couple Therapy) is een wetenschappelijk onderbouwde
                vorm van relatietherapie die werkt met twee pijlers: acceptatie van wat niet of
                moeilijk veranderbaar is, en verandering van gedrag waar dat wél kan. Die
                combinatie maakt IBCT effectief voor koppels die vastlopen in terugkerende
                patronen, botsende verschillen of situaties waarin emoties hoog oplopen.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Wat IBCT is
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                IBCT werd ontwikkeld door Andrew Christensen en Neil Jacobson en is wereldwijd
                een van de best onderzochte vormen van relatietherapie. De kern van IBCT is dat
                duurzame verandering ontstaat wanneer koppels:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>begrijpen wat er onder hun reacties ligt,</li>
                <li>anders leren omgaan met verschillen,</li>
                <li>haalbare gedragsveranderingen aanbrengen die de relatie versterken.</li>
              </ul>
              <p>
                Als je alleen op verandering inzet, ontstaat er druk die de relatie verder onder
                spanning zet. Alleen investeren in acceptatie betekent dat gedragspatronen die
                schaden onveranderd blijven. IBCT brengt die twee in balans.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                De vijf bouwstenen van IBCT
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                IBCT werkt met vijf interventiegebieden die elkaar versterken.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {bouwstenen.map((b) => (
                <div key={b.number} className="bg-[#F5F0EB] rounded-2xl p-6 md:p-7">
                  <div className="flex gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#E8D5D2]/60 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-5 h-5 text-[#946B66]" />
                    </div>
                    <div>
                      <p className="text-[#C4A4A0] text-xs font-semibold uppercase tracking-wider mb-1">
                        Bouwsteen {b.number}
                      </p>
                      <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg">
                        {b.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="w-14 h-14 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center mx-auto mb-5">
                <Compass className="w-6 h-6 text-[#946B66]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                De PEEP-analyse
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                In IBCT gebruiken we de PEEP-analyse om zicht te krijgen op wat er tussen jullie
                gebeurt. We kijken naar jullie persoonlijke verschillen, de emotionele
                gevoeligheden die onder reacties liggen, de externe stressoren die druk geven en
                de patronen in de interactie die zich herhalen. Dit geeft een helder beeld van
                waar jullie vastlopen en waar ruimte zit voor verandering.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {deepPeep.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 md:p-7">
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Hoe een IBCT-traject eruitziet
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Een traject bestaat uit drie fasen. Elke fase heeft een eigen doel, tempo en
                manier van werken.
              </p>
            </div>
            <div className="space-y-6">
              {fasen.map((fase) => (
                <div key={fase.label} className="bg-[#F5F0EB] rounded-2xl p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                    <p className="text-[#C4A4A0] text-xs font-semibold uppercase tracking-wider">
                      {fase.label} &middot; {fase.sessions}
                    </p>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-xl md:text-2xl">
                      {fase.title}
                    </h3>
                  </div>
                  <div className="text-[#5E524F] text-sm md:text-base leading-relaxed space-y-3">
                    <p>{fase.intro}</p>
                    {fase.bullets.length > 0 && (
                      <ul className="list-disc pl-6 space-y-1.5">
                        {fase.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    <p>{fase.outro}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 md:p-10 text-[#5E524F] text-base md:text-lg leading-relaxed space-y-4">
              <p>IBCT is inzetbaar bij uiteenlopende relatievraagstukken, zoals:</p>
              <ul className="list-disc pl-6 space-y-2">
                {themas.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <LandingCTA
          title="Is IBCT passend voor jullie?"
          text="In een intakegesprek verkennen we samen jullie situatie en kijken we of IBCT aansluit bij wat jullie zoeken."
        />

        <LandingFAQ heading="Veelgestelde vragen" items={faqs} />
      </main>
      <Footer />
    </>
  );
}
