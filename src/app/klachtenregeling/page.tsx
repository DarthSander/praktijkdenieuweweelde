import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Klachtenregeling",
  description:
    "Klachtenregeling van Relatiepraktijk de Nieuwe Weelde conform de Wkkgz. Aangesloten bij Erisietsmisgegaan.",
  alternates: {
    canonical: "https://www.praktijkdenieuweweelde.nl/klachtenregeling",
  },
  robots: { index: true, follow: true },
};

export default function Klachtenregeling() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5F0EB] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#946B66] hover:text-[#6B6866] text-sm mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-2">
            Klachtenregeling
          </h1>
          <p className="text-[#B0ADAB] text-sm mb-12">
            Conform de Wet kwaliteit, klachten en geschillen zorg (Wkkgz)
          </p>

          <div className="prose prose-sm max-w-none text-[#5E524F] space-y-10">

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">
                Niet tevreden?
              </h2>
              <p>
                Ik doe mijn uiterste best om goede zorg te bieden. Toch kan het gebeuren dat je niet tevreden bent over de behandeling, de bejegening of een andere aspect van de dienstverlening. Je hebt als cliënt het recht een klacht in te dienen. Ik neem elke klacht serieus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">
                Stap 1 — Bespreek het met mij
              </h2>
              <p>
                Ik stel het op prijs als je een klacht eerst rechtstreeks met mij bespreekt. Vaak kan een misverstand of onvrede in een open gesprek worden opgelost. Je kunt mij bereiken via:
              </p>
              <div className="mt-4 bg-white rounded-xl p-5 text-sm space-y-1">
                <p><strong>E-mail:</strong>{" "}
                  <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-[#946B66] underline underline-offset-2">
                    Info@praktijkdenieuweweelde.nl
                  </a>
                </p>
                <p><strong>Telefoon:</strong> 06 - 10096923</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">
                Stap 2 — Onafhankelijke klachtenbehandeling via Erisietsmisgegaan
              </h2>
              <p>
                Kom je er samen met mij niet uit, of geef je er de voorkeur aan je klacht onafhankelijk te laten behandelen? Dan kun je terecht bij <strong>Erisietsmisgegaan</strong>, de erkende klachten- en geschilleninstantie waarbij Relatiepraktijk de Nieuwe Weelde is aangesloten conform de Wkkgz.
              </p>
              <div className="mt-4 bg-white rounded-xl p-5 text-sm space-y-2">
                <p><strong>Organisatie:</strong> Erisietsmisgegaan</p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://erisietsmisgegaan.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#946B66] underline underline-offset-2"
                  >
                    www.erisietsmisgegaan.nl
                  </a>
                </p>
              </div>
              <p className="mt-4 text-sm">
                Erisietsmisgegaan behandelt klachten onafhankelijk en kosteloos voor de cliënt. Je kunt onvrede melden via de knop hieronder of via hun website.
              </p>
              <a
                href="https://erisietsmisgegaan.nl/onvrede-melden/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block"
                aria-label="Onvrede melden bij Erisietsmisgegaan"
              >
                <Image
                  src="https://erisietsmisgegaan.nl/wp-content/uploads/2018/10/erisietsmisgegaan-onvredemelden1.png"
                  alt="Onvrede melden"
                  width={200}
                  height={60}
                  unoptimized
                  style={{ width: "auto", height: "auto", maxWidth: "100%" }}
                />
              </a>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">
                Geschil
              </h2>
              <p className="text-sm">
                Heeft je klacht betrekking op een geschil — bijvoorbeeld over een factuur of vergoeding — dan kun je dit eveneens voorleggen aan Erisietsmisgegaan. De geschillencommissie kan een bindende uitspraak doen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">
                Vertrouwelijkheid
              </h2>
              <p className="text-sm">
                Je klacht wordt vertrouwelijk behandeld. Gegevens worden alleen gedeeld voor zover noodzakelijk voor de klachtafhandeling.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
