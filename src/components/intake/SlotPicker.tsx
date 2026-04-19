"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDayKey, formatDayLabel, formatTime } from "@/lib/availability";

type Slot = { id: string; starts_at: string; ends_at: string };

type Props = {
  selectedSlotId?: string;
  onSelect: (slot: Slot) => void;
};

export default function SlotPicker({ selectedSlotId, onSelect }: Props) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/availability");
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = (await res.json()) as { slots: Slot[] };
        if (cancel) return;
        setSlots(data.slots ?? []);
        if (data.slots?.[0]) setActiveDay(formatDayKey(data.slots[0].starts_at));
      } catch (e) {
        if (cancel) return;
        setError("Kon agenda niet laden. Probeer later opnieuw.");
        console.error(e);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const groupedByDay = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of slots) {
      const k = formatDayKey(s.starts_at);
      const arr = map.get(k) ?? [];
      arr.push(s);
      map.set(k, arr);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [slots]);

  if (loading) {
    return <div className="text-center py-10 text-[#5E524F] text-sm">Agenda laden…</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-500 text-sm">{error}</div>;
  }
  if (slots.length === 0) {
    return (
      <div className="text-center py-10 text-[#5E524F] text-sm">
        Op dit moment zijn er geen vrije momenten. Stuur Eva even een mail via{" "}
        <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-[#946B66] underline">
          Info@praktijkdenieuweweelde.nl
        </a>
        .
      </div>
    );
  }

  const activeSlots = groupedByDay.find(([k]) => k === activeDay)?.[1] ?? [];

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
        {groupedByDay.map(([key, daySlots]) => {
          const isActive = key === activeDay;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveDay(key)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#946B66] text-white"
                  : "bg-[#F5F0EB] text-[#5E524F] hover:bg-[#E8D5D2]"
              }`}
            >
              {formatDayLabel(daySlots[0].starts_at)}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {activeSlots.map((s) => {
          const active = s.id === selectedSlotId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s)}
              className={`px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                active
                  ? "border-[#946B66] bg-[#946B66] text-white"
                  : "border-[#E8D5D2] bg-white text-[#5E524F] hover:border-[#C4A4A0]"
              }`}
            >
              {formatTime(s.starts_at)}
              <div className={`text-[10px] font-normal mt-0.5 ${active ? "text-white/75" : "text-[#946B66]"}`}>
                90 min · aan huis
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
