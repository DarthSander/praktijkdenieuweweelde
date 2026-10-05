"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, BellOff, BellRing, ChartColumn, ClipboardList, LogOut } from "lucide-react";

type PushState = "loading" | "unsupported" | "denied" | "off" | "on" | "busy";

const TABS = [
  { href: "/admin/analyse", label: "Analyse", icon: ChartColumn },
  { href: "/admin/intake", label: "Intake", icon: ClipboardList },
];

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

async function getRegistration(): Promise<ServiceWorkerRegistration> {
  const existing = await navigator.serviceWorker.getRegistration("/admin/");
  if (existing) return existing;
  await navigator.serviceWorker.register("/sw.js", { scope: "/admin/" });
  return navigator.serviceWorker.ready;
}

export default function AdminNav({ vapidPublicKey }: { vapidPublicKey: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [push, setPush] = useState<PushState>("loading");
  const [message, setMessage] = useState("");

  const refreshPushState = useCallback(async () => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window)
    ) {
      setPush("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setPush("denied");
      return;
    }
    try {
      const reg = await getRegistration();
      const sub = await reg.pushManager.getSubscription();
      setPush(sub ? "on" : "off");
    } catch {
      setPush("unsupported");
    }
  }, []);

  useEffect(() => {
    refreshPushState();
  }, [refreshPushState]);

  async function enablePush() {
    setMessage("");
    if (!vapidPublicKey) {
      setMessage("VAPID-sleutel ontbreekt op de server.");
      return;
    }
    setPush("busy");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setPush(permission === "denied" ? "denied" : "off");
        return;
      }
      const reg = await getRegistration();
      const sub =
        (await reg.pushManager.getSubscription()) ??
        (await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        }));
      const res = await fetch("/api/admin/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      if (!res.ok) throw new Error("Opslaan mislukt");
      setPush("on");
      setMessage("Meldingen staan aan op dit apparaat.");
    } catch (err) {
      console.error(err);
      setMessage("Aanzetten mislukt.");
      await refreshPushState();
    }
  }

  async function disablePush() {
    setMessage("");
    setPush("busy");
    try {
      const reg = await getRegistration();
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/admin/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setPush("off");
      setMessage("Meldingen staan uit op dit apparaat.");
    } catch {
      setMessage("Uitzetten mislukt.");
      await refreshPushState();
    }
  }

  async function sendTest() {
    setMessage("");
    try {
      const res = await fetch("/api/admin/push/test", { method: "POST" });
      const data = (await res.json()) as { sent?: number; error?: string };
      setMessage(res.ok ? `Testmelding verstuurd naar ${data.sent ?? 0} apparaat/apparaten.` : data.error ?? "Mislukt.");
    } catch {
      setMessage("Testmelding mislukt.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
    router.refresh();
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/15 hover:bg-white/25 transition disabled:opacity-50";

  return (
    <div className="border-t border-white/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 py-2">
        <nav className="flex gap-1">
          {TABS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition ${
                  active ? "bg-white text-[#946B66] font-semibold" : "text-white/85 hover:bg-white/15"
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-wrap items-center gap-2">
          {push === "on" && (
            <>
              <button type="button" onClick={sendTest} className={buttonClass}>
                <BellRing className="w-3.5 h-3.5" aria-hidden />
                Test
              </button>
              <button type="button" onClick={disablePush} className={buttonClass}>
                <BellOff className="w-3.5 h-3.5" aria-hidden />
                Meldingen uit
              </button>
            </>
          )}
          {(push === "off" || push === "busy") && (
            <button type="button" onClick={enablePush} disabled={push === "busy"} className={buttonClass}>
              <Bell className="w-3.5 h-3.5" aria-hidden />
              {push === "busy" ? "Bezig…" : "Meldingen aan"}
            </button>
          )}
          {push === "denied" && (
            <span className="text-xs text-white/70">Meldingen geblokkeerd in de browser</span>
          )}
          {push === "unsupported" && (
            <span className="text-xs text-white/70">Meldingen niet ondersteund</span>
          )}
          <button type="button" onClick={logout} className={buttonClass}>
            <LogOut className="w-3.5 h-3.5" aria-hidden />
            Uitloggen
          </button>
        </div>
      </div>
      {message && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 text-xs text-white/80">{message}</div>
      )}
    </div>
  );
}
