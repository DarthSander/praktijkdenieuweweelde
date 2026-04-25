import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "communicatieproblemen-in-een-relatie";
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
        Veel koppels komen in therapie omdat ze merken dat gesprekken steeds dezelfde kant op
        gaan. Het lukt niet meer om elkaar echt te bereiken, hoe goed de intenties ook zijn.
        Dat kan verwarrend en vermoeiend zijn, zeker als jullie allebei het gevoel hebben dat
        jullie al van alles hebben geprobeerd.
      </p>
      <p>
        Communicatieproblemen gaan zelden alleen over woorden. Ze raken aan emoties,
        verwachtingen en manieren van reageren die zich in de loop van de tijd hebben gevormd.
        Daardoor kan een klein moment ineens veel groter voelen dan het eigenlijk is.
      </p>

      <h2>Wat zijn communicatieproblemen eigenlijk?</h2>
      <p>
        Wanneer koppels het hebben over &lsquo;communicatieproblemen&rsquo;, bedoelen ze vaak
        meer dan alleen praten dat niet lukt. Meestal gaat het om terugkerende momenten waarop
        jullie elkaar niet goed bereiken: gesprekken die steeds dezelfde kant op gaan, het
        gevoel niet gehoord te worden, of onderwerpen die jullie liever vermijden omdat ze
        spanning geven. Het zijn geen technische problemen, maar relationele dynamieken.
      </p>

      <h2>Het demand-withdrawal-patroon</h2>
      <p>
        Eén beweging zie ik bij veel koppels terugkomen: het demand-withdrawal-patroon. De één
        zoekt contact en wil iets bespreken, terwijl de ander juist afstand neemt om het rustig
        te houden. Hoe harder de één duwt, hoe verder de ander zich terugtrekt. Niet omdat
        iemand iets verkeerd doet, maar omdat jullie allebei op je eigen manier veiligheid
        proberen te vinden. Deze wisselwerking is uitgebreid onderzocht en komt in veel
        relaties voor.
      </p>

      <h2>Waarom &lsquo;beter communiceren&rsquo; vaak niet werkt</h2>
      <p>
        Veel koppels doen hun best om beter te communiceren, maar merken dat het toch niet
        lukt. Dat komt meestal doordat communicatie verweven is met alles wat er tussen jullie
        speelt: spanning, gewoontes, oude gevoeligheden. Pas als die laag duidelijk wordt,
        kunnen technieken echt helpen.
      </p>

      <h2>De zachte laag onder de harde reacties</h2>
      <p>
        Wat je aan de oppervlakte ziet, zoals boosheid, verwijt of afstand, is vaak niet het
        hele verhaal. Daaronder liggen emoties die minder zichtbaar zijn: verdriet, schaamte
        of de angst om afgewezen te worden. Die laag raakt aan wat jullie werkelijk bedoelen,
        maar die is ook het moeilijkst om uit te spreken.
      </p>

      <h2>Wat maakt IBCT effectief bij communicatieproblemen?</h2>
      <p>
        IBCT richt zich niet alleen op hoe jullie praten, maar vooral op wat er onder jullie
        reacties ligt. Sommige dingen horen bij wie jullie zijn, andere dingen kunnen
        veranderen. Door beide kanten te onderzoeken ontstaat er meer helderheid en ruimte
        om anders met elkaar om te gaan.
      </p>
      <p>
        In IBCT kijken we samen naar de manier waarop jullie op elkaar reageren, alsof het
        iets is dat buiten jullie staat. Dat helpt om afstand te nemen van de verwijten en de
        emoties van het moment. Je wordt dan niet elkaars tegenstander, maar twee mensen die
        samen proberen te begrijpen wat er steeds gebeurt. Dat geeft lucht en maakt het
        makkelijker om iets nieuws te proberen.
      </p>
      <p>
        IBCT helpt om de zachtere laag onder de harde reacties zichtbaar te maken. Dat zorgt
        vaak meteen voor meer ontspanning en wederzijds begrip. Onderzoek laat zien dat dit
        een van de belangrijkste factoren is voor blijvende verandering.
      </p>

      <h2>Wat jullie zelf al kunnen doen</h2>
      <p>
        Een traject helpt vaak om gesprekken weer op gang te brengen, maar jullie kunnen zelf
        al beginnen met kleine dingen. Herken het moment waarop de spanning oploopt, neem
        even afstand en spreek af wanneer jullie verder praten. Benoem wat er schuilgaat
        achter je eerste impuls en luister om te begrijpen. Dat kan al verschil maken.
      </p>

      <h2>Wanneer is professionele hulp zinvol?</h2>
      <p>
        Soms is het helpend om iemand van buitenaf mee te laten kijken. Zeker wanneer
        gesprekken steeds vastlopen, onderwerpen worden vermeden of één van jullie zich niet
        meer vrij voelt om eerlijk te zijn. Ook een afname in intimiteit of terugkerende
        verwijten kunnen signalen zijn dat begeleiding zinvol is. In een intakegesprek
        onderzoeken we samen wat er speelt en wat jullie nodig hebben.
      </p>
      <p>
        Meer over de momenten waarop therapie zinvol is, lees je in het artikel{" "}
        <Link href="/blog/wanneer-is-relatietherapie-zinvol">wanneer is relatietherapie zinvol</Link>.
      </p>

      <h2>Een gesprek kan verschil maken</h2>
      <p>
        Wanneer jullie merken dat het samen niet meer lukt, kan begeleiding helpen om
        overzicht en rust te brengen. In een intakegesprek kijken we samen wat er nodig is.
      </p>
      <p>
        Stuur een bericht via het <Link href="/#contact">contactformulier</Link>, dan nemen
        we binnen een dag contact op.
      </p>
    </BlogLayout>
  );
}
