import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Props = {
  kicker: string;
  h1: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  anchorId?: string;
};

export default function LandingHero({
  kicker,
  h1,
  subtitle,
  image,
  imageAlt,
  anchorId = "inhoud",
}: Props) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0EB]/75 via-[#F5F0EB]/50 to-[#F5F0EB]/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9CFC3]/25 via-transparent to-[#C4A4A0]/15" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20 pb-16">
        <p className="text-[#C4A4A0] font-semibold uppercase tracking-[0.2em] text-sm mb-6">
          {kicker}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] leading-tight mb-6">
          {h1}
        </h1>
        <p className="text-[#5E524F] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/#contact"
            className="btn-secondary inline-block px-8 py-4 rounded-full text-base font-semibold"
          >
            Plan een kennismaking
          </Link>
          <Link
            href={`#${anchorId}`}
            className="text-[#946B66] text-base font-semibold hover:text-[#6B6866] transition inline-flex items-center gap-1"
          >
            Meer weten
            <ChevronDown className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
