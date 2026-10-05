"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Ververst de server-gegevens elke `seconds` seconden zolang het tabblad zichtbaar is. */
export default function AutoRefresh({ seconds = 15 }: { seconds?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, seconds * 1000);
    const onVisible = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [router, seconds]);

  return null;
}
