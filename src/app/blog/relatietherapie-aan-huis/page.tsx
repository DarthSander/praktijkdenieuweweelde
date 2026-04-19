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
        Stel je voor: het is een doordeweekse avond. Je hoeft niet in de auto, niet te zoeken naar een parkeerplek, niet langs een volle wachtkamer. Om acht uur 's avonds gaat de bel, je kind slaapt al, de theepot staat klaar, en samen met een therapeut zitten jullie aan jullie eigen keukentafel in gesprek over wat er schuurt. Dát is relatietherapie aan huis.
      </p>
      <p>
        Het is een werkvorm die in Nederland nog niet overal vanzelfsprekend is, maar die in mijn praktijk in Tilburg juist het grootste verschil maakt. In dit artikel leg ik uit waarom therapie aan huis unieke voordelen heeft, en wanneer het juist niet passend is.
      </p>

      <h2>1. De drempel is lager, en dat telt</h2>
      <p>
        De gemiddelde koppel wacht zes jaar met het zoeken van hulp. Een deel daarvan is twijfel, maar een ander deel is praktisch: een oppas regelen, vrij vragen op het werk, de partner mee krijgen. Bij therapie aan huis vallen die drempels weg. Het enige dat jullie hoeven te doen is de deur opendoen.
      </p>
      <p>
        Die eenvoud lijkt klein, maar blijkt groot. Veel koppels die zich bij mij melden, vertellen achteraf dat zij de stap naar een praktijkruimte eerder niet durfden of niet aankonden. Therapie aan huis is niet drempelloos, maar vaak is het net laagdrempelig genoeg om wel te starten.
      </p>

      <h2>2. Jullie zijn jullie meest eerlijke zelf thuis</h2>
      <p>
        In een praktijkruimte zitten koppels vaak iets rechter op de stoel. Het is een nieuwe omgeving, de eerste minuten gaan verloren aan gewenning. Thuis zie ik jullie zoals je werkelijk leeft. Het rommelige keukenblad, de foto's aan de muur, de hond die tegen mijn been aanloopt, de handdoek die halverwege op de trap ligt. Al die details vertellen iets.
      </p>
      <p>
        Voor mij als therapeut is dat waardevol. Ik zie niet alleen wát jullie vertellen, maar ook waarin jullie leven. Jullie hoeven niet te beschrijven hoe je samen wonen er uitziet, ik zie het. Dat versnelt het gesprek.
      </p>

      <h2>3. De oefeningen landen op de plek waar het leven is</h2>
      <p>
        In IBCT werken we veel met patronen en interacties. Het <em>demand-withdraw-patroon</em> speelt zich niet af in een spreekkamer, maar in de keuken, in de slaapkamer, op de bank. Als we thuis oefenen, doen we dat in de ruimte waar de patronen werkelijk plaatsvinden.
      </p>
      <p>
        Dat is méér dan praktisch. Gedragsverandering landt beter in de oorspronkelijke context. Onderzoek naar generalisatie (het overnemen van nieuw gedrag van de ene naar de andere omgeving) laat zien dat het leren van nieuw gedrag in de eigen omgeving het sterkst beklijft. Wat jullie op jullie eigen bank oefenen, zit er in op jullie eigen bank.
      </p>

      <h2>4. Praktische vrijheid: avonden, weekenden en jullie eigen tempo</h2>
      <p>
        Relatietherapie aan huis betekent ook meer flexibiliteit in tijd. Veel koppels waar ik mee werk, hebben drukke banen, jonge kinderen of mantelzorgtaken. Een sessie op woensdagavond om halfnegen, of op zaterdagochtend, is praktisch niet te doen in de meeste praktijkruimten. Aan huis is het wel mogelijk.
      </p>
      <p>
        Meer informatie over de <Link href="/#werkwijze">werkwijze en planning</Link> vind je op de homepage.
      </p>

      <h2>5. Jullie hebben de regie over de omgeving</h2>
      <p>
        In een spreekkamer ben je op een plek die iemand anders heeft ingericht. Thuis bepalen jullie waar we zitten. De bank, de eetkamer, de tuin in de zomer. Dit lijkt een detail, maar gevoel van regie is in therapie belangrijk. Jullie zijn geen patiënt in een kliniek, jullie zijn twee mensen die samen werken aan jullie relatie, bij jullie thuis.
      </p>
      <p>
        Sommige koppels kiezen bewust voor de keukentafel, anderen liever voor de bank. Een enkel koppel vertelt zelfs: we willen graag in de slaapkamer, want daar ligt onze grootste spanning. Dat kan. Het gebeurt maar zelden, en nooit zonder goede reden, maar de vrijheid bestaat.
      </p>

      <h2>6. De anonimiteit is groter</h2>
      <p>
        Tilburg is een stad met een sterk sociaal netwerk. Een wachtkamer in een praktijk kan onbedoeld confronterend zijn als je collega of buurvrouw op hetzelfde moment naar therapie gaat. Therapie aan huis haalt die zichtbaarheid weg. Niemand hoeft te weten dat jullie bezig zijn met relatietherapie, behalve jullie zelf.
      </p>
      <p>
        Voor veel mensen is dit een opluchting, juist in de beginfase waarin schaamte en twijfel meespelen.
      </p>

      <h2>7. Minder reistijd, meer energie</h2>
      <p>
        Een sessie relatietherapie vraagt energie. Na een zware werkdag nog een uur in de file staan om aan jezelf te werken, is niet voor iedereen haalbaar. Therapie aan huis schrapt minimaal een uur reistijd en geestelijke transitietijd per sessie. Die energie komt beschikbaar voor het gesprek zelf.
      </p>

      <h2>Wanneer is therapie aan huis juist níet passend?</h2>
      <p>
        Eerlijkheid hoort erbij: thuis werken past niet bij iedere situatie. Een paar voorbeelden waarin ik eerder adviseer om in een neutrale ruimte te werken:
      </p>
      <ul>
        <li><strong>Als één van de partners zich thuis niet veilig voelt.</strong> Bij signalen van intimidatie of controle is neutraal terrein noodzakelijk.</li>
        <li><strong>Als thuis vol is met kleine kinderen.</strong> Soms is afstand tot het gezinsleven juist wat jullie nodig hebben om vrijuit te praten.</li>
        <li><strong>Als de woonsituatie tijdelijk kwetsbaar is,</strong> bijvoorbeeld bij een verhuizing of als jullie al apart wonen.</li>
      </ul>
      <p>
        In die situaties bespreek ik graag wat wel haalbaar is, bijvoorbeeld een ruimte op een neutrale locatie of een combinatie van thuis en elders.
      </p>

      <h2>Is therapie aan huis wetenschappelijk verantwoord?</h2>
      <p>
        Een terechte vraag. IBCT is een evidence-based methode die overal werkt waar de context veilig is, met de behandelprotocollen van Christensen, Doss en Jacobson (2020) en de Nederlandstalige handleiding van Dijkstra en Tamminga (2025). De methode zelf is niet locatiegebonden. Wat telt is de therapeutische alliantie en trouw aan het protocol, en die zijn thuis minstens zo goed realiseerbaar als in een spreekkamer.
      </p>
      <p>
        De effectiviteit van IBCT is in meerdere RCT's aangetoond, met grote effect sizes (d = 0,90 in de Christensen-RCT uit 2004) en een bewezen langetermijneffect van vijf jaar (Christensen et al., 2010). Thuiswerken verzwakt die effecten niet, en in mijn ervaring versterkt het juist de toepasbaarheid in het dagelijks leven.
      </p>

      <h2>Werkgebied: Tilburg en omstreken</h2>
      <p>
        Ik werk aan huis in Tilburg en directe omgeving: Reeshof, het Centrum, Berkel-Enschot, Oud-Noord, de Hasselt en omliggende wijken. Voor koppels iets verderop (Dongen, Udenhout, Goirle, Loon op Zand) kan het meestal ook. Stuur gerust een bericht als je wilt weten of jullie locatie valt binnen het werkgebied.
      </p>

      <h2>Een kennismaking begint met een bericht</h2>
      <p>
        Nieuwsgierig geworden? Een kennismakingsgesprek is vrijblijvend en gratis, en vindt (uiteraard) plaats bij jullie thuis. Tijdens dit eerste gesprek verkennen we samen waar jullie tegenaan lopen, of <Link href="/blog/wat-is-ibct">IBCT</Link> passend is, en welke volgende stappen zinvol zijn.
      </p>
      <p>
        Stuur een bericht via het <Link href="/#contact">contactformulier</Link> en ik neem binnen vierentwintig uur contact op.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>Christensen, A., Atkins, D. C., Baucom, B., &amp; Yi, J. (2010). Marital status and satisfaction five years following a randomized clinical trial comparing traditional versus integrative behavioral couple therapy. <em>Journal of Consulting and Clinical Psychology, 78</em>(2), 225-235.</li>
          <li>Christensen, A., Doss, B. D., &amp; Jacobson, N. S. (2020). <em>Integrative Behavioral Couple Therapy: A Therapist&apos;s Guide to Creating Acceptance and Change</em> (2nd ed.). New York: W. W. Norton.</li>
          <li>Dijkstra, P., &amp; Tamminga, A. (2025). <em>IBCT-relatietherapie</em> (herziene uitgave). Amsterdam: Boom.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
