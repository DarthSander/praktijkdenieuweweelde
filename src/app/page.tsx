import AOSProvider from "@/components/AOSProvider";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingParticles from "@/components/FloatingParticles";
import CookieBanner from "@/components/CookieBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuoteBanner from "@/components/QuoteBanner";
import OverMij from "@/components/OverMij";
import IBCT from "@/components/IBCT";
import Statistieken from "@/components/Statistieken";
import Werkwijze from "@/components/Werkwijze";
import QuoteSection from "@/components/QuoteSection";
import Tarieven from "@/components/Tarieven";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AOSProvider>
      <ScrollProgress />
      <FloatingParticles />
      <Navbar />
      <Hero />
      <QuoteBanner />
      <OverMij />
      <IBCT />
      <Statistieken />
      <Werkwijze />
      <QuoteSection />
      <Tarieven />
      <Contact />
      <Footer />
      <CookieBanner />
    </AOSProvider>
  );
}
