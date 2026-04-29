"use client";

interface CookieSettingsProps {
  onClose: () => void;
  onAccept: () => void;
}

export default function CookieSettings({ onClose, onAccept }: CookieSettingsProps) {
  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8">
        <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-1">
          Cookieinstellingen
        </h2>
        <p className="text-sm text-[#B0ADAB] mb-6">
          Beheer je cookievoorkeuren voor deze website.
        </p>

        <div className="space-y-4">
          {/* Noodzakelijk */}
          <div className="flex items-start justify-between gap-4 p-4 bg-[#F5F0EB] rounded-xl">
            <div>
              <p className="font-semibold text-sm text-[#6B6866] mb-1">Noodzakelijke cookies</p>
              <p className="text-xs text-[#5E524F] leading-relaxed">
                Vereist voor de basiswerking van de website, zoals het opslaan van je cookievoorkeuren. Kunnen niet worden uitgeschakeld.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-11 h-6 bg-[#946B66] rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-70">
                <div className="w-4 h-4 bg-white rounded-full shadow" />
              </div>
            </div>
          </div>

          {/* Analytisch */}
          <div className="flex items-start justify-between gap-4 p-4 bg-[#F5F0EB] rounded-xl opacity-60">
            <div>
              <p className="font-semibold text-sm text-[#6B6866] mb-1">Analytische cookies</p>
              <p className="text-xs text-[#5E524F] leading-relaxed">
                Wij maken momenteel geen gebruik van analytische cookies.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-11 h-6 bg-[#EDE6DD] rounded-full flex items-center justify-start px-1 cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full shadow" />
              </div>
            </div>
          </div>

          {/* Marketing */}
          <div className="flex items-start justify-between gap-4 p-4 bg-[#F5F0EB] rounded-xl opacity-60">
            <div>
              <p className="font-semibold text-sm text-[#6B6866] mb-1">Marketingcookies</p>
              <p className="text-xs text-[#5E524F] leading-relaxed">
                Wij maken momenteel geen gebruik van marketingcookies.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-11 h-6 bg-[#EDE6DD] rounded-full flex items-center justify-start px-1 cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full shadow" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-sm font-semibold border-2 border-[#D4B5B1] text-[#946B66] hover:bg-[#F5F0EB] transition"
          >
            Annuleren
          </button>
          <button
            onClick={onAccept}
            className="px-5 py-2 rounded-full text-sm font-semibold bg-[#946B66] text-white hover:bg-[#7A5955] transition"
          >
            Opslaan &amp; sluiten
          </button>
        </div>

        <p className="mt-4 text-xs text-[#B0ADAB] text-center">
          Meer informatie in onze{" "}
          <a href="/privacyverklaring" className="underline underline-offset-2 hover:text-[#946B66] transition">
            privacyverklaring
          </a>
        </p>
      </div>
    </div>
  );
}
