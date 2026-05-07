import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/chat/ChatWidget";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.praktijkdenieuweweelde.nl"),

  title: {
    default: "Relatietherapie Tilburg | Aan huis met IBCT‑begeleiding",
    template: "%s | Relatiepraktijk de Nieuwe Weelde",
  },
  description:
    "Wetenschappelijk onderbouwde relatietherapie bij jullie thuis in Tilburg. Eva Mulder biedt betrokken, professionele begeleiding voor koppels die rust, helderheid en verbinding zoeken.",
  keywords: [
    "relatietherapie Tilburg",
    "relatietherapeut Tilburg",
    "IBCT therapie",
    "koppeltherapie Tilburg",
    "relatiebegeleiding Tilburg",
    "relatieproblemen hulp",
    "Reeshof therapeut",
    "Berkel-Enschot therapie",
    "IBCT relatietherapie",
    "Eva Mulder therapeut",
    "relatietherapie aan huis",
    "Nieuwe Weelde Tilburg",
  ],
  authors: [{ name: "Eva Mulder" }],
  creator: "Eva Mulder",
  publisher: "Relatiepraktijk de Nieuwe Weelde",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.praktijkdenieuweweelde.nl",
  },

  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://www.praktijkdenieuweweelde.nl",
    siteName: "Relatiepraktijk de Nieuwe Weelde",
    title: "Relatietherapie Tilburg | Aan huis met IBCT‑begeleiding",
    description:
      "Wetenschappelijk onderbouwde relatietherapie bij jullie thuis in Tilburg. Eva Mulder biedt betrokken, professionele begeleiding voor koppels die rust, helderheid en verbinding zoeken.",
    images: [
      {
        url: "/pampas-water.jpg",
        width: 1280,
        height: 853,
        alt: "Relatiepraktijk de Nieuwe Weelde – IBCT relatietherapie in Tilburg",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Relatietherapie Tilburg | Aan huis met IBCT‑begeleiding",
    description:
      "Wetenschappelijk onderbouwde relatietherapie bij jullie thuis in Tilburg. Eva Mulder biedt betrokken, professionele begeleiding voor koppels die rust, helderheid en verbinding zoeken.",
    images: ["/pampas-water.jpg"],
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  },

  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#946B66",
  width: "device-width",
  initialScale: 1,
};

// Geo: benaderde coördinaten voor Kasteel Nijenrodestraat (Reeshof, Tilburg).
// Verfijn met exacte waarde uit Google Maps indien gewenst.
// aggregateRating/review bewust weggelaten: toevoegen pas zodra er echte reviews zijn
// — verzonnen ratings schenden Google's richtlijnen.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://www.praktijkdenieuweweelde.nl",
  name: "Relatiepraktijk de Nieuwe Weelde",
  description:
    "IBCT relatietherapie aan huis in Tilburg door Eva Mulder. Wetenschappelijk onderbouwde relatiebegeleiding voor koppels.",
  url: "https://www.praktijkdenieuweweelde.nl",
  telephone: "+31610096923",
  email: "Info@praktijkdenieuweweelde.nl",
  image: "https://www.praktijkdenieuweweelde.nl/pampas-water.jpg",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kasteel Nijenrodestraat 82",
    addressLocality: "Tilburg",
    postalCode: "5037 TH",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.5556,
    longitude: 5.0089,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    description: "Op afspraak",
  },
  areaServed: [
    { "@type": "City", name: "Tilburg" },
    { "@type": "AdministrativeArea", name: "Reeshof" },
    { "@type": "City", name: "Berkel-Enschot" },
  ],
  founder: {
    "@type": "Person",
    name: "Eva Mulder",
    jobTitle: "Relatietherapeut",
    knowsAbout: ["IBCT", "Integrative Behavioral Couple Therapy", "Relatietherapie"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Relatietherapie",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "IBCT relatiesessie",
          description:
            "Integrative Behavioral Couple Therapy sessie aan huis in Tilburg en omgeving (90 minuten).",
        },
        price: "150",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "APK voor Relaties",
          description: "Preventieve relatie-check-up (3 sessies).",
        },
        price: "325",
        priceCurrency: "EUR",
      },
    ],
  },
  sameAs: ["https://relatieguide.nl"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
