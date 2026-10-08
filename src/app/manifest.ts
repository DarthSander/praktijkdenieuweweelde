import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Relatiepraktijk de Nieuwe Weelde",
    short_name: "Nieuwe Weelde",
    description:
      "IBCT relatietherapie aan huis in Tilburg door Eva Mulder. Wetenschappelijk onderbouwde relatiebegeleiding.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0EB",
    theme_color: "#946B66",
    lang: "nl",
    categories: ["health", "lifestyle"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Aparte maskable-iconen: Android snijdt het icoon bij tot de vorm van het
      // toestel, dus daar staat de bloem kleiner op het vlak (binnen de veilige zone).
      {
        src: "/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
