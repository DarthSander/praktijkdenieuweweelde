import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "hoe-lang-duurt-relatietherapie";
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
        IBCT werkt met een kerntraject van tien sessies. Dat is het aantal dat in onderzoek en praktijk het meest effectief blijkt. Afhankelijk van jullie dynamiek, geschiedenis en hulpvraag kan het traject korter of langer zijn. Het is dan ook logisch dat veel koppels in het eerste gesprek willen weten hoe lang relatietherapie in hun situatie zal duren. Een exact aantal valt vooraf niet te geven, maar op basis van wetenschappelijk onderzoek én mijn ervaring kan ik wel een realistisch beeld schetsen van wat jullie mogen verwachten. Voor sommige koppels zijn acht sessies voldoende, terwijl anderen richting de vijftien tot twintig sessies gaan, bijvoorbeeld wanneer er langdurige conflicten, terugkerende patronen of bijkomende stressoren spelen. Dat sluit aan bij zowel het Nederlandstalige protocol van Dijkstra en Tamminga (2025) als bij internationaal onderzoek, waaruit blijkt dat de meeste koppels tussen de tien en vijftien sessies nodig hebben, met uitschieters wanneer de problematiek complexer is.
      </p>

      <h2>Factoren die de duur van een IBCT-traject beïnvloeden</h2>
      <p>
        Een aantal factoren speelt een belangrijke rol bij de duur van het traject. Bij langdurige of diep ingesleten conflicten is vaak meer tijd nodig om patronen te begrijpen en te doorbreken. Ook complicerende factoren zoals ontrouw, depressie, verslaving of trauma kunnen het traject verlengen, en soms is aanvullende individuele ondersteuning wenselijk. Daarnaast maakt motivatie veel uit: koppels die open zijn, eerlijk durven kijken naar zichzelf en tussen sessies oefenen, zetten meestal sneller stappen. De kwaliteit van de relatie vóór de crisis speelt eveneens mee: wat er jarenlang is opgebouwd, helpt vaak in het herstel. Tot slot laat onderzoek zien dat commitment, de bereidheid om samen te investeren, een van de sterkste voorspellers is van duurzaam herstel.
      </p>

      <h2>De fasen van een IBCT-traject</h2>
      <p>
        IBCT werkt met drie fasen. Elke fase heeft een eigen doel, tempo en manier van werken. Samen vormen ze een traject dat inzicht geeft in jullie patronen én ruimte maakt voor blijvende verandering.
      </p>

      <h3>Fase 1: Intake en assessment (1–3 sessies)</h3>
      <p>
        In deze fase leer ik jullie en jullie relatiegeschiedenis goed kennen. We verkennen samen wat er speelt, welke patronen zichtbaar zijn en wat jullie verlangen of missen. Soms spreek ik partners ook individueel, wanneer dat helpt om het geheel beter te begrijpen, maar dat is niet altijd nodig.
      </p>
      <p>
        Op basis van deze informatie maak ik een relatieformulering (officiële term: casusconceptualisatie): een helder overzicht van de patronen die tussen jullie zijn ontstaan en wat jullie nodig hebben om daar beweging in te krijgen.
      </p>

      <h3>Fase 2: Acceptatie en verandering (5–15 sessies)</h3>
      <p>
        Dit is het hart van de therapie. We werken met twee kerninterventies: empathisch verbinden en gezamenlijke afstand nemen (samen naar het patroon kijken). Daarnaast oefenen jullie met kleine gedragingen die helpen om verbinding te herstellen. In deze fase zie je vaak beweging: de ene week voelt het lichter, de volgende week schuurt het weer. Dat hoort erbij.
      </p>

      <h3>Fase 3: Afronden en bestendigen (2–3 sessies)</h3>
      <p>
        In de afrondende fase richten we ons op het vasthouden van wat jullie hebben geleerd. Jullie leren signalen herkennen, terugval voorkomen en weten wat te doen als het toch even misloopt. Soms plannen we een terugkommoment om te kijken hoe het gaat en waar eventueel bijgestuurd kan worden.
      </p>

      <h2>Hoe vaak gaan we elkaar zien?</h2>
      <p>
        In de meeste trajecten zie ik koppels één keer per twee weken en soms ook één keer per week. In het begin kiezen veel koppels voor wekelijkse sessies, omdat dat helpt om sneller inzicht te krijgen in patronen en om de eerste veranderingen goed te ondersteunen. Naarmate jullie meer grip krijgen op wat er tussen jullie gebeurt, kan de frequentie omlaag. Soms plannen we juist tijdelijk wat dichter op elkaar, bijvoorbeeld wanneer er veel spanning is of wanneer jullie in een intensieve fase van verandering zitten. De frequentie stemmen we altijd af op wat jullie nodig hebben en wat past bij jullie situatie.
      </p>

      <h2>Hoe ziet een sessie eruit?</h2>
      <p>
        Een sessie duurt meestal 90 minuten. We beginnen met een korte check-in: hoe is het sinds de vorige keer gegaan, wat viel op, waar liepen jullie tegenaan? Daarna werken we aan het thema dat op dat moment centraal staat. Soms gaat het om inzicht krijgen in het patroon tussen jullie, soms om het oefenen van nieuw gedrag of het verdiepen van begrip voor elkaar. Een belangrijk onderdeel van IBCT is dat jullie tussen de sessies door thuis zelfstandig en gezamenlijk opdrachten doen. Die &lsquo;huiswerkopdrachten&rsquo; zijn geen &lsquo;extra werk&rsquo;, maar vormen de cruciale basis voor verandering. In de sessie bespreken we wat jullie hebben geprobeerd, wat hielp en wat lastig was. Aan het einde van de sessie kiezen we samen een haalbare stap voor thuis, zodat jullie steeds meer grip krijgen op het patroon. Elke sessie bouwt voort op de vorige, maar er is altijd ruimte voor wat er op dat moment speelt.
      </p>

      <h2>Hoe weet je of relatietherapie werkt?</h2>
      <p>
        Veel koppels merken al in de eerste weken of het traject iets in beweging zet. Dat betekent niet dat alles meteen makkelijker wordt, maar wel dat jullie meer grip krijgen op wat er tussen jullie gebeurt. Je merkt dat gesprekken minder snel escaleren, dat jullie elkaar beter begrijpen of dat er meer ruimte komt om moeilijke dingen te bespreken zonder dat het meteen misloopt. Soms zie je subtiele veranderingen: een andere toon, meer nieuwsgierigheid, meer rust. Soms zijn het grotere stappen, zoals weer samen kunnen lachen of elkaar opzoeken in plaats van vermijden. Onderzoek laat zien dat vooruitgang in IBCT vaak gestaag verloopt: niet in één rechte lijn, maar met kleine verschuivingen die zich stap voor stap opbouwen. Een belangrijk signaal dat therapie werkt, is dat jullie thuis dingen anders gaan doen en dat die nieuwe patronen steeds beter voor jullie gaan werken.
      </p>

      <h2>Wat als relatietherapie niet werkt?</h2>
      <p>
        Soms merken koppels dat relatietherapie niet brengt wat ze hadden gehoopt. Dat betekent niet dat jullie gefaald hebben of dat de relatie &lsquo;niet goed genoeg&rsquo; is. Soms is de pijn te groot, zijn de verschillen te fundamenteel of is er te weinig energie om nog verder te investeren. In dat geval kijken we samen wat wél helpend is. Dat kan betekenen dat we onderzoeken hoe jullie op een respectvolle manier verder kunnen, samen of apart. IBCT is geen therapievorm die koppels koste wat kost bij elkaar wil houden. Het is therapie die helpt om helderheid te krijgen. Ook als die helderheid betekent dat <Link href="/blog/relatietherapie-of-scheiden">scheiden beter voor jullie werkt dan doorgaan</Link>. Wat de uitkomst ook is, jullie hoeven het niet alleen te doen.
      </p>

      <p>
        IBCT vraagt moed en bereidheid om samen te kijken naar wat er tussen jullie gebeurt. Het is geen snelle oplossing, maar een proces dat helderheid en beweging brengt. Als jullie willen onderzoeken of dit traject bij jullie past, kunnen jullie via het <Link href="/#contact">contactformulier</Link> eenvoudig een kennismaking plannen. Dan kijken we rustig wat er nodig is om verder te kunnen.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>Dijkstra, P., &amp; Tamminga, A. (2025). <em>IBCT-relatietherapie</em> (herziene uitgave). Amsterdam: Boom.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
