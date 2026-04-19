import Link from "next/link";

type Props = {
  title?: string;
  text?: string;
  buttonLabel?: string;
};

export default function LandingCTA({
  title = "Klaar voor een eerste gesprek?",
  text = "Het eerste kennismakingsgesprek is gratis en vrijblijvend, bij jullie thuis. We verkennen samen jullie situatie en of IBCT passend is.",
  buttonLabel = "Plan een kennismaking",
}: Props) {
  return (
    <section className="section-padding bg-[#F5F0EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#946B66] p-10 md:p-14 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold !text-white mb-4">
            {title}
          </h2>
          <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {text}
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-white text-[#946B66] px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#F5F0EB] transition"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
