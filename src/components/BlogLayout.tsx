import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/lib/blog-posts";
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema";

type Props = {
  post: BlogPost;
  related: BlogPost[];
  children: React.ReactNode;
};

export default function BlogLayout({ post, related, children }: Props) {
  const postUrl = `https://www.praktijkdenieuweweelde.nl/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    headline: post.title,
    description: post.description,
    image: `https://www.praktijkdenieuweweelde.nl${post.image}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "nl-NL",
    author: {
      "@type": "Person",
      name: "Eva Mulder",
      url: "https://www.praktijkdenieuweweelde.nl",
    },
    publisher: {
      "@type": "Organization",
      name: "Relatiepraktijk de Nieuwe Weelde",
      logo: {
        "@type": "ImageObject",
        url: "https://www.praktijkdenieuweweelde.nl/icon-512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", item: "https://www.praktijkdenieuweweelde.nl" },
    { name: "Blog", item: "https://www.praktijkdenieuweweelde.nl/blog" },
    { name: post.title, item: postUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main className="bg-[#F5F0EB] pb-20">
        <div className="relative h-[50vh] min-h-[340px] w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0EB]/40 via-[#F5F0EB]/30 to-[#F5F0EB]" />
          <div className="absolute inset-0 flex items-end pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <nav
                aria-label="Kruimelpad"
                className="inline-flex items-center gap-1 text-[#5E524F] text-sm mb-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
              >
                <Link href="/" className="text-[#946B66] hover:text-[#6B6866] transition">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#C4A4A0]" aria-hidden="true" />
                <Link href="/blog" className="text-[#946B66] hover:text-[#6B6866] transition">
                  Blog
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#C4A4A0]" aria-hidden="true" />
                <span className="text-[#6B6866] truncate max-w-[12rem] sm:max-w-xs" aria-current="page">
                  {post.title}
                </span>
              </nav>
              <p className="text-[#C4A4A0] font-semibold uppercase tracking-[0.18em] text-xs mb-3">
                {post.category}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[#5E524F] text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#C4A4A0]" />
                  {post.dateLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C4A4A0]" />
                  {post.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="prose prose-lg max-w-none text-[#5E524F] blog-content">
            {children}
          </div>

          <div className="mt-16 rounded-2xl bg-[#946B66] p-8 md:p-10 text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold !text-white mb-3">
              Herkennen jullie iets in dit verhaal?
            </h2>
            <p className="text-white/85 text-base leading-relaxed mb-6">
              Een goed gesprek is vaak het begin van herstel. In een intakegesprek ontdekken jullie of IBCT bij jullie past, gewoon bij jullie thuis op de bank.
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-[#946B66] px-7 py-3 rounded-full font-semibold text-sm hover:bg-[#F5F0EB] transition"
            >
              Plan een intakegesprek
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-8 text-center">
              Lees ook
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <BlogCard key={rel.slug} post={rel} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
