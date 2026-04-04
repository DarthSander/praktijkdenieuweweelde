"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LotusIcon from "./LotusIcon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Over mij", href: "#over-mij" },
    { label: "IBCT Therapie", href: "#ibct" },
    { label: "Werkwijze", href: "#werkwijze" },
    { label: "Tarieven", href: "#tarieven" },
  ];

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <nav
      id="navbar"
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#946B66]/95 backdrop-blur-md shadow-md"
          : "bg-[#946B66]/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center gap-2 text-white font-[family-name:var(--font-playfair)] text-lg font-semibold">
            <LotusIcon className="w-6 h-6 text-white/85 animate-lotus-breath" />
            Relatiepraktijk de Nieuwe Weelde
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-white/85 hover:text-white transition text-sm tracking-wide">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="bg-white/90 text-[#946B66] px-5 py-2 rounded-full text-sm font-semibold hover:bg-white transition">
              Maak een afspraak
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white" aria-label="Menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="pb-4 border-t border-white/20 mt-2 pt-4 md:hidden">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={handleLinkClick} className="block py-3 text-white/85 hover:text-white text-sm">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={handleLinkClick} className="block mt-2 text-center bg-white/90 text-[#946B66] px-5 py-2.5 rounded-full text-sm font-semibold">
              Maak een afspraak
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
