import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { landingPages } from "@/lib/landing-pages";

const BASE_URL = "https://www.praktijkdenieuweweelde.nl";

// Stable reference dates. Bump only when the underlying content materially
// changes so crawlers don't refetch unchanged pages every deploy.
const LANDING_LAST_UPDATED = new Date("2026-04-20");
const LEGAL_LAST_UPDATED = new Date("2026-04-20");
const SITE_LAUNCH_DATE = new Date("2026-04-20");

// Core service pages rank higher than regional/niche variants.
const LANDING_PRIORITY: Record<string, number> = {
  "relatietherapie-tilburg": 0.9,
  "relatietherapie-aan-huis": 0.9,
  "ibct-relatietherapie": 0.9,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = blogPosts.reduce<Date>((latest, post) => {
    const d = new Date(post.date);
    return d > latest ? d : latest;
  }, SITE_LAUNCH_DATE);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${BASE_URL}/pampas-water.jpg`],
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacyverklaring`,
      lastModified: LEGAL_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/algemene-voorwaarden`,
      lastModified: LEGAL_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/klachtenregeling`,
      lastModified: LEGAL_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const landing: MetadataRoute.Sitemap = landingPages.map((p) => ({
    url: `${BASE_URL}/${p.slug}`,
    lastModified: LANDING_LAST_UPDATED,
    changeFrequency: "monthly",
    priority: LANDING_PRIORITY[p.slug] ?? 0.8,
    images: [`${BASE_URL}${p.image}`],
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
    images: [`${BASE_URL}${post.image}`],
  }));

  return [...staticPages, ...landing, ...blogPages];
}
