import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "relatietherapie-aan-huis";
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

export default function Page() {
  const related = getRelatedPosts(slug);
  return (
    <BlogLayout post={post} related={related}>
      <p>
        Voor veel koppels is het lastig om tijd, ruimte en energie te vinden om aan hun relatie te werken. Relatietherapie aan huis kan dan praktische voordelen bieden: je hoeft nergens heen, je zit in je eigen omgeving, en het gesprek vindt plaats op de plek waar jullie dagelijks leven zich afspeelt. In mijn praktijk kies ik bewust voor deze werkvorm, omdat het de drempel verlaagt en gesprekken vaak natuurlijker verlopen. In dit artikel lees je welke voordelen therapie aan huis heeft en wanneer het juist niet passend is.
      </p>

      <h2>1. De drempel is lager</h2>
      <p>
        Onderzoek laat zien dat koppels gemiddeld zo&apos;n tweeënhalf tot drie jaar wachten voordat ze hulp zoeken. Een deel daarvan is twijfel, maar een groot deel is praktisch: oppas, reistijd, werk. Aan huis vallen die drempels weg. Het enige dat jullie hoeven te doen is de deur opendoen.
      </p>

      <h2>2. Jullie zijn meer jezelf in een vertrouwde omgeving</h2>
      <p>
        Thuis voelen mensen zich vaak meer op hun gemak dan in een praktijkruimte. Dat maakt het gesprek natuurlijker. Voor mij als therapeut is het waardevol om niet alleen te horen wat jullie vertellen, maar ook iets mee te krijgen van de context waarin jullie dagelijks met elkaar omgaan. Zonder daar een oordeel over te hebben.
      </p>

      <h2>3. De oefeningen landen op de plek waar het leven is</h2>
      <p>
        In IBCT werken we met patronen die zich meestal niet in een spreekkamer afspelen, maar in de dagelijkse ruimtes van jullie huis. Thuis oefenen betekent oefenen in de omgeving waar het er echt toe doet. Dat helpt om nieuw gedrag beter vast te houden en toe te passen op de momenten die ertoe doen.
      </p>

      <h2>4. Flexibiliteit in tijd</h2>
      <p>
        Aan huis werken maakt avond- en ochtendsessies mogelijk. Voor koppels met drukke banen, jonge kinderen of mantelzorgtaken kan dat het verschil maken tussen wel of niet starten.
      </p>

      <h2>5. Jullie bepalen de setting</h2>
      <p>
        Thuis kiezen jullie zelf waar we zitten: de bank, de eettafel, de tuin. Dat gevoel van regie helpt om het gesprek gelijkwaardiger te maken. Jullie zijn geen patiënt in een kliniek, maar twee mensen die samen werken aan hun relatie.
      </p>

      <h2>6. Meer privacy</h2>
      <p>
        In een stad als Tilburg kom je elkaar snel tegen. Therapie aan huis voorkomt dat je iemand in een wachtkamer tegenkomt. Voor veel koppels geeft dat rust, vooral in de beginfase.
      </p>

      <h2>7. Minder reistijd, meer ruimte voor het gesprek</h2>
      <p>
        Een sessie vraagt energie. Aan huis vervalt reistijd en de mentale omschakeling die daarbij hoort. Die ruimte komt beschikbaar voor het gesprek zelf.
      </p>

      <h2>Wanneer is therapie aan huis niet passend?</h2>
      <p>
        Soms is een neutrale ruimte beter, bijvoorbeeld:
      </p>
      <ul>
        <li>als een van de partners zich thuis niet veilig voelt;</li>
        <li>als er veel jonge kinderen aanwezig zijn;</li>
        <li>als de woonsituatie tijdelijk instabiel is.</li>
      </ul>
      <p>
        In zulke gevallen zoeken we samen naar een passende oplossing.
      </p>

      <h2>Is therapie aan huis verantwoord?</h2>
      <p>
        IBCT is een evidence-based vorm van relatietherapie die niet locatiegebonden is. Wat telt is een veilige context, een goede werkrelatie tussen jullie en mij, en trouw aan het behandelmodel. Die voorwaarden zijn thuis net zo goed realiseerbaar als in een spreekkamer, zolang de thuissituatie veilig genoeg is.
      </p>
      <p>
        Thuiswerken verandert niets aan de inhoud van de behandeling; het verandert vooral de setting. In mijn ervaring maakt dat het juist makkelijker om wat je leert direct te verbinden met jullie dagelijks leven.
      </p>

      <h2>Werkgebied: Tilburg en omstreken</h2>
      <p>
        Ik werk aan huis in Tilburg en directe omgeving. Voor locaties iets verderop (zoals Dongen, Udenhout, Goirle of Loon op Zand) is het meestal ook mogelijk. Stuur gerust een bericht om te checken of jullie adres binnen het werkgebied valt.
      </p>

      <h2>Een intakegesprek begint met een bericht</h2>
      <p>
        Een intakegesprek vindt plaats bij jullie thuis. Tijdens dit gesprek verkennen we waar jullie tegenaan lopen, of <Link href="/blog/wat-is-ibct">IBCT</Link> passend is, en welke stappen zinvol zijn.
      </p>
      <p>
        Stuur een bericht via het <Link href="/#contact">contactformulier</Link> en ik neem binnen vierentwintig uur contact op.
      </p>
    </BlogLayout>
  );
}
