import type { Metadata } from "next";
import Link from "next/link";
import { Baby, Moon, Users, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "relatietherapie-jonge-ouders";
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
    q: "Is het normaal dat onze relatie zo veranderd is sinds ons kind er is?",
    a: "Ja. Onderzoek laat zien dat de meeste koppels in het eerste jaar na een kind een duidelijke terugval in relatiekwaliteit ervaren. Dat zegt niets over jullie als koppel. Het zegt iets over hoeveel er tegelijk verandert: slaap, tijd, rollen, aandacht, lichaam, geld.",
  },
  {
    q: "We hebben gewoon geen tijd voor therapie, kan dat wel?",
    a: "Daarom kom ik bij jullie thuis, ook 's avonds. Veel jonge ouders kiezen voor sessies om 20:00 of 20:30, zodra de kleine slaapt. Geen oppas, geen reistijd. Eén sessie per twee weken is goed haalbaar, ook als jullie leven al vol zit.",
  },
  {
    q: "Mag ons kind er bij zijn als het nog heel klein is?",
    a: "Een baby die slaapt of in de wipstoel ligt kan prima. Voor peuters en oudere kinderen adviseer ik een moment dat zij slapen of bij oma zijn, zodat jullie met volle aandacht kunnen werken. In het intakegesprek kijken we wat voor jullie realistisch is.",
  },
  {
    q: "Wij ruziën veel meer sinds de baby. Betekent dat dat er iets mis is?",
    a: "Niet per se. Als het draagvermogen van allebei de partners dichtknijpt door slaapgebrek, wordt bijna alles een trigger. Dat is geen karakterfout, dat is hoe jullie stresssysteem werkt onder druk. We kijken hoe jullie dat samen weer kunnen verruimen.",
  },
  {
    q: "Kan ik ook alleen komen als mijn partner nog niet klaar is voor therapie?",
    a: "IBCT is een koppeltherapie, dus we werken met jullie samen. Maar als je partner nog twijfelt, kan een eerste intakegesprek met één van jullie soms al helpen om die drempel lager te maken. Neem gerust contact op om te overleggen.",
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
              Een kind verandert alles, ook jullie samen
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Veel jonge ouders ervaren dat hun relatie onder druk komt te staan na de komst
                van een kind. De dagen zijn voller, de nachten korter en de aandacht verschuift
                bijna vanzelf naar jullie baby. Daardoor kan de afstand tussen jullie groeien,
                soms sneller dan je doorhebt. Het is heel normaal dat dit gebeurt en het is ook
                iets waar je samen weer uit kunt komen.
              </p>
              <p>
                En dat geldt niet alleen bij een eerste kind. Ook bij een tweede of derde kindje
                kan de balans opnieuw verschuiven, waardoor jullie relatie extra aandacht nodig
                heeft.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Wat ik vaak hoor bij jonge ouders
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Deze thema&apos;s komen in vrijwel elke relatie na een kind ergens langs. De
                ernst verschilt, maar het patroon is herkenbaar.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Kort lontje door slaaptekort",
                  text: "Wat jullie vroeger met een glimlach konden wegwuiven, wordt nu een irritatie. Dat ligt niet aan jullie karakter. Bij slaaptekort krimpt jullie draagvermogen, waardoor zelfs kleine dingen als trigger gaan werken.",
                },
                {
                  title: "Ongelijke verdeling die schuurt",
                  text: "De een heeft het gevoel altijd de mentale last te dragen, de ander voelt zich onzichtbaar in wat hij of zij juist wel doet. Niemand voelt zich gezien, en dat stapelt zich op.",
                },
                {
                  title: "Minder intimiteit, meer afstand",
                  text: "Fysiek en emotioneel gaan vaak samen. Als het lichaam uitgeput is en de dagen vol, verdwijnt seksualiteit soms naar de achtergrond. Daar praten is lastig, dus gebeurt het vaak niet, en de afstand groeit.",
                },
                {
                  title: "De een wil praten, de ander wil rust",
                  text: "Het vraag-en-terugtrek-patroon wordt scherper als jullie moe zijn. De een zoekt verbinding via gesprek, de ander juist via even alleen zijn. Beide zijn begrijpelijk, beide voelen als afwijzing voor de ander.",
                },
                {
                  title: "Jezelf verliezen in het ouderschap",
                  text: "Veel jonge ouders worstelen met de balans: dicht genoeg bij je partner en kind blijven zonder jezelf kwijt te raken. Dat is een stille strijd die zich vaak vertaalt in prikkelbaarheid of apathie.",
                },
                {
                  title: "Onderwerpen die jullie vermijden",
                  text: "Sommige gesprekken worden uitgesteld omdat er nooit een goed moment lijkt. Geld, seks, familieverplichtingen. Die vermijding voelt praktisch, maar zorgt dat spanning langzaam oploopt.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 md:p-7 card-hover">
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Functioneren als ouders, minder als partners
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Misschien merken jullie dat kleine dingen sneller tot irritatie leiden, of dat
                jullie vooral functioneren als ouders en minder als partners. De liefde is er,
                maar de vanzelfsprekendheid niet meer. Dat kan je onzeker maken over waar jullie
                samen staan.
              </p>
              <p>
                In zo&apos;n periode kan relatietherapie steun bieden. Niet omdat er iets
                verkeerd gaat, maar omdat jullie in een intensieve levensfase zitten waarin
                verbinding soms onder druk komt te staan. Met een beetje begeleiding ontstaat
                er weer ruimte om elkaar echt te zien.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Hoe IBCT jullie helpt
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Ik werk met Integrative Behavioral Couple Therapy (IBCT). Deze methode helpt
                jullie om te begrijpen waarom jullie reageren zoals jullie reageren, en hoe je
                samen uit terugkerende momenten van frictie kunt stappen. Het brengt rust,
                begrip en meer ruimte voor echte verbinding.
              </p>
              <p>
                Tijdens de sessies is er ruimte voor jullie verhaal, jullie emoties en alles
                wat er tussen jullie speelt. We onderzoeken wat er onder de oppervlakte
                gebeurt, waar het stroef loopt en wat jullie helpt om weer dichter bij elkaar
                te komen.
              </p>
              <p>
                Meer lezen over de methode? Zie{" "}
                <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Praktisch voor jonge ouders
              </h2>
              <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-4 text-left">
                <p>
                  Ik kom bij jullie thuis, zodat jullie in jullie eigen vertrouwde omgeving
                  kunnen werken aan wat er speelt. Dat maakt de sessies laagdrempelig en past
                  bij hoe het dagelijks leven er nu uitziet met een kleintje.
                </p>
                <p>
                  Een sessie duurt 90 minuten. Voor sommige stellen werkt een langer traject
                  prettig, voor anderen is een kort en gericht traject juist passend. Daarom
                  bied ik naast de reguliere sessies ook een relatie-APK aan: drie sessies van
                  75 minuten waarin we samen scherp krijgen wat er speelt en wat jullie helpt
                  om weer vooruit te kunnen.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {[
                {
                  icon: Baby,
                  title: "Aan huis, dus geen oppas",
                  text: "Ik kom bij jullie thuis. Als de kleine slaapt of rustig ligt, kunnen jullie gewoon beginnen.",
                },
                {
                  icon: Moon,
                  title: "Avondsessies",
                  text: "Veel koppels kiezen voor 20:00 of 20:30. Na de avondroutine, als het in huis rustig is.",
                },
                {
                  icon: Users,
                  title: "Voor elke fase",
                  text: "Of jullie net een baby hebben, een peuter, of meerdere kinderen, de thema's verschillen maar het werk past zich aan.",
                },
                {
                  icon: Heart,
                  title: "Op jullie tempo",
                  text: "Na een intakegesprek beslissen jullie zelf of een traject passend is. Zonder druk, op een moment dat past.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#F5F0EB] rounded-2xl p-6 md:p-7 flex gap-4">
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

        <LandingCTA
          title="Aansluiten bij wat jullie zoeken?"
          text="Benieuwd of relatietherapie aansluit bij wat jullie zoeken? Neem gerust contact op voor een kennismaking. Dan bespreken we wat ik voor jullie kan betekenen."
        />

        <LandingFAQ
          heading="Veelgestelde vragen van jonge ouders"
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
