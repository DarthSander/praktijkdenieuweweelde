"use client";

import { useEffect, useRef, useState } from "react";

// Deterministic particle data to avoid hydration mismatch
const PARTICLES = [
  { id: 0, x: 12, y: 8, size: 4, duration: 9, delay: -2 },
  { id: 1, x: 85, y: 15, size: 6, duration: 12, delay: -7 },
  { id: 2, x: 45, y: 22, size: 3, duration: 8, delay: -4 },
  { id: 3, x: 72, y: 38, size: 5, duration: 11, delay: -1 },
  { id: 4, x: 28, y: 55, size: 7, duration: 10, delay: -6 },
  { id: 5, x: 91, y: 42, size: 4, duration: 13, delay: -3 },
  { id: 6, x: 8, y: 68, size: 5, duration: 9, delay: -8 },
  { id: 7, x: 55, y: 75, size: 3, duration: 11, delay: -5 },
  { id: 8, x: 38, y: 88, size: 6, duration: 8, delay: -2 },
  { id: 9, x: 65, y: 12, size: 4, duration: 12, delay: -9 },
  { id: 10, x: 18, y: 35, size: 5, duration: 10, delay: -4 },
  { id: 11, x: 78, y: 62, size: 3, duration: 7, delay: -1 },
  { id: 12, x: 50, y: 48, size: 6, duration: 13, delay: -6 },
  { id: 13, x: 95, y: 82, size: 4, duration: 9, delay: -3 },
  { id: 14, x: 32, y: 92, size: 5, duration: 11, delay: -7 },
  { id: 15, x: 5, y: 45, size: 4, duration: 8, delay: -5 },
  { id: 16, x: 82, y: 28, size: 3, duration: 10, delay: -2 },
  { id: 17, x: 60, y: 58, size: 5, duration: 12, delay: -8 },
];

function getColor(id: number) {
  if (id % 3 === 0) return "#C4A4A0";
  if (id % 3 === 1) return "#B0ADAB";
  return "#D9CFC3";
}

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: getColor(p.id),
            opacity: 0.15,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
            transform: `translate(${mouseOffset.x * (p.id % 3 === 0 ? 1 : 0.5)}px, ${mouseOffset.y * (p.id % 3 === 0 ? 1 : 0.5)}px)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
