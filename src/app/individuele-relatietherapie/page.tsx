import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "individuele-relatietherapie";
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
    q: "Is individuele relatietherapie hetzelfde als een volledig IBCT-traject?",
    a: "Nee. IBCT is van oorsprong een methode voor koppels. Zo zijn er bijvoorbeeld opdrachten en oefeningen ontworpen om samen te doen. In individuele sessies werk ik op basis van IBCT-principes, maar zonder het volledige traject.",
  },
  {
    q: "Kan mijn partner later alsnog aansluiten?",
    a: "Dat is mogelijk. Sommige mensen starten individueel en besluiten later samen verder te gaan. Dat bespreken we als het moment zich aandient.",
  },
  {
    q: "Hoeveel sessies heb ik nodig?",
    a: "Dat verschilt per persoon en situatie. Er is geen vast traject. Na het kennismakingsgesprek kijken we samen wat passend is.",
  },
  {
    q: "Wordt individuele relatietherapie vergoed?",
    a: "Relatietherapie wordt doorgaans niet vergoed door de basisverzekering. Raadpleeg je aanvullende verzekering.",
  },
  {
    q: "Waar vinden de sessies plaats?",
    a: "Sessies vinden altijd bij jou thuis plaats, binnen Tilburg en omgeving.",
  },
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
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Alleen in therapie, toch aan de relatie werken
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Relatietherapie zonder partner is mogelijk. Wanneer jij begrijpt wat jouw
                reacties aanstuurt en hoe jij bijdraagt aan terugkerende patronen, verandert er
                iets. Omdat jij leert zien waar jouw gevoeligheden liggen, te verwoorden wat er
                speelt in jouw binnenwereld en te aanvaarden wat niet maakbaar is. Dat heeft
                effect op de dynamiek tussen jullie, ook als je partner niet in therapie gaat.
              </p>
              <p>
                Individuele sessies zijn geen vervanging van een volledig IBCT-traject. IBCT is
                van oorsprong een methode voor koppels, met opdrachten en oefeningen die je
                samendoet. Wat ik bied in individuele begeleiding: een gerichte verkenning van
                jouw aandeel, op basis van IBCT-principes. Dat kan van grote waarde zijn, zeker
                wanneer je partner (nog) niet openstaat voor therapie.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Voor wie?
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 text-[#5E524F] text-base md:text-lg leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Je wilt begrijpen wat jouw aandeel is in terugkerende patronen.</li>
                <li>Je wilt leren omgaan met verschillen en dat wat niet verandert.</li>
                <li>Je wilt onderzoeken welke emotionele gevoeligheden jouw reacties sturen.</li>
              </ul>
            </div>
          </div>
        </section>

        <LandingCTA
          title="Tarief: €100 per sessie · 60 minuten"
          text="Een sessie duurt 60 minuten en vindt plaats bij jou thuis. Neem contact op om te bespreken of individuele relatietherapie passend is voor jouw situatie of plan direct een intakegesprek."
        />

        <LandingFAQ items={faqs} />
      </main>
      <Footer />
    </>
  );
}
