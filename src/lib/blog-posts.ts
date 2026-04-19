export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  date: string;
  dateLabel: string;
  related: string[];
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "wanneer-is-relatietherapie-zinvol",
    title: "Wanneer is relatietherapie zinvol? 7 signalen die wijzen op meer dan een dipje",
    description:
      "Herken je deze 7 tekenen in jullie relatie? Dan is relatietherapie zinvol. IBCT-therapeut Eva Mulder uit Tilburg legt uit wanneer het tijd is voor professionele hulp.",
    excerpt:
      "De meeste koppels wachten gemiddeld zes jaar voordat zij hulp zoeken. Zonde, want hoe langer je wacht, hoe dieper de patronen zich vastzetten. Dit zijn de zeven signalen die erop wijzen dat relatietherapie zinvol is.",
    image: "/pampas-breeze.jpg",
    imageAlt: "Zacht licht door pampasgras, symbool voor rust en reflectie in de relatie",
    readingTime: "7 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "relatietherapie-of-scheiden",
      "communicatieproblemen-in-een-relatie",
      "hoe-lang-duurt-relatietherapie",
    ],
    category: "Relatietherapie",
  },
  {
    slug: "relatietherapie-na-vreemdgaan",
    title: "Relatietherapie na vreemdgaan: kan de relatie echt herstellen?",
    description:
      "Kan een relatie herstellen na vreemdgaan? Wetenschappelijk onderzoek laat zien dat het kan. IBCT-therapeut Eva Mulder uit Tilburg legt de fasen van herstel uit.",
    excerpt:
      "Vreemdgaan voelt als de ondergang van een relatie. Toch laten studies zien dat veel koppels na ontrouw juist een hechtere band kunnen opbouwen, mits de juiste begeleiding wordt ingezet.",
    image: "/pampas-mountains.jpg",
    imageAlt: "Weidse bergen achter pampasgras, symbool voor het pad van herstel",
    readingTime: "9 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "communicatieproblemen-in-een-relatie",
      "wanneer-is-relatietherapie-zinvol",
      "relatietherapie-of-scheiden",
    ],
    category: "Specifieke thema's",
  },
  {
    slug: "relatietherapie-aan-huis",
    title: "De voordelen van relatietherapie aan huis: waarom jullie eigen bank werkt",
    description:
      "Relatietherapie aan huis heeft unieke voordelen boven een praktijkruimte. Meer rust, minder drempel en therapie in jullie eigen omgeving. Eva Mulder werkt in Tilburg.",
    excerpt:
      "Stel je voor: geen volle wachtkamer, geen steriele spreekkamer, maar gewoon op jullie eigen bank. Relatietherapie aan huis heeft unieke voordelen, zowel praktisch als therapeutisch.",
    image: "/pampas-indoor.jpg",
    imageAlt: "Pampasgras in huiselijke omgeving, symbool voor therapie in vertrouwde sfeer",
    readingTime: "6 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "hoe-lang-duurt-relatietherapie",
      "wat-is-ibct",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "Werkwijze",
  },
  {
    slug: "relatietherapie-of-scheiden",
    title: "Relatietherapie of scheiden? Zo maken jullie een weloverwogen keuze",
    description:
      "Moeten jullie doorgaan of uit elkaar? Relatietherapie kan helpen de juiste keuze te maken. IBCT-therapeut Eva Mulder uit Tilburg legt uit hoe je helderheid krijgt.",
    excerpt:
      "Soms weet je het even niet meer: doorgaan of loslaten? Dat is een van de zwaarste vragen die je in een relatie kunt stellen. Relatietherapie helpt niet per se om bij elkaar te blijven, maar om samen helderheid te krijgen.",
    image: "/pampas-water.jpg",
    imageAlt: "Pampasgras bij kalm water, symbool voor reflectie en keuzes",
    readingTime: "8 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "wanneer-is-relatietherapie-zinvol",
      "relatietherapie-na-vreemdgaan",
      "hoe-lang-duurt-relatietherapie",
    ],
    category: "Relatietherapie",
  },
  {
    slug: "hoe-lang-duurt-relatietherapie",
    title: "Hoe lang duurt relatietherapie? Een realistisch beeld van wat jullie kunnen verwachten",
    description:
      "Hoe lang duurt relatietherapie? Gemiddeld tussen 8 en 20 sessies. IBCT-therapeut Eva Mulder uit Tilburg legt uit wat jullie per fase kunnen verwachten.",
    excerpt:
      "Een van de meest gestelde vragen tijdens een kennismaking: hoe lang zijn wij hier mee bezig? Een eerlijk antwoord, gebaseerd op wat de wetenschap laat zien over effectieve relatietherapie.",
    image: "/pampas-breeze.jpg",
    imageAlt: "Pampasgras in de bries, symbool voor tijd en beweging",
    readingTime: "7 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "wat-is-ibct",
      "relatietherapie-aan-huis",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "Praktische informatie",
  },
  {
    slug: "communicatieproblemen-in-een-relatie",
    title: "Communicatieproblemen in een relatie: oorzaken, patronen en oplossingen",
    description:
      "Communicatieproblemen zijn de belangrijkste reden dat koppels hulp zoeken. Leer het demand-withdraw-patroon herkennen en doorbreken met IBCT-therapie in Tilburg.",
    excerpt:
      "Bijna elk koppel dat zich bij mij meldt, noemt communicatieproblemen als belangrijkste klacht. Maar onder de schijnbare communicatieproblemen ligt bijna altijd iets diepers. Een uitleg over hoe patronen ontstaan, en hoe jullie ze doorbreken.",
    image: "/pampas-beige.jpg",
    imageAlt: "Warm getint pampasgras, symbool voor luisteren en zachte communicatie",
    readingTime: "9 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "wat-is-ibct",
      "relatietherapie-na-vreemdgaan",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "Specifieke thema's",
  },
  {
    slug: "wat-is-ibct",
    title: "Wat is IBCT en waarom is het anders dan klassieke relatietherapie?",
    description:
      "IBCT is een van de best onderzochte vormen van relatietherapie. Ontdek wat Integrative Behavioral Couple Therapy is, hoe het werkt en waarom het zo effectief is.",
    excerpt:
      "Relatietherapie kent veel stromingen, maar niet elke methode is even goed onderzocht. IBCT combineert acceptatie en verandering, en is een van de best onderbouwde vormen van koppeltherapie wereldwijd.",
    image: "/pampas-mountains.jpg",
    imageAlt: "Bergen en pampasgras, symbool voor wetenschap en ruimte in de relatie",
    readingTime: "10 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "communicatieproblemen-in-een-relatie",
      "hoe-lang-duurt-relatietherapie",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "IBCT",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return post.related
    .map((relatedSlug) => getPostBySlug(relatedSlug))
    .filter((p): p is BlogPost => Boolean(p));
}
