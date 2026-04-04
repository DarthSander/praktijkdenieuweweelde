"use client";

import { useEffect, useRef, useState } from "react";

export default function QuoteBanner() {
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
    <section ref={ref} className="bg-[#EDE6DD] py-14 md:py-20">
      <div
        className="max-w-3xl mx-auto px-6 text-center"
        data-aos="fade-up"
      >
        <div className="w-12 h-[1px] bg-[#D4B5B1] mx-auto mb-6" />
        <blockquote className="font-[family-name:var(--font-playfair)] italic text-[#6B6866] text-lg md:text-2xl leading-relaxed relative">
          <span
            className="quote-mark-animated absolute -top-4 -left-2 md:-left-6 font-serif"
            style={{ animationDelay: visible ? "0.2s" : "99s", color: "#B0ADAB" }}
          >
            &ldquo;
          </span>
          <span className={`text-highlight ${visible ? "animate" : ""}`}>
            Intimiteit ontstaat wanneer twee mensen de moed vinden
          </span>{" "}
          om hun verdedigingsmechanismen te laten zakken, zonder te verwachten dat de
          ander perfect opvangt.
          <span
            className="quote-mark-animated absolute -bottom-8 -right-2 md:-right-6 font-serif"
            style={{ animationDelay: visible ? "0.5s" : "99s", color: "#C4A4A0" }}
          >
            &rdquo;
          </span>
        </blockquote>
        <div className="w-12 h-[1px] bg-[#D4B5B1] mx-auto mt-6" />
      </div>
    </section>
  );
}
