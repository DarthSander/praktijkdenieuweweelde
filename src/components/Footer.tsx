"use client";

import WavesBackground from "./WavesBackground";

export default function Footer() {
  return (
    <footer className="relative text-white/80 py-16 overflow-hidden">
      <WavesBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#F5F0EB] mb-4">
          Relatiepraktijk de Nieuwe Weelde
        </h3>
        <p className="text-white/55 mb-10 text-base">
          Samen groeien, liefhebben en leven. Relatietherapie aan huis in Tilburg.
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          <a href="/privacyverklaring" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Privacyverklaring</a>
          <a href="#" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Algemene Voorwaarden</a>
          <a href="/klachtenregeling" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Klachtenregeling</a>
        </div>
        <p className="text-white/30 text-xs mb-6">
          Kasteelnijenrodestraat 82 &nbsp;&middot;&nbsp; 5037 TH Tilburg
        </p>
        <div className="border-t border-white/10 pt-8 text-white/30 text-sm">
          &copy; 2026 Relatiepraktijk de Nieuwe Weelde &nbsp;&middot;&nbsp; KVK 72945699 &nbsp;&middot;&nbsp; BTW NL004848689B38
        </div>
      </div>
    </footer>
  );
}
