import type { Metadata } from "next";
import Link from "next/link";
import { Heart, HandHeart, Sparkles, MessageCircle, Compass } from "lucide-react";
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
    a: "IBCT staat voor Integrative Behavioral Couple Therapy, een vorm van relatietherapie die in de jaren negentig in de Verenigde Staten is ontwikkeld door Andrew Christensen en Neil Jacobson. Het model combineert acceptatie van wat moeilijk veranderbaar is met gerichte gedragsverandering waar dat wel kan.",
  },
  {
    q: "Wat maakt IBCT anders dan andere vormen van relatietherapie?",
    a: "IBCT werkt niet alleen aan communicatievaardigheden, maar vooral aan de emotionele laag eronder. We brengen jullie eigen patroon in kaart met de DEEP/PEEP-analyse, maken zichtbaar wat onder harde reacties ligt, en kijken samen wat wel en niet veranderbaar is. Die combinatie maakt het effect duurzamer.",
  },
  {
    q: "Hoe wetenschappelijk is IBCT eigenlijk?",
    a: "IBCT is een van de best onderzochte vormen van relatietherapie wereldwijd. Grootschalig onderzoek laat zien dat ongeveer twee derde van de koppels na een IBCT-traject een duidelijke verbetering ervaart. De effecten houden bij de meeste stellen ook na twee en vijf jaar stand.",
  },
  {
    q: "Hoeveel sessies zijn er meestal nodig?",
    a: "Een IBCT-traject bestaat vaak uit acht tot twintig sessies. We beginnen met een kennismakingsfase van drie tot vier sessies waarin we jullie dynamiek helder krijgen. Daarna werken we gericht aan acceptatie, tolerantie en verandering.",
  },
  {
    q: "Wat is de DEEP/PEEP-analyse?",
    a: "De DEEP/PEEP-analyse is de kern van IBCT. We kijken naar persoonlijke verschillen, emotionele gevoeligheden, externe stressoren en patronen in de interactie. Samen verklaren die vier elementen waarom dezelfde thema's tussen jullie blijven terugkomen.",
  },
  {
    q: "Is IBCT geschikt voor elk koppel?",
    a: "IBCT werkt voor de meeste relatieproblematiek, van communicatie tot intimiteit tot levensfase-overgangen. Bij acuut huiselijk geweld of actieve verslaving is een andere zorgvorm vaak eerst nodig. In het intakegesprek kijken we samen of IBCT passend is voor jullie situatie.",
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
                De vier IBCT-processen
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                IBCT werkt langs vier samenhangende sporen. Niet in een vaste volgorde, wel
                steeds in onderlinge afstemming op wat jullie nodig hebben.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 md:p-7">
                <div className="flex gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-[#946B66]" />
                  </div>
                  <div>
                    <p className="text-[#C4A4A0] text-xs font-semibold uppercase tracking-wider mb-1">
                      Eerste spoor &middot; acceptatie
                    </p>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg">
                      Acceptatie-processen
                    </h3>
                  </div>
                </div>
                <p className="text-[#5E524F] text-sm md:text-base leading-relaxed mb-3">
                  Onderlinge verschillen leren accepteren in plaats van bevechten.
                </p>
                <ul className="text-[#5E524F] text-sm md:text-base leading-relaxed space-y-2 list-disc pl-5">
                  <li>
                    <strong>Emotionele acceptatie</strong> &mdash; inzicht krijgen in de
                    gevoeligheden, verwachtingen en kwetsbaarheden die onder reacties liggen.
                  </li>
                  <li>
                    <strong>Empathische aansluiting</strong> &mdash; elkaar weer kunnen bereiken
                    op de momenten waarop het schuurt; begrijpen wat er onder de oppervlakte
                    speelt.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-7">
                <div className="flex gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center flex-shrink-0">
                    <HandHeart className="w-5 h-5 text-[#946B66]" />
                  </div>
                  <div>
                    <p className="text-[#C4A4A0] text-xs font-semibold uppercase tracking-wider mb-1">
                      Tweede spoor &middot; tolerantie
                    </p>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg">
                      Tolerantie bevorderen
                    </h3>
                  </div>
                </div>
                <p className="text-[#5E524F] text-sm md:text-base leading-relaxed mb-3">
                  Leren omgaan met verschillen die niet verdwijnen.
                </p>
                <ul className="text-[#5E524F] text-sm md:text-base leading-relaxed space-y-2 list-disc pl-5">
                  <li>
                    <strong>Exposure</strong> &mdash; stap voor stap oefenen met situaties die
                    spanning oproepen, zodat ze minder beladen worden.
                  </li>
                  <li>
                    <strong>Zelfzorg</strong> &mdash; herkennen wat je nodig hebt om kalm te
                    blijven in lastige momenten.
                  </li>
                  <li>
                    <strong>Normalisatie</strong> &mdash; begrijpen dat sommige verschillen
                    normaal zijn en niet opgelost hoeven te worden.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-7">
                <div className="flex gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#946B66]" />
                  </div>
                  <div>
                    <p className="text-[#C4A4A0] text-xs font-semibold uppercase tracking-wider mb-1">
                      Verandering
                    </p>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg">
                      Uitwisseling van positief gedrag
                    </h3>
                  </div>
                </div>
                <p className="text-[#5E524F] text-sm md:text-base leading-relaxed mb-3">
                  Kleine, haalbare gedragsveranderingen die direct effect hebben:
                </p>
                <ul className="text-[#5E524F] text-sm md:text-base leading-relaxed space-y-1.5 list-disc pl-5">
                  <li>Positieve gedragingen bewust inzetten.</li>
                  <li>Waardering vaker uitspreken.</li>
                  <li>Momenten van verbinding opzoeken.</li>
                  <li>Gedrag dat spanning oproept vervangen door gedrag dat wél werkt.</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-7">
                <div className="flex gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#946B66]" />
                  </div>
                  <div>
                    <p className="text-[#C4A4A0] text-xs font-semibold uppercase tracking-wider mb-1">
                      Vaardigheden
                    </p>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg">
                      Communicatie verbeteren
                    </h3>
                  </div>
                </div>
                <p className="text-[#5E524F] text-sm md:text-base leading-relaxed mb-3">
                  Vaardigheden die helpen om gesprekken helder en veilig te houden:
                </p>
                <ul className="text-[#5E524F] text-sm md:text-base leading-relaxed space-y-1.5 list-disc pl-5">
                  <li>Duidelijk aangeven wat je bedoelt.</li>
                  <li>Luisteren zonder te onderbreken.</li>
                  <li>Ruzies stoppen voordat ze escaleren.</li>
                  <li>Gesprekken voeren die helderheid geven in plaats van verwarring.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="w-14 h-14 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center mx-auto mb-5">
                <Compass className="w-6 h-6 text-[#946B66]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                De DEEP/PEEP-analyse
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Om helder te krijgen waarom jullie vastlopen, gebruiken we de DEEP/PEEP-analyse.
                Daarbij kijken we naar vier elementen die samen jullie interactiepatroon vormen.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
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
              ].map((item) => (
                <div key={item.title} className="bg-[#F5F0EB] rounded-2xl p-6 md:p-7">
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-[#5E524F] text-base md:text-lg leading-relaxed text-center mt-10 max-w-2xl mx-auto">
              Deze analyse maakt zichtbaar wat er tussen jullie gebeurt en waar ruimte zit voor
              acceptatie, tolerantie en verandering.
            </p>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Hoe een traject eruitziet
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Een IBCT-traject begint met een kennismakingsfase van drie tot vier sessies. In
                die fase leer ik jullie kennen, breng ik jullie patroon in kaart en maak ik samen
                met jullie de DEEP/PEEP-analyse. Die analyse deel ik in een terugkoppelsessie:
                jullie krijgen een helder beeld van wat jullie dynamiek drijft en waar de ruimte
                zit.
              </p>
              <p>
                Daarna volgt de werkfase. Hierin werken we aan empathische aansluiting, oefenen
                we met tolerantie bevorderen en brengen we actieve verandering aan waar dat
                mogelijk is. Jullie eigen draagvermogen voor spanning speelt daarin een rol: als
                de spanning te hoog oploopt, wordt het ingewikkeld om echt contact te maken. We
                werken dan eerst aan het terugvinden van die ruimte.
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

        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Voor welke thema&apos;s werkt IBCT
              </h2>
            </div>
            <div className="bg-[#F5F0EB] rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                IBCT is inzetbaar voor een brede waaier aan relatievraagstukken. Communicatie die
                vastloopt, het vraag-en-terugtrek-patroon waarin de een druk zet en de ander
                zich terugtrekt, seksualiteit en intimiteit, vertrouwen na een breuk,
                rolverdeling, grote levensovergangen zoals een kind of baanwissel, en patronen
                van vermijding waarbij jullie lastige gesprekken steeds uit de weg gaan.
              </p>
              <p>
                Een belangrijk uitgangspunt in IBCT is dat jullie tegelijk verbonden én jezelf
                kunnen zijn: emotioneel dicht bij je partner zonder jezelf kwijt te raken. Veel
                conflicten zijn in de kern een worsteling daartussen. Als dat evenwicht zich
                herstelt, ontstaat er weer ruimte tussen jullie.
              </p>
            </div>
          </div>
        </section>

        <LandingCTA
          title="Benieuwd of IBCT bij jullie past?"
          text="In een intakegesprek verkennen we samen jullie situatie en kijken we of IBCT aansluit bij wat jullie zoeken."
        />

        <LandingFAQ heading="Veelgestelde vragen over IBCT" items={faqs} />
      </main>
      <Footer />
    </>
  );
}
