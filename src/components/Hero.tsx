"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

function WordReveal({ text, baseDelay, className }: { text: string; baseDelay: number; className: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            filter: visible ? "blur(0)" : "blur(4px)",
            transition: `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${baseDelay + i * 0.1}s`,
            marginRight: "0.3em",
          }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* === Botanical background image with parallax === */}
      <div
        className="absolute inset-0 hero-parallax"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="/pampas-water.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110"
        />
        {/* Warm gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0EB]/80 via-[#F5F0EB]/50 to-[#F5F0EB]/85" />
        {/* Subtle color wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9CFC3]/30 via-transparent to-[#C4A4A0]/15" />
      </div>

      {/* === Flowing wave overlay for depth === */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[40%] z-[2]"
        viewBox="0 0 1440 540"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,260 C180,200 360,300 560,240 C760,180 920,280 1120,220 C1320,160 1400,260 1440,220 L1440,540 L0,540 Z"
          fill="#F5F0EB"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M0,260 C180,200 360,300 560,240 C760,180 920,280 1120,220 C1320,160 1400,260 1440,220 L1440,540 L0,540 Z;
              M0,240 C160,280 340,210 540,270 C740,210 900,290 1100,240 C1300,190 1380,280 1440,240 L1440,540 L0,540 Z;
              M0,260 C180,200 360,300 560,240 C760,180 920,280 1120,220 C1320,160 1400,260 1440,220 L1440,540 L0,540 Z
            "
          />
        </path>
        <path
          d="M0,340 C200,290 400,380 640,320 C880,260 1080,360 1280,300 C1380,270 1420,340 1440,310 L1440,540 L0,540 Z"
          fill="#F5F0EB"
          opacity="0.85"
        >
          <animate
            attributeName="d"
            dur="18s"
            repeatCount="indefinite"
            values="
              M0,340 C200,290 400,380 640,320 C880,260 1080,360 1280,300 C1380,270 1420,340 1440,310 L1440,540 L0,540 Z;
              M0,320 C180,360 380,290 620,350 C860,290 1060,370 1260,320 C1360,290 1400,350 1440,330 L1440,540 L0,540 Z;
              M0,340 C200,290 400,380 640,320 C880,260 1080,360 1280,300 C1380,270 1420,340 1440,310 L1440,540 L0,540 Z
            "
          />
        </path>
      </svg>

      {/* === Subtle accent glow spots === */}
      <div
        className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full opacity-20 z-[1]"
        style={{ background: "radial-gradient(circle, rgba(196,164,160,0.5) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-[30%] right-[10%] w-[250px] h-[250px] rounded-full opacity-20 z-[1]"
        style={{ background: "radial-gradient(circle, rgba(176,173,171,0.5) 0%, transparent 65%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20">
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-[#C4A4A0] font-semibold uppercase tracking-[0.2em] text-sm mb-6"
        >
          IBCT Relatietherapie in Tilburg
        </p>

        <WordReveal
          text="Herstel de verbinding in"
          baseDelay={0.3}
          className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] leading-tight mb-2"
        />
        <WordReveal
          text="vertrouwde sfeer"
          baseDelay={0.7}
          className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] italic text-[#6B6866] leading-tight mb-8"
        />

        <p
          data-aos="fade-up"
          data-aos-delay="600"
          className="text-[#5E524F] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Samen werken aan acceptatie, verandering en diepere intimiteit.
          Professionele begeleiding gewoon bij jullie thuis op de bank.
        </p>

        <div data-aos="fade-up" data-aos-delay="800">
          <MagneticButton className="inline-block">
            <a
              href="#contact"
              className="btn-secondary inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              Naar het contactformulier
            </a>
          </MagneticButton>
        </div>
      </div>

      <a
        href="#over-mij"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-down"
      >
        <ChevronDown className="w-8 h-8 text-[#C4A4A0]/60" />
      </a>
    </section>
  );
}
