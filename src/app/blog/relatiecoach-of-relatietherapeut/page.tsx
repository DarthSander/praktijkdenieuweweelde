import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";
import type { FAQItem } from "@/lib/faq-schema";

const slug = "relatiecoach-of-relatietherapeut";
const post = getPostBySlug(slug)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: {
    canonical: `https://www.praktijkdenieuweweelde.nl/blog/${slug}`,
  },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `https://www.praktijkdenieuweweelde.nl/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    images: [{ url: post.image, alt: post.imageAlt }],
  },
};

// Antwoorden zijn samengevat uit de tekst hieronder; niets nieuws toegevoegd.
const faqs: FAQItem[] = [
  {
    q: "Wat is het verschil tussen een relatiecoach en een relatietherapeut?",
    a: "In Nederland ligt het verschil niet vast, omdat geen van beide titels wettelijk beschermd is. In de praktijk is wel een tendens zichtbaar: coaching richt zich doorgaans op het heden en op concrete doelen en vaardigheden, terwijl therapie daarnaast kijkt naar hoe een patroon is ontstaan en welke gevoeligheden eronder liggen. Dat is een tendens en geen scheidslijn, want de aanduiding voorspelt de werkwijze niet.",
  },
  {
    q: "Is de titel relatietherapeut beschermd in Nederland?",
    a: "Nee. Noch relatietherapeut noch relatiecoach is een wettelijk beschermde titel. Wettelijke bescherming loopt via de Wet BIG en geldt voor titels als psychotherapeut en gezondheidszorgpsycholoog. Het losse woord psycholoog is evenmin beschermd. Dit zegt niets over de kwaliteit van een individuele begeleider, wel dat de titel op zichzelf weinig informatie geeft.",
  },
  {
    q: "Waar let je op bij het kiezen van een relatietherapeut of relatiecoach?",
    a: "Nuttiger dan de titel zijn vijf vragen die je aan iedere begeleider kunt stellen: welke opleiding is gevolgd en waar die op gericht was, met welke methode wordt gewerkt, of die methode is onderzocht, in welk register de begeleider staat, en hoe de intervisie of supervisie is geregeld.",
  },
  {
    q: "Wanneer kies je coaching en wanneer relatietherapie?",
    a: "Coaching kan passend zijn bij een afgebakende vraag in een relatie die in de kern stabiel is, bijvoorbeeld beter leren overleggen of opnieuw tijd voor elkaar inruimen. Therapie ligt meer voor de hand wanneer hetzelfde gesprek zich blijft herhalen, wanneer er ontrouw of een andere vertrouwensbreuk speelt, wanneer een van beiden aan uit elkaar gaan denkt, of wanneer er klachten als somberheid of spanning meespelen.",
  },
];

export default function Page() {
  const related = getRelatedPosts(slug);
  return (
    <BlogLayout post={post} related={related} faqs={faqs}>
      <p>
        Wie hulp zoekt bij zijn relatie komt al snel beide titels tegen. De een noemt zich
        relatiecoach, de ander relatietherapeut, en op het eerste gezicht bieden ze iets
        vergelijkbaars aan. De vraag welke van de twee past is dan ook begrijpelijk, zeker omdat
        het gaat om iets kwetsbaars en om een investering in tijd, geld en vertrouwen.
      </p>
      <p>
        Het eerlijke antwoord is dat de grens tussen beide minder scherp is dan veel mensen
        verwachten. Dat klinkt onbevredigend, maar zodra helder is waar het onderscheid niet in
        zit, wordt ook zichtbaar waar je wel op kunt letten.
      </p>

      <h2>In Nederland zijn beide titels niet beschermd</h2>
      <p>
        Noch <em>relatietherapeut</em> noch <em>relatiecoach</em> is in Nederland een wettelijk
        beschermde titel. Iedereen mag zich zo noemen, ongeacht opleiding, ervaring of
        achtergrond.
      </p>
      <p>
        Wettelijke titelbescherming loopt in Nederland via de Wet op de beroepen in de
        individuele gezondheidszorg, kortweg de Wet BIG. Aanduidingen als psychotherapeut en
        gezondheidszorgpsycholoog vallen daar wel onder: wie zich zo noemt zonder inschrijving in
        het BIG-register, is in overtreding. Het losse woord psycholoog is overigens weer niet
        beschermd.
      </p>
      <p>
        Dit zegt op zichzelf niets over de kwaliteit van een individuele begeleider. Er zijn
        relatiecoaches met een gedegen opleiding en jarenlange ervaring, en er zijn mensen die
        zich therapeut noemen na een korte cursus. Wat het wel zegt, is dat de titel als zodanig
        weinig informatie geeft. Wie een keuze wil maken, kijkt dus verder dan de titel die
        iemand voor zijn werk gebruikt.
      </p>

      <h2>Waar het onderscheid in de praktijk vaak op neerkomt</h2>
      <p>
        Hoewel de titels niets vastleggen, is er in de praktijk wel een tendens zichtbaar.
      </p>
      <p>
        Coaching richt zich doorgaans op het heden en op wat er hierna komt. Het vertrekpunt is
        meestal een concrete vraag: beter leren overleggen, afspraken maken over de taakverdeling,
        opnieuw tijd voor elkaar inruimen. Er wordt gewerkt met doelen, oefeningen en
        vaardigheden, en zulke trajecten zijn vaak kort en overzichtelijk van opzet.
      </p>
      <p>
        Therapie kijkt daar doorgaans omheen. Naast de vraag van vandaag komt aan bod hoe een
        patroon is ontstaan, welke gevoeligheden eronder liggen en wat er uit de geschiedenis van
        allebei in meespeelt. Dat betekent niet dat therapie vooral over vroeger gaat. Het
        betekent dat er ruimte is voor emotionele processen die zich niet met een oefening laten
        oplossen. Meer over hoe zulke patronen ontstaan lezen jullie in{" "}
        <Link href="/blog/steeds-dezelfde-ruzie-in-je-relatie">
          Steeds dezelfde ruzie in je relatie?
        </Link>
      </p>
      <p>
        Belangrijk daarbij: dit is een tendens en geen scheidslijn. Er zijn coaches die
        diepgaand met patronen werken en therapeuten die vooral praktisch te werk gaan. De
        aanduiding voorspelt de werkwijze niet, en het is dus ook niet zo dat de ene vorm meer
        waard is dan de andere. Ze passen bij verschillende vragen.
      </p>

      <h2>Waar je wel iets aan hebt</h2>
      <p>
        Nuttiger dan de titel zijn een paar vragen die je aan iedere begeleider kunt stellen, of
        die zich nu coach of therapeut noemt. Een zorgvuldige begeleider vindt zulke vragen niet
        vervelend, maar juist terecht.
      </p>
      <ul>
        <li>
          <strong>Welke opleiding is gevolgd?</strong> Interessanter dan de duur is waar de
          opleiding op gericht was. Werken met twee mensen tegelijk vraagt iets anders dan
          begeleiding van één persoon, en een opleiding die specifiek over relaties gaat,
          bereidt daar gerichter op voor dan een algemene.
        </li>
        <li>
          <strong>Met welke methode wordt gewerkt?</strong> Relatiebegeleiding is geen vaste
          werkwijze maar een verzamelnaam. Een begeleider die kan benoemen volgens welke methode
          hij of zij werkt, heeft daar bewust over nagedacht.
        </li>
        <li>
          <strong>Is die methode onderzocht?</strong> Van sommige vormen van relatietherapie is
          in wetenschappelijk onderzoek nagegaan of ze werken en hoe lang het effect aanhoudt.
          Van andere benaderingen is dat niet bekend. Dat maakt ze niet automatisch ongeschikt,
          maar het is wel iets om te weten.
        </li>
        <li>
          <strong>In welk register staat de begeleider?</strong> Omdat de wet hier weinig
          regelt, hebben beroepsverenigingen eigen registers opgezet, met eisen aan opleiding,
          bijscholing en klachtafhandeling. De vraag welk register dat is, en wat het van leden
          verlangt, levert meestal een helder antwoord op.
        </li>
        <li>
          <strong>Hoe is de intervisie of supervisie geregeld?</strong> Wie met koppels werkt,
          heeft af en toe een blik van buiten nodig op het eigen werk. Geregelde intervisie is
          een teken dat iemand het vak serieus neemt.
        </li>
      </ul>

      <h2>Wanneer coaching passend kan zijn</h2>
      <p>
        Coaching kan een goede keuze zijn wanneer de relatie in de kern stabiel is en de vraag
        afgebakend. Denk aan een stel dat merkt dat overleggen over de dagelijkse gang van zaken
        stroef verloopt, of dat na de geboorte van een kind opnieuw wil ontdekken hoe het samen
        tijd inruimt. Ook als onderhoud, zonder dat er iets ernstigs speelt, kan een korte reeks
        gesprekken veel opleveren.
      </p>
      <p>
        In zulke gevallen is uitgebreid onderzoek naar patronen en geschiedenis niet altijd
        nodig. Een praktische aanpak met heldere afspraken werkt dan vaak sneller en prettiger.
      </p>

      <h2>Wanneer therapie meer voor de hand ligt</h2>
      <p>
        Therapie ligt meer voor de hand zodra oefeningen en goede voornemens niet meer
        aanslaan. Bijvoorbeeld wanneer hetzelfde gesprek zich blijft herhalen hoe goed jullie ook
        je best doen, wanneer er ontrouw of een andere vertrouwensbreuk speelt, wanneer een van
        jullie regelmatig aan uit elkaar gaan denkt, of wanneer klachten als somberheid,
        spanning of slaapproblemen meespelen.
      </p>
      <p>
        Wat dan meestal nodig is, is niet nog een techniek, maar zicht op de wisselwerking die
        het patroon in stand houdt. Twijfelen jullie of dit voor jullie geldt? In{" "}
        <Link href="/blog/wanneer-is-relatietherapie-zinvol">
          Wanneer is relatietherapie zinvol?
        </Link>{" "}
        staan zeven concrete signalen. En wie zich afvraagt hoeveel gesprekken daar ongeveer bij
        horen, vindt daarover een realistisch beeld in{" "}
        <Link href="/blog/hoe-lang-duurt-relatietherapie">
          Hoe lang duurt relatietherapie?
        </Link>
      </p>

      <h2>Wanneer allebei niet volstaan</h2>
      <p>
        Er zijn situaties waarin noch coaching noch relatietherapie de aangewezen hulp is. Bij
        structureel geweld, bij ernstige verslavingsproblematiek en bij acute psychische
        problematiek is gespecialiseerde, veelal BIG-geregistreerde zorg nodig. Een zorgvuldige
        begeleider zal dat benoemen in plaats van er omheen te werken, en met jullie meedenken
        over waar jullie dan wel terechtkunnen.
      </p>

      <h2>Hoe ik werk</h2>
      <p>
        Voor de volledigheid, zodat jullie mijn eigen positie in dit verhaal kunnen wegen. Ik
        werk volgens IBCT, voluit Integrative Behavioral Couple Therapy, een van de best
        onderzochte vormen van relatietherapie. Wat die methode inhoudt staat beschreven op de
        pagina over <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link>, en hoe een
        traject bij jullie thuis verloopt lezen jullie op de pagina over{" "}
        <Link href="/relatietherapie-tilburg">relatietherapie in Tilburg</Link>.
      </p>
      <p>
        Mijn opleiding volgde ik bij dr. Pieternel Dijkstra en drs. Aerjen Tamminga via Relatie
        Guide; die opleiding is geaccrediteerd door de Nederlandse Vereniging voor Relatie- en
        Gezinstherapie. De praktijk is opgenomen in het register{" "}
        <a
          href="https://relatieguide.nl/de-competente-relatietherapeut/"
          target="_blank"
          rel="noopener noreferrer"
        >
          De competente relatietherapeut
        </a>
        .
      </p>
      <p>
        Twijfelen jullie welke vorm van begeleiding past? Leg die vraag gerust voor tijdens een
        kennismakingsgesprek via het <Link href="/#contact">contactformulier</Link>. Als
        relatietherapie niet het passende antwoord is, zeg ik dat ook.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>
            Roddy, M. K., Nowlan, K. M., Doss, B. D., &amp; Christensen, A. (2016). Integrative
            behavioral couple therapy: Theoretical background, empirical research, and dissemination.{" "}
            <em>Family Process, 55</em>(3), 408&ndash;422.
          </li>
          <li>
            Wet op de beroepen in de individuele gezondheidszorg (Wet BIG). Overzicht van
            beschermde beroepstitels en het BIG-register. https://www.bigregister.nl
          </li>
        </ul>
      </div>
    </BlogLayout>
  );
}
