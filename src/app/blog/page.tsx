import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: { absolute: "Relatietherapie blog | Inzichten over ruzie, jaloezie & verbinding" },
  description:
    "Wetenschappelijk onderbouwde artikelen van Eva Mulder over ruzie, jaloezie, communicatie en verbinding. Professionele inzichten voor koppels die willen groeien. Tilburg.",
  alternates: {
    canonical: "https://www.praktijkdenieuweweelde.nl/blog",
  },
  openGraph: {
    title: "Relatietherapie blog | Inzichten over ruzie, jaloezie & verbinding",
    description:
      "Wetenschappelijk onderbouwde artikelen van Eva Mulder over ruzie, jaloezie, communicatie en verbinding. Professionele inzichten voor koppels die willen groeien. Tilburg.",
    url: "https://www.praktijkdenieuweweelde.nl/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5F0EB] pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#946B66] hover:text-[#6B6866] text-sm mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>

          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#C4A4A0] font-semibold uppercase tracking-[0.2em] text-sm mb-4">
              Blog
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-5">
              Inzichten over liefde, hechting en herstel
            </h1>
            <p className="text-[#5E524F] text-base md:text-lg leading-relaxed">
              Wetenschappelijk onderbouwde artikelen over relatietherapie, communicatie en het leven samen. Geschreven vanuit de IBCT-praktijk in Tilburg.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
