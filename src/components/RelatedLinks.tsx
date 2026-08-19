import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLandingBySlug } from "@/lib/landing-pages";
import { getPostBySlug } from "@/lib/blog-posts";

type Props = {
  heading?: string;
  intro?: string;
  /** Slugs uit landing-pages.ts */
  landings?: string[];
  /** Slugs uit blog-posts.ts */
  posts?: string[];
  /** Achtergrondkleur van de sectie, zodat hij aansluit op de sectie ervoor. */
  background?: "white" | "beige";
};

type Item = { href: string; title: string; text: string };

export default function RelatedLinks({
  heading = "Lees verder",
  intro,
  landings = [],
  posts = [],
  background = "beige",
}: Props) {
  const items: Item[] = [
    ...landings.flatMap((slug) => {
      const page = getLandingBySlug(slug);
      if (!page) return [];
      return [{ href: `/${page.slug}`, title: page.title, text: page.description }];
    }),
    ...posts.flatMap((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return [];
      return [{ href: `/blog/${post.slug}`, title: post.title, text: post.excerpt }];
    }),
  ];

  if (items.length === 0) return null;

  const sectionBg = background === "white" ? "bg-white" : "bg-[#F5F0EB]";
  const cardBg = background === "white" ? "bg-[#F5F0EB]" : "bg-white";

  return (
    <section className={`section-padding ${sectionBg}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">
            {heading}
          </h2>
          {intro && (
            <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {intro}
            </p>
          )}
        </div>

        <ul className="grid md:grid-cols-2 gap-5">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`group block h-full ${cardBg} rounded-2xl p-6 md:p-7 card-hover`}
              >
                <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-2 group-hover:text-[#946B66] transition">
                  {item.title}
                </h3>
                <p className="text-[#5E524F] text-sm md:text-base leading-relaxed mb-3">
                  {item.text}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[#946B66] text-sm font-semibold">
                  Lees meer
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
