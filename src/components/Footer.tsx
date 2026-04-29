"use client";

import Link from "next/link";
import WavesBackground from "./WavesBackground";

export default function Footer() {
  return (
    <footer className="relative text-white/80 py-16 overflow-hidden">
      <WavesBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#F5F0EB] mb-4">
            Relatiepraktijk de Nieuwe Weelde
          </h3>
          <p className="text-white/55 text-base">
            Samen groeien, liefhebben en leven. Relatietherapie aan huis in Tilburg.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-12 text-center sm:text-left max-w-3xl mx-auto">
          <div>
            <h4 className="text-[#F5F0EB] font-semibold text-sm uppercase tracking-wider mb-4">
              Werkgebied
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/relatietherapie-tilburg" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Relatietherapie Tilburg</Link></li>
              <li><Link href="/relatietherapie-reeshof" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Relatietherapie Reeshof</Link></li>
              <li><Link href="/relatietherapie-berkel-enschot" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Relatietherapie Berkel-Enschot</Link></li>
              <li><Link href="/relatietherapie-aan-huis" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Relatietherapie aan huis</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#F5F0EB] font-semibold text-sm uppercase tracking-wider mb-4">
              Relatietherapie
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/ibct-relatietherapie" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">IBCT relatietherapie</Link></li>
              <li><Link href="/relatietherapie-jonge-ouders" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Voor jonge ouders</Link></li>
              <li><Link href="/blog" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#F5F0EB] font-semibold text-sm uppercase tracking-wider mb-4">
              Info
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/privacyverklaring" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Privacyverklaring</Link></li>
              <li><Link href="/algemene-voorwaarden" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Algemene voorwaarden</Link></li>
              <li><Link href="/klachtenregeling" className="text-white/55 hover:text-[#E8D5D2] transition text-sm">Klachtenregeling</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/30 text-xs mb-6">
            Kasteel Nijenrodestraat 82 &nbsp;&middot;&nbsp; 5037 TH Tilburg
          </p>
          <div className="border-t border-white/10 pt-8 text-white/30 text-sm">
            &copy; 2026 Relatiepraktijk de Nieuwe Weelde &nbsp;&middot;&nbsp; KVK 72945699 &nbsp;&middot;&nbsp; BTW NL004848689B38
          </div>
        </div>
      </div>
    </footer>
  );
}
