import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Clock,
  Calendar,
  Heart,
  Users,
  HeartCrack,
  MessageCircle,
  Compass,
  HelpCircle,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "relatietherapie-aan-huis";
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
    q: "In welke plaatsen kom je aan huis?",
    a: "Ik werk in Tilburg en omliggende plaatsen: de Reeshof, Berkel-Enschot, Enschot, Udenhout, Oisterwijk, Goirle, Dongen, Loon op Zand en nabije dorpen. Voor locaties iets verder weg kunnen we overleggen.",
  },
  {
    q: "Wat heb ik van jullie nodig voor een sessie?",
    a: "Een rustige plek waar we ongestoord kunnen zitten. Als oppas regelen lastig is of een kindje doorslaapt, stemmen we per sessie af wat haalbaar is.",
  },
  {
    q: "Wat kost relatietherapie aan huis?",
    a: "De prijs voor een 90-minuten sessie is € 150. Reiskosten binnen het reguliere werkgebied zijn inbegrepen.",
  },
  {
    q: "Werkt therapie wel aan huis?",
    a: "Therapie aan huis is net zo effectief als in een praktijk wanneer de therapeut en methode goed aansluiten. Thuis ervaren veel stellen meer rust, maar we letten er wel op dat de sessie ongestoord kan plaatsvinden.",
  },
  {
    q: "Hoe zit het met privacy?",
    a: "Jullie privacy is gewaarborgd; gesprekken blijven vertrouwelijk en vallen onder beroepsgeheim. Er wordt niets gedeeld dat naar jullie herleidbaar is.",
  },
  {
    q: "Kan relatietherapie aan huis ook 's avonds en in de weekenden?",
    a: "Ja, ik plan regelmatig avonden en weekenddagen in zodat therapie goed te combineren is met werk en gezin.",
  },
];

const voordelen = [
  {
    icon: Home,
    title: "Vertrouwde setting",
    text: "Praten op de plek die jullie kennen en waar de relatie zich afspeelt.",
  },
  {
    icon: Clock,
    title: "Flexibele tijden",
    text: "Avond- en weekendafspraken zijn mogelijk.",
  },
  {
    icon: Calendar,
    title: "Minder regelwerk",
    text: "Ik kom naar jullie toe, plannen wordt eenvoudiger.",
  },
  {
    icon: Heart,
    title: "Toegankelijk beginnen",
    text: "Thuis starten voelt voor veel koppels laagdrempeliger.",
  },
  {
    icon: Users,
    title: "Breed inzetbaar",
    text: "Geschikt als huwelijkstherapie, koppeltherapie of relatiecoaching.",
  },
];

const voorWie = [
  {
    icon: HeartCrack,
    title: "Herstel na ontrouw",
    text: "Begeleiding bij het verwerken van ontrouw en het vinden van een weg verder, samen of apart.",
  },
  {
    icon: Compass,
    title: "Uit elkaar groeien",
    text: "Inzicht in waarom jullie uit elkaar groeien en concrete stappen om weer verbinding te maken.",
  },
  {
    icon: MessageCircle,
    title: "Communicatieproblemen",
    text: "Technieken om ruzies te stoppen en gesprekken weer veilig te voeren.",
  },
  {
    icon: Heart,
    title: "Intimiteit en nabijheid",
    text: "Werken aan verlangen en emotionele nabijheid.",
  },
  {
    icon: HelpCircle,
    title: "Twijfels over de relatie",
    text: "Helderheid over wat jullie willen en welke opties er zijn.",
  },
  {
    icon: Shield,
    title: "Bindingsangst of terughoudendheid",
    text: "Inzicht en handvatten bij afstand of terugtrekking.",
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
              Waarom ik bij jullie thuis werk
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Thuis zie je de patronen die jullie dagelijks beïnvloeden. Ik vind het waardevol
                om die context mee te nemen in de therapie: hoe gesprekken verlopen na een
                drukke dag, welke kleine gewoontes spanning geven en waar afstand of irritatie
                zichtbaar wordt.
              </p>
              <p>
                In jullie eigen omgeving ontstaat vaak sneller rust en openheid, waardoor we
                concreet kunnen oefenen met wat er in het echte leven gebeurt.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Wat therapie aan huis praktisch oplevert
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {voordelen.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 md:p-7 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#946B66]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Voor wie is therapie aan huis geschikt
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {voorWie.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#F5F0EB] rounded-2xl p-6 md:p-7 flex gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#946B66]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              De methode: IBCT
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                Ik werk met IBCT (Integrative Behavioral Couple Therapy). Deze
                evidence-based methode combineert acceptatie van wat moeilijk te veranderen is
                met gerichte verandering van wat wél bijgesteld kan worden. IBCT helpt koppels
                om zowel begrip als praktische vaardigheden te ontwikkelen, zodat veranderingen
                duurzaam worden.
              </p>
              <p>
                Meer lezen over de methode? Zie{" "}
                <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link> of het artikel{" "}
                <Link href="/blog/communicatieproblemen-in-een-relatie">wat is IBCT</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Werkgebied en praktische informatie
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Ik werk aan huis in Tilburg en directe omgeving. Voor adressen in de regio is
                een afspraak meestal mogelijk; stuur een bericht om te checken of jullie locatie
                binnen het werkgebied valt. Sessies zijn ook in de avond en in het weekend te
                plannen.
              </p>
            </div>
          </div>
        </section>

        <LandingCTA
          title="Plan een intakegesprek"
          text="In een intakegesprek bespreken we wat er speelt en welke aanpak bij jullie past."
        />

        <LandingFAQ
          heading="Veelgestelde vragen over relatietherapie aan huis"
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
