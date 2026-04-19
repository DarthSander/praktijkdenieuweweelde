import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog-posts";

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-accent-hover h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#946B66] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] leading-snug mb-3 group-hover:text-[#946B66] transition">
          {post.title}
        </h3>
        <p className="text-[#5E524F] text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-1.5 text-[#B0ADAB] text-xs">
          <Clock className="w-3.5 h-3.5" />
          {post.readingTime}
        </div>
      </div>
    </Link>
  );
}
