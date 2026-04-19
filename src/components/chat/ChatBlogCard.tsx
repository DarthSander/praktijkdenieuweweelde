"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPostBySlug } from "@/lib/blog-posts";

type Props = { slug: string };

export default function ChatBlogCard({ slug }: Props) {
  const post = getPostBySlug(slug);
  if (!post) return null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-[#E8D5D2] hover:border-[#C4A4A0] transition-all duration-300 my-2"
    >
      <div className="flex gap-3 p-3">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-[#946B66] mb-1">
            {post.category}
          </div>
          <h4 className="text-sm font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] leading-snug line-clamp-2 mb-1 group-hover:text-[#946B66] transition">
            {post.title}
          </h4>
          <div className="flex items-center gap-1 text-[11px] text-[#946B66] font-semibold">
            Lees artikel <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
