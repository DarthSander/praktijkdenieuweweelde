import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Scale, Heart, Compass } from "lucide-react";
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
  title: page.title,
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
    a: "IBCT staat voor Integrative Behavioral Couple Therapy. Het is ontwikkeld door Andrew Christensen en Neil Jacobson aan de University of California. Het model combineert gedragsmatige verandering met acceptatie van wat moeilijk veranderbaar is.",
  },
  {
    q: "Wat maakt IBCT anders dan andere vormen van relatietherapie?",
    a: "IBCT werkt niet alleen aan communicatievaardigheden, maar vooral aan de emotionele laag eronder. We kijken naar het patroon tussen jullie (de DEEP-analyse), naar zachte emoties onder harde reacties, en naar wat wel en niet te veranderen is. Die combinatie maakt het effect duurzamer.",
  },
  {
    q: "Hoe wetenschappelijk is IBCT eigenlijk?",
    a: "IBCT is een van de best onderzochte vormen van relatietherapie wereldwijd. Grootschalig onderzoek laat zien dat ongeveer twee derde van de koppels na een IBCT-traject een duidelijke verbetering ervaart. De effecten houden bij de meeste stellen ook na twee en vijf jaar stand.",
  },
  {
    q: "Hoeveel sessies zijn er meestal nodig?",
    a: "Een IBCT-traject bestaat vaak uit acht tot twintig sessies. We beginnen met een assessmentfase van drie tot vier sessies waarin we jullie dynamiek helder krijgen. Daarna werken we gericht aan acceptatie en verandering.",
  },
  {
    q: "Wat is de DEEP-analyse?",
    a: "De DEEP-analyse is de kern van IBCT. We kijken naar Differences (verschillen tussen jullie), Emotional sensitivities (emotionele kwetsbaarheden), External stressors (omstandigheden die meedoen), en Patterns of communication (hoe jullie met elkaar praten). Samen verklaart dat waarom dezelfde thema&apos;s blijven terugkomen.",
  },
  {
    q: "Is IBCT geschikt voor elk koppel?",
    a: "IBCT werkt voor de meeste relatieproblematiek, van communicatie tot intimiteit tot levensfase-overgangen. Bij acuut huiselijk geweld of actieve verslaving is een andere zorgvorm vaak eerst nodig. In het kennismakingsgesprek kijken we samen of IBCT passend is voor jullie situatie.",
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
              Wat IBCT is
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                IBCT, voluit Integrative Behavioral Couple Therapy, is een vorm van
                relatietherapie die is ontwikkeld door Andrew Christensen en Neil Jacobson. Het
                model werd in de jaren negentig in de Verenigde Staten ontwikkeld en is sindsdien
                een van de best onderzochte vormen van relatietherapie wereldwijd.
              </p>
              <p>
                De kern van IBCT is dat duurzame verandering in een relatie twee dingen nodig
                heeft: werkelijke verandering van gedrag waar dat kan, en acceptatie van wat niet
                of moeilijk veranderbaar is. Als je alleen op verandering inzet, raakt de
                relatie uitgeput. Als je alleen op acceptatie inzet, blijft er te veel pijn
                onuitgesproken. De combinatie maakt dat er ruimte ontstaat.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                De vier bouwstenen
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Deze onderdelen komen in vrijwel elk IBCT-traject terug. Niet in vaste volgorde,
                wel steeds in onderlinge samenhang.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Compass,
                  title: "De DEEP-analyse",
                  text: "Jullie eigen patroon in kaart. Welke verschillen spelen een rol, welke emotionele gevoeligheden raken jullie, welke externe druk doet mee, en hoe praten jullie als het schuurt.",
                },
                {
                  icon: Heart,
                  title: "Zachte emoties onder harde",
                  text: "Boosheid is vaak een beschermlaag. Daaronder zit kwetsbaarheid: pijn, teleurstelling, angst om er niet toe te doen. Die laag zichtbaar maken is de motor van verandering.",
                },
                {
                  icon: Scale,
                  title: "Empathic joining",
                  text: "Een techniek waarin jullie elkaar opnieuw raken, niet door compromissen maar door begrip voor hoe het er voor de ander werkelijk uitziet. Daardoor verandert vaak het gedrag vanzelf mee.",
                },
                {
                  icon: BookOpen,
                  title: "Tolerance building",
                  text: "Niet alles hoeft opgelost. Sommige verschillen blijven. Tolerance building helpt om die verschillen minder pijnlijk te maken, zodat jullie er samen mee kunnen leven zonder ze elke keer weer uit te vechten.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 md:p-7 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#946B66]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Hoe een traject eruitziet
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Een IBCT-traject begint met een assessmentfase van drie tot vier sessies. In die
                fase leer ik jullie kennen, breng ik jullie patroon in kaart en maak ik samen met
                jullie de DEEP-analyse. Die analyse deel ik in de zogenoemde feedbacksessie:
                jullie krijgen een helder beeld van wat jullie dynamiek drijft en waar de ruimte
                zit.
              </p>
              <p>
                Daarna volgt de werkfase. Hierin werken we aan empathic joining, oefenen we met
                tolerance building en brengen we actieve verandering aan waar dat mogelijk is.
                Jullie eigen window of tolerance speelt daarin een rol: als de spanning te hoog
                oploopt, wordt het ingewikkeld om echt contact te maken. We werken dan eerst aan
                het terugvinden van die ruimte.
              </p>
              <p>
                Een traject duurt vaak acht tot twintig sessies, afhankelijk van wat jullie nodig
                hebben. Meer over looptijd en wanneer therapie helpt vind je in de blogs over{" "}
                <Link href="/blog/hoe-lang-duurt-relatietherapie">hoe lang relatietherapie duurt</Link>
                {" "}en{" "}
                <Link href="/blog/wanneer-is-relatietherapie-zinvol">
                  wanneer relatietherapie zinvol is
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Voor welke thema&apos;s werkt IBCT
              </h2>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                IBCT is inzetbaar voor een brede waaier aan relatievraagstukken. Communicatie die
                vastloopt, het demand-withdraw-patroon waarin de een druk zet en de ander zich
                terugtrekt, seksualiteit en intimiteit, vertrouwen na een breuk, rolverdeling,
                grote levensovergangen zoals een kind of baanwissel, en patronen van vermijding
                waarbij jullie lastige gesprekken steeds uit de weg gaan.
              </p>
              <p>
                Een belangrijk concept dat IBCT gebruikt is zelfdifferentiatie: het vermogen om
                emotioneel dicht bij je partner te kunnen zijn zonder jezelf kwijt te raken. Veel
                conflicten zijn in de kern een worsteling daartussen. Als dat evenwicht zich
                herstelt, kunnen jullie tegelijk verbonden én jezelf zijn.
              </p>
            </div>
          </div>
        </section>

        <LandingCTA
          title="Benieuwd of IBCT bij jullie past?"
          text="Het kennismakingsgesprek is gratis en zonder verplichting. We verkennen jullie situatie en kijken of IBCT aansluit bij wat jullie zoeken."
        />

        <LandingFAQ heading="Veelgestelde vragen over IBCT" items={faqs} />
      </main>
      <Footer />
    </>
  );
}
