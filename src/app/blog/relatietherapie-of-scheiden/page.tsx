import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "relatietherapie-of-scheiden";
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
      <h2>Een weloverwogen keuze maken</h2>
      <p>
        De vraag of je samen verder kunt of beter uit elkaar kunt gaan, is een van de meest ingrijpende keuzes die partners ooit moeten maken. Dit is geen vraag die je kunt beantwoorden met rationele lijstjes of adviezen van buitenaf, want ze raakt aan iets dat alleen jullie samen kunnen onderzoeken. Toch kunnen koppels, met de juiste begeleiding, stap voor stap meer helderheid krijgen over wat er werkelijk nodig is.
      </p>
      <p>
        In dit artikel leg ik uit hoe ik als IBCT-therapeut werk met koppels die op dit kruispunt staan, niet om hen een richting op te duwen, maar om samen ruimte te maken voor een weloverwogen keuze.
      </p>

      <h2>Waarom deze vraag zo complex voelt</h2>
      <p>
        De vraag of je samen verder kunt of beter uit elkaar kunt gaan, bestaat in werkelijkheid uit een hele reeks onderliggende vragen. Houd ik nog van mijn partner? Kan er iets veranderen? Wat betekent dit voor de kinderen? En is vertrouwen nog te herstellen? In een relatiecrisis zijn die vragen met elkaar verstrengeld geraakt, waardoor elke beslissing onzeker en moeilijk te dragen blijft. Relatietherapie helpt niet om snel te beslissen, maar om die vragen één voor één helder te krijgen.
      </p>

      <h2>Wat relatietherapie wel en niet doet</h2>
      <p>
        Relatietherapie biedt ruimte om samen te onderzoeken wat er onder de oppervlakte gebeurt en wat jullie nodig hebben om verder te kunnen, samen of apart. Het is geen manier om de ander te veranderen en ook geen plek om gelijk te halen. Wat het wel doet, is patronen zichtbaar maken en begrijpelijk maken waarom jullie op elkaar reageren zoals jullie doen. Juist door die patronen te herkennen, ontstaat ruimte voor een andere manier van omgaan met elkaar.
      </p>

      <h2>Waarom verandering tijd kost</h2>
      <p>
        Veel koppels starten therapie met de begrijpelijke wens dat er snel duidelijkheid komt. Maar verandering vraagt tijd, omdat patronen zich over jaren vormen. Het kost tijd om te voelen wat er werkelijk speelt, om oude reacties los te laten en om nieuwe manieren van omgaan met elkaar te oefenen. Dat proces is niet te forceren. Het vraagt om vertraging, aandacht en eerlijke zelfreflectie, zowel individueel als samen.
      </p>

      <h2>Wanneer partners verschillend gemotiveerd zijn</h2>
      <p>
        Een van de meest voorkomende situaties in mijn praktijk is dat de ene partner graag verder wil, terwijl de andere aarzelt of zich innerlijk al heeft teruggetrokken. Is therapie dan nog zinvol? Ja, mits de aarzelende partner bereid is die aarzeling eerlijk in te brengen. Ik zie regelmatig dat twijfelende partners na enkele sessies meer beweging voelen dan verwacht. Soms kristalliseert de aarzeling juist uit tot een heldere keuze om de relatie los te laten. Beide uitkomsten zijn waardevol, omdat ze voortkomen uit echte bewustwording en niet uit vermijding.
      </p>

      <h2>Wat je kunt verwachten in therapie</h2>
      <p>
        Relatietherapie biedt geen snelle oplossingen, maar wel verbinding en begrip. Je krijgt zicht op wat er tussen jullie gebeurt, waarom jullie vastlopen en wat er nodig is om weer dichter bij elkaar te komen. Daarnaast ga je beter voelen wat je eigen reacties zeggen over jou, en wat de reacties van je partner werkelijk betekenen. Je leert elkaar opnieuw zien, zonder de laag van oude pijn die ertussen is gaan staan. Soms brengt het proces aan het licht dat jullie wegen zich scheiden, en ontstaat er meer begrip, zachtheid en respect in hoe jullie daarmee omgaan.
      </p>

      <h2>Wat je van mij kunt verwachten als therapeut</h2>
      <p>
        Ik bied een veilige en oordeelvrije ruimte waar jullie jezelf kunnen zijn. Mijn begeleiding is duidelijk en gericht op het doorbreken van oude patronen, waarbij ik een betrokken houding aanneem zonder partij te kiezen. Waar nodig geef ik helderheid over wat ik observeer, op een zorgvuldige manier. Concreet betekent dat:
      </p>
      <ul>
        <li>Inzicht in jullie dynamiek, zodat begrijpelijk wordt wat er tussen jullie gebeurt en waarom dat zo voelt.</li>
        <li>Transparantie over mijn werkwijze en over wat jullie kunnen verwachten.</li>
        <li>Een traject dat is afgestemd op jullie tempo en behoeften.</li>
        <li>Aandacht voor zowel jullie onderlinge verbinding als jullie individuele ontwikkeling.</li>
      </ul>

      <h2>Een eerste stap zetten</h2>
      <p>
        De zwaarste stap is vaak de eerste. Een intakegesprek vindt plaats bij jullie thuis, zodat we in een vertrouwde omgeving kunnen verkennen waar jullie staan en of relatietherapie passend is. Jullie bepalen zelf wat daarna volgt.
      </p>
      <p>
        Stuur een bericht via het <Link href="/#contact">contactformulier</Link> of maak direct een afspraak in de <Link href="/#contact">agenda</Link>. Ik reageer binnen vierentwintig uur.
      </p>
    </BlogLayout>
  );
}
