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
  updated?: string;
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
      "Veel koppels worstelen jarenlang met relationele problemen voordat ze hulp zoeken. Dat is jammer, want hoe eerder je aan de slag gaat, hoe meer ruimte er is voor herstel. Dit zijn zeven signalen die aangeven dat professionele begeleiding zinvol kan zijn.",
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
      "Relatietherapie aan huis verlaagt de drempel en laat gesprekken natuurlijker verlopen. Je zit in je eigen omgeving, op de plek waar jullie dagelijks leven zich afspeelt. Een overzicht van de voordelen, en wanneer het juist niet passend is.",
    image: "/pampas-indoor.jpg",
    imageAlt: "Pampasgras in huiselijke omgeving, symbool voor therapie in vertrouwde sfeer",
    readingTime: "6 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "hoe-lang-duurt-relatietherapie",
      "communicatieproblemen-in-een-relatie",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "Werkwijze",
  },
  {
    slug: "relatietherapie-of-scheiden",
    title: "Scheiden of relatietherapie? Een weloverwogen keuze maken",
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
      "Een van de meest gestelde vragen tijdens een intakegesprek: hoe lang zijn wij hier mee bezig? Een eerlijk antwoord, gebaseerd op wat de wetenschap laat zien over effectieve relatietherapie.",
    image: "/pampas-breeze.jpg",
    imageAlt: "Pampasgras in de bries, symbool voor tijd en beweging",
    readingTime: "7 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "communicatieproblemen-in-een-relatie",
      "relatietherapie-aan-huis",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "Praktische informatie",
  },
  {
    slug: "communicatieproblemen-in-een-relatie",
    title: "Wat is IBCT en waarom is het anders dan klassieke relatietherapie?",
    description:
      "IBCT is een van de best onderzochte vormen van relatietherapie. Ontdek wat Integrative Behavioral Couple Therapy is, hoe het werkt en waarom acceptatie en verandering samengaan.",
    excerpt:
      "Relatietherapie is geen vaste methode, maar een verzamelnaam voor uiteenlopende benaderingen. IBCT combineert acceptatie met gedragsverandering en is een van de best onderbouwde vormen van koppeltherapie.",
    image: "/pampas-beige.jpg",
    imageAlt: "Warm getint pampasgras, symbool voor rust en wetenschappelijke onderbouwing",
    readingTime: "9 min leestijd",
    date: "2026-04-20",
    dateLabel: "20 april 2026",
    related: [
      "hoe-lang-duurt-relatietherapie",
      "relatietherapie-na-vreemdgaan",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "IBCT",
  },
  {
    slug: "steeds-dezelfde-ruzie-in-je-relatie",
    title: "Steeds dezelfde ruzie in je relatie? Zo doorbreek je het patroon",
    description:
      "Lees waarom ruzies zich herhalen en hoe je het patroon kunt doorbreken. Praktische inzichten uit IBCT en onderzoek naar relatiepatronen. Relatiepraktijk De Nieuwe Weelde.",
    excerpt:
      "Steeds weer dezelfde ruzie? Vaak gaat het niet om het onderwerp, maar om een patroon dat zichzelf herhaalt. Een blik op wat er onder de harde emoties ligt en hoe je samen een nieuwe weg kunt vinden.",
    image: "/pampas-beige.jpg",
    imageAlt: "Warm pampasgras in zacht licht, symbool voor rust na een conflict",
    readingTime: "8 min leestijd",
    date: "2026-05-07",
    dateLabel: "7 mei 2026",
    related: [
      "communicatieproblemen-in-een-relatie",
      "jaloezie-in-je-relatie",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "Specifieke thema's",
  },
  {
    slug: "jaloezie-in-je-relatie",
    title: "Jaloezie in je relatie: wat het écht zegt (en hoe je er samen mee om kunt gaan)",
    description:
      "Jaloezie in je relatie hoeft geen probleem te zijn. Ontdek wat jaloezie écht betekent, welke vormen het meest voorkomen en hoe je er samen op een verbindende manier mee omgaat.",
    excerpt:
      "Jaloezie wordt vaak gezien als iets dat je niet zou mogen voelen, terwijl het juist iets vertelt over wat er geraakt wordt. Een zachte, verdiepende blik op een van de meest gelaagde emoties in een relatie en hoe je er samen mee om kunt gaan.",
    image: "/pampas-water.jpg",
    imageAlt: "Pampasgras bij stil water, symbool voor reflectie en de gelaagdheid van emoties",
    readingTime: "8 min leestijd",
    date: "2026-05-02",
    dateLabel: "2 mei 2026",
    related: [
      "communicatieproblemen-in-een-relatie",
      "relatietherapie-na-vreemdgaan",
      "wanneer-is-relatietherapie-zinvol",
    ],
    category: "Specifieke thema's",
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

export function getUniqueBlogImages(): { src: string; alt: string }[] {
  const seen = new Set<string>();
  return blogPosts
    .filter((p) => !seen.has(p.image) && seen.add(p.image))
    .map((p) => ({ src: p.image, alt: p.imageAlt }));
}
