"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type HeroCarouselProps = {
  images: { src: string; alt: string }[];
};

const DISPLAY_MS = 6000;
const FADE_MS = 2000;
const CYCLE_MS = DISPLAY_MS + FADE_MS;

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, CYCLE_MS);

    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt=""
          fill
          preload={i === 0}
          sizes="100vw"
          className={`object-cover scale-110 absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
