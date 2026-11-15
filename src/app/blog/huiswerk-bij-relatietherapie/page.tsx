import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "huiswerk-bij-relatietherapie";
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
        Bij <Link href="/ibct-relatietherapie">IBCT</Link> (Integrative Behavioral Couple Therapy) hoort huiswerk. Voor koppels is dat vaak onverwacht. Het doet denken aan terug in de schoolbanken gaan, met opdrachten mee naar huis en de vraag of je het goed hebt gedaan. In de sessies kijken we naar wat zich tussen jullie herhaalt. Daarbuiten oefenen jullie met iets anders.
      </p>

      <h2>Een inzicht is niet genoeg</h2>
      <p>
        In een sessie valt vaak een kwartje. Jullie zien hoe het gesprek steeds dezelfde kant op gaat en wie daarin welke stap zet. Dat is belangrijk en het is niet voldoende. Een <Link href="/blog/steeds-dezelfde-ruzie-in-je-relatie">patroon</Link> dat zich over jaren heeft gevormd gaat niet weg doordat je het doorziet. Het gaat weg doordat jullie iets anders doen, vaak genoeg om het te laten wennen.
      </p>
      <p>
        Dat is ook te zien in de grote vergelijkende studie naar IBCT. Doss, Thum, Sevier, Atkins en Christensen (2005) keken waar de verbetering bij koppels vandaan kwam. In het begin hing die vooral samen met hoe vaak het gedrag waar het om ging anders ging. Later in het traject hing die meer samen met hoe de partners op dat gedrag reageerden.
      </p>

      <h2>Net als bij gitaar spelen</h2>
      <p>
        Ik kan je vertellen hoe je een akkoord pakt. Ik kan voordoen waar je vingers moeten staan en uitleggen waarom het zo werkt. Speel je daarna niet zelf, dan kun je het nog steeds niet. Met <Link href="/blog/communicatieproblemen-in-een-relatie">praten</Link> werkt het niet anders. In de sessie kunnen jullie precies horen wat een andere reactie zou zijn. Thuis moeten jullie die reactie zelf geven, meestal op een moment dat het slecht uitkomt.
      </p>

      <h2>In het begin voelt het gekunsteld</h2>
      <p>
        De eerste keren voelt het oefenen onhandig. Jullie zeggen dingen die jullie nooit zo zouden zeggen en het klinkt alsof het uit een boekje komt. Dat hoort erbij. Jullie zijn vastgeroest in een manier van praten die er jaren over heeft gedaan om zo te worden. Alles wat daarvan afwijkt voelt eerst onnatuurlijk. Dat het ongemakkelijk is betekent dus niet dat het niet werkt. Het betekent dat het nieuw is.
      </p>

      <h2>Wat huiswerk in de praktijk is</h2>
      <p>
        Huiswerk is bij IBCT geen stapel werkbladen. Soms is de opdracht om een week lang alleen op te merken wanneer het patroon begint, zonder er iets aan te veranderen. Soms spreken jullie een vast moment af om één onderwerp te bespreken, op een manier die we samen hebben afgesproken. Soms gaat het om iets kleins dat jullie voor elkaar deden en dat de laatste jaren is weggevallen. Wat jullie meekrijgen hangt af van wat er in de sessie naar boven kwam.
      </p>

      <h2>Waarom herhaling nodig is</h2>
      <p>
        Een nieuwe reactie moet klaarliggen op het moment dat het moeilijk wordt. Dat lukt alleen als jullie hem vaker hebben gegeven op momenten dat er weinig op het spel stond. Tussen twee sessies zit een week met gelegenheden om dat te doen. Daarom vraag ik ernaar als we weer bij elkaar zitten.
      </p>

      <h2>Wat onderzoek over huiswerk laat zien</h2>
      <p>
        Hawrilenko, Eubanks Fleming, Goldstein en Cordova (2016) volgden 108 koppels na een korte vorm van relatiebegeleiding. De koppels die meer met de opdrachten deden gingen sneller vooruit. Een halfjaar later was dat verschil het grootst. Na een jaar was het verdwenen, want de koppels die minder hadden geoefend kwamen er ook, alleen langzamer. Oefenen is dus geen voorwaarde. Het scheelt tijd.
      </p>
      <p>
        Holtzworth-Munroe, Jacobson, DeKlyen en Whisman (1989) onderzochten de gedragsmatige voorloper van IBCT. Koppels die actief meededen en hun opdrachten uitvoerden, hadden aan het eind een betere uitkomst. Dat is een verband en geen bewijs dat het een het ander veroorzaakt.
      </p>
      <p>
        Van IBCT bestaat ook een internetversie. Koppels werken daarin zelf door het programma heen en hebben in totaal ongeveer een uur contact met een begeleider. Doss en collega&apos;s (2016) legden dat bij 300 koppels naast een wachtlijst. De relatietevredenheid van de koppels die het programma doorliepen verbeterde duidelijk meer. Het grootste deel van dat werk deden ze zelf.
      </p>

      <h2>Als het niet gelukt is</h2>
      <p>
        Soms komt er van het oefenen niets. De week liep anders, of jullie hebben het geprobeerd en het ging mis. Dat is geen verloren week. Wat jullie tegenhield is precies waar we dan naar kijken. Dat het niet lukte is informatie en geen cijfer.
      </p>

      <h2>Wat het van jullie vraagt</h2>
      <p>
        Relatietherapie vraagt tijd tussen de sessies. Niet veel per keer, maar wel regelmatig en vaak op een moment dat het slecht uitkomt. Dat is het deel dat jullie zelf doen.
      </p>

      <h2>Een intakegesprek begint met een bericht</h2>
      <p>
        Wat het oefenen bij jullie zou inhouden hangt af van wat er speelt. In een intakegesprek bij jullie thuis kijken we daarnaar. Stuur een bericht via het <Link href="/#contact">contactformulier</Link> en ik neem binnen 24 uur contact op.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>Doss, B. D., Cicila, L. N., Georgia, E. J., Roddy, M. K., Nowlan, K. M., Benson, L. A., &amp; Christensen, A. (2016). A randomized controlled trial of the web-based OurRelationship program: Effects on relationship and individual functioning. <em>Journal of Consulting and Clinical Psychology, 84</em>(4), 285-296.</li>
          <li>Doss, B. D., Thum, Y. M., Sevier, M., Atkins, D. C., &amp; Christensen, A. (2005). Improving relationships: Mechanisms of change in couple therapy. <em>Journal of Consulting and Clinical Psychology, 73</em>(4), 624-633.</li>
          <li>Hawrilenko, M., Eubanks Fleming, C. J., Goldstein, A. S., &amp; Cordova, J. V. (2016). Motivating action and maintaining change: The time-varying role of homework following a brief couples&apos; intervention. <em>Journal of Marital and Family Therapy, 42</em>(3), 396-408.</li>
          <li>Holtzworth-Munroe, A., Jacobson, N. S., DeKlyen, M., &amp; Whisman, M. A. (1989). Relationship between behavioral marital therapy outcome and process variables. <em>Journal of Consulting and Clinical Psychology, 57</em>(5), 658-662.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
