"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

type Props = { onNavigate?: () => void };

export default function ChatContactCard({ onNavigate }: Props) {
  return (
    <Link
      href="/#contact"
      onClick={onNavigate}
      className="group block bg-white rounded-xl overflow-hidden border border-[#E8D5D2] hover:border-[#C4A4A0] transition-all duration-300 my-2"
    >
      <div className="flex gap-3 p-3">
        <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-[#F5F0EB] flex items-center justify-center text-[#946B66]">
          <Mail className="w-8 h-8" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-[#946B66] mb-1">
            Contact
          </div>
          <h4 className="text-sm font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] leading-snug line-clamp-2 mb-1 group-hover:text-[#946B66] transition">
            Neem contact op met Eva
          </h4>
          <div className="flex items-center gap-1 text-[11px] text-[#946B66] font-semibold">
            Naar contactformulier <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
