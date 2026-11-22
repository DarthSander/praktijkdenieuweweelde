"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

/**
 * De navigatie zweeft boven de pagina in drie losse elementen: de naam met het
 * logo, het menu en de knop. Ze zijn doorzichtig met een waas erachter, zodat
 * de foto eronder zichtbaar blijft. Bij het scrollen worden ze dekkender.
 *
 * Het logo is hetzelfde bestand als de favicon en de kop van de formulieren.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Eigen pagina's eerst: wat hier staat, ziet een zoekmachine als de
  // belangrijkste bestemmingen van de site. Tarieven en Over mij blijven
  // verwijzingen naar de homepage, want die pagina's bestaan niet apart.
  const links = [
    { label: "Relatietherapie Tilburg", href: "/relatietherapie-tilburg" },
    { label: "Aan huis", href: "/relatietherapie-aan-huis" },
    { label: "IBCT", href: "/ibct-relatietherapie" },
    { label: "Tarieven", href: "/#tarieven" },
    { label: "Blog", href: "/blog" },
    { label: "Over mij", href: "/#over-mij" },
  ];

  const handleLinkClick = () => setMobileOpen(false);

  const paneel = `backdrop-blur-xl border border-[#946B66]/15 transition-colors duration-300 ${
    scrolled ? "bg-white/92 shadow-sm" : "bg-white/80"
  }`;

  return (
    <nav id="navbar" className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            onClick={handleLinkClick}
            aria-label="Naar de homepage"
            className={`flex items-center gap-2.5 min-w-0 pl-2 pr-4 sm:pr-5 py-2 rounded-[14px_28px_14px_28px] ${paneel}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon-512.png"
              alt=""
              width={36}
              height={36}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0"
            />
            <span className="font-[family-name:var(--font-playfair)] leading-tight text-[#5E524F] text-sm sm:text-base min-w-0">
              <span className="block truncate">Relatiepraktijk</span>
              <em className="block truncate text-[#946B66]">de Nieuwe Weelde</em>
            </span>
          </Link>

          <div className={`hidden xl:flex items-center gap-1 p-1.5 rounded-[28px_10px_28px_10px] ${paneel}`}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-full text-sm text-[#5E524F] hover:bg-[#F5F0EB] transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#946B66] text-white px-4 lg:px-5 py-2.5 rounded-[12px_22px_12px_22px] text-sm font-semibold shadow-[0_12px_24px_-14px_rgba(94,82,79,.7)] hover:bg-[#7A5955] transition"
            >
              Maak een afspraak
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`xl:hidden p-2.5 rounded-[12px_22px_12px_22px] text-[#5E524F] ${paneel}`}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className={`xl:hidden mt-2 p-2 rounded-[22px_10px_22px_10px] ${paneel} bg-white/95`}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-2xl text-sm text-[#5E524F] hover:bg-[#F5F0EB] transition"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={handleLinkClick}
              className="mt-1 flex items-center justify-center gap-2 bg-[#946B66] text-white px-5 py-3 rounded-[12px_22px_12px_22px] text-sm font-semibold"
            >
              Maak een afspraak
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
