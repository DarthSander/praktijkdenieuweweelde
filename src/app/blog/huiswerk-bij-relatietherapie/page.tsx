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
    </BlogLayout>
  );
}
