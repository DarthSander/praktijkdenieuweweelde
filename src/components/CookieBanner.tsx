"use client";

import { useEffect, useState } from "react";
import CookieSettings from "./CookieSettings";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible && !settingsOpen) return null;

  return (
    <>
      {settingsOpen && (
        <CookieSettings
          onClose={() => setSettingsOpen(false)}
          onAccept={() => { accept(); setSettingsOpen(false); }}
        />
      )}

      {visible && !settingsOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#EDE6DD] p-5 md:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 text-sm text-[#5E524F] leading-relaxed">
              <span className="font-semibold text-[#6B6866]">Wij gebruiken cookies.</span>{" "}
              Deze website gebruikt alleen functionele cookies die noodzakelijk zijn voor een goede werking. Er worden geen tracking- of marketingcookies gebruikt.{" "}
              <a href="/privacyverklaring" className="text-[#946B66] underline underline-offset-2 hover:text-[#6B6866] transition">
                Meer informatie
              </a>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setSettingsOpen(true)}
                className="px-4 py-2 rounded-full text-sm font-semibold border-2 border-[#D4B5B1] text-[#946B66] hover:bg-[#F5F0EB] transition"
              >
                Instellingen
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 rounded-full text-sm font-semibold bg-[#946B66] text-white hover:bg-[#7A5955] transition"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
