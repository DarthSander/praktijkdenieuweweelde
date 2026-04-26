import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "wat-is-ibct";
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
        Relatietherapie is geen vaste methode, maar een verzamelnaam voor uiteenlopende
        benaderingen. Sommige therapeuten werken vooral met emoties en hechting, anderen met
        gedrag en patronen, weer anderen met systemen en gezinsdynamiek. Niet elke stroming is
        even goed onderzocht, en juist daarom is het waardevol om te weten welke methoden een
        stevige wetenschappelijke basis hebben.
      </p>

      <h2>Wat betekent IBCT?</h2>
      <p>
        IBCT staat voor Integrative Behavioral Couple Therapy, in het Nederlands vaak
        omschreven als geïntegreerde gedragstherapie voor partners. Het woord <em>integrative</em>{" "}
        verwijst naar het samenbrengen van twee doelen die in veel andere methoden los van
        elkaar staan: acceptatie van wat moeilijk veranderbaar is én gedragsverandering waar
        dat wél kan. Juist die combinatie maakt IBCT onderscheidend.
      </p>

      <h2>Waar komt IBCT vandaan?</h2>
      <p>
        IBCT werd in de jaren negentig ontwikkeld door Andrew Christensen en Neil S. Jacobson,
        beiden ervaren gedragstherapeuten. Hun eerdere methode, TBCT, hielp koppels wel, maar
        de effecten bleken op langere termijn minder stabiel. Christensen en Jacobson zagen dat
        duurzame verandering pas mogelijk werd wanneer koppels ook leerden omgaan met
        verschillen die niet verdwijnen. Vanuit die inzichten ontstond IBCT. Sinds 2020 bestaat
        er een Nederlandstalig protocol van Pieternel Dijkstra en Aerjen Tamminga, in 2025 in
        herziene vorm verschenen.
      </p>

      <h2>Waarom is IBCT evidence&#8209;based?</h2>
      <p>
        IBCT behoort tot de best onderzochte vormen van relatietherapie. In meerdere grote
        studies liet IBCT sterke en langdurige effecten zien. Een bekende studie uit 2004
        vergeleek IBCT met de oudere TBCT&#8209;methode en vond dat IBCT leidde tot grotere
        verbeteringen in relatietevredenheid. Ook op twee&#8209; en vijfjaarsfollow&#8209;up
        bleven veel koppels significant vooruitgegaan. Een deel van dit onderzoek valt onder
        zogeheten RCT&rsquo;s: studies waarin koppels willekeurig worden toegewezen aan
        verschillende behandelvormen, zodat je eerlijk kunt vergelijken. IBCT staat daarnaast
        op de lijst van door onderzoek ondersteunde behandelingen van de APA (American
        Psychological Association), een belangrijke beroepsvereniging voor psychologen in de
        Verenigde Staten.
      </p>

      <h2>Het hart van IBCT: acceptatie én verandering</h2>
      <p>
        In elke relatie is een deel van de strijd verbonden aan dingen die niet werkelijk
        veranderbaar zijn. Jouw partner is van nature introvert, jij van nature extravert. Jij
        houdt van structuur, jouw partner van spontaniteit. Die verschillen blijven
        grotendeels bestaan.
      </p>
      <p>
        Veel van de spanning in relaties ontstaat niet door de verschillen zelf, maar door de
        manier waarop partners ermee omgaan. Als je vooral probeert de ander te veranderen,
        ontstaat er al snel weerstand of afstand. Maar alleen accepteren kan voelen alsof je
        jezelf tekortdoet. IBCT zoekt daarom een middenweg: ruimte maken voor wat niet
        veranderbaar is, en samen kijken naar gedrag dat wel anders kan.
      </p>
      <p>
        Een belangrijk onderzoek van Doss en collega&rsquo;s (2005) liet zien dat acceptatie
        als een buffer werkt: als er tijdens de therapie een terugval in doelgedrag optreedt,
        is dat in IBCT minder schadelijk voor de relatietevredenheid dan in TBCT. Acceptatie
        maakt veranderingen robuust.
      </p>

      <h2>De DEEP/PEEP&#8209;analyse</h2>
      <p>
        Conflicten in een relatie ontstaan zelden door één gebeurtenis of één persoon. IBCT
        werkt met een helder analysemodel, in het Engels DEEP en in het Nederlands ook wel
        PEEP genoemd. Het helpt koppels om hun conflicten niet als persoonlijk schuldvraagstuk
        te zien, maar als een samenspel van vier lagen: de persoonlijke verschillen tussen
        partners, de emotionele gevoeligheden die reacties kleuren, de externe stressoren die
        druk geven, en de manier waarop jullie op elkaar reageren. Door deze lagen naast
        elkaar te leggen, verschuift het gesprek van &lsquo;wie heeft schuld&rsquo; naar
        &lsquo;wat gebeurt er tussen ons&rsquo;. Dat geeft rust, overzicht en vaak ook meer
        mildheid naar elkaar.
      </p>

      <h2>De vier IBCT&#8209;processen</h2>
      <p>
        IBCT werkt langs vier processen die elkaar versterken. Het begint met acceptatie:
        zicht krijgen op de gevoeligheden, verwachtingen en kwetsbaarheden die onder reacties
        liggen, en elkaar weer kunnen bereiken op momenten waarop het lastig wordt. Daarna
        volgt tolerantie bevorderen, waarin partners leren omgaan met verschillen die niet
        verdwijnen, bijvoorbeeld door situaties die spanning oproepen minder beladen te maken
        en zichzelf te beschermen in moeilijke momenten. Vervolgens richten we ons op het
        uitwisselen van positief gedrag: kleine, haalbare veranderingen die direct effect
        hebben in het dagelijks leven. Tot slot werken we aan communicatie, zodat gesprekken
        duidelijker, effectiever en prettiger verlopen en jullie samen problemen kunnen
        oplossen zonder dat het escaleert.
      </p>

      <h2>Voor wie werkt IBCT?</h2>
      <p>IBCT is geschikt voor koppels die te maken hebben met onder andere:</p>
      <ul>
        <li>ontrouw of een vertrouwensbreuk, en de vraag hoe je samen verder kunt</li>
        <li>terugkerende ruzies, vaak over dezelfde onderwerpen</li>
        <li>
          communicatieproblemen, zoals elkaar niet meer bereiken of steeds langs elkaar heen
          praten
        </li>
        <li>het gevoel dat jullie afstandelijker van elkaar worden</li>
        <li>
          twijfels over de relatie, ook als één van jullie nog niet weet wat hij of zij wil
        </li>
        <li>
          verschillen die botsen, bijvoorbeeld in behoeften, tempo, persoonlijkheid of manier
          van reageren
        </li>
        <li>stress of overbelasting bij een van jullie, die invloed heeft op de relatie</li>
        <li>
          een wens om patronen te doorbreken of preventief te werken, bijvoorbeeld in een{" "}
          <Link href="/#tarieven">APK voor relaties</Link>
        </li>
      </ul>
      <p>
        IBCT is niet passend wanneer er sprake is van structureel geweld, onbehandelde
        verslaving of actueel misbruik. In die situaties is eerst individuele hulp nodig
        voordat relatietherapie veilig kan plaatsvinden.
      </p>

      <h2>Hoe verschilt IBCT van andere vormen van relatietherapie?</h2>
      <p>
        Veel vormen van relatietherapie richten zich vooral op communicatievaardigheden: beter
        luisteren, duidelijker spreken, feedback geven. Dat is waardevol, maar vaak niet
        genoeg wanneer onderliggende gevoeligheden of terugkerende patronen blijven meespelen.
        IBCT pakt daarom een laag dieper aan. Het helpt koppels begrijpen waar hun reacties
        vandaan komen, waarom bepaalde situaties steeds opnieuw spanning oproepen en hoe
        verschillen tussen partners een rol spelen. Door zowel acceptatie als verandering te
        combineren, ontstaat er meer ruimte, mildheid en verbinding. Pas daarna worden
        communicatie en probleemoplossing echt effectief.
      </p>

      <h2>Is IBCT iets voor jullie?</h2>
      <p>
        Ik geef mijn sessies bij jullie thuis, in Tilburg en omgeving. Dat is een bewuste
        keuze: de patronen waar we mee werken spelen zich af in jullie eigen omgeving, en
        daar kunnen we ze het beste onderzoeken. De meest passende manier om te ontdekken of
        IBCT bij jullie past, is een intakegesprek. Tijdens dat gesprek verkennen we jullie
        situatie, leg ik de IBCT&#8209;aanpak uit en kijken we samen of deze methode en mijn
        manier van werken aansluiten bij wat jullie nodig hebben.
      </p>
      <p>
        Plan een intakegesprek via het <Link href="/#contact">contactformulier</Link>. Ik neem
        binnen 24 uur contact op.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>
            Christensen, A., Jacobson, N. S., &amp; Babcock, J. C. (1995).{" "}
            <em>Integrative Behavioral Couple Therapy.</em>
          </li>
          <li>
            Christensen, A., &amp; Jacobson, N. S. (2000). <em>Reconcilable Differences.</em>
          </li>
          <li>
            Doss, B. D., Thum, Y. M., Sevier, M., Atkins, D. C., &amp; Christensen, A. (2005).
            Improving relationships: Mechanisms of change in Integrative Behavioral Couple
            Therapy.
          </li>
          <li>
            Jacobson, N. S., &amp; Christensen, A. (1996).{" "}
            <em>
              Acceptance and change in couple therapy: A therapist&rsquo;s guide to
              transforming relationships.
            </em>
          </li>
          <li>Cordova, J. V. (2001). Acceptance in behavioral couple therapy.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
