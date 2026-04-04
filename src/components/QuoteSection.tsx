"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import WavesBackground from "./WavesBackground";

export default function QuoteSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="quote-section"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <WavesBackground />
      <div
        className="relative z-10 max-w-3xl mx-auto px-4 text-center"
        data-aos="zoom-in"
      >
        <Heart className="w-8 h-8 text-[#D9CFC3] fill-[#D9CFC3] mx-auto mb-6" />
        <blockquote className="text-xl md:text-2xl font-[family-name:var(--font-playfair)] italic text-white/90 leading-relaxed relative">
          <span
            className="quote-mark-animated absolute -top-4 -left-2 md:-left-6 font-serif"
            style={{ animationDelay: visible ? "0.3s" : "99s", color: "#D4B5B1" }}
          >
            &ldquo;
          </span>
          De grootste daad van moed in een relatie is de bereidheid om
          kwetsbaar te zijn.
          <span
            className="quote-mark-animated absolute -bottom-8 -right-2 md:-right-6 font-serif"
            style={{ animationDelay: visible ? "0.6s" : "99s", color: "#C9C6C4" }}
          >
            &rdquo;
          </span>
        </blockquote>
      </div>
    </section>
  );
}
