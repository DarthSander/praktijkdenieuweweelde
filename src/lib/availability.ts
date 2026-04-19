// Genereert IBCT-blokken volgens Eva's werkdagen.
// Ma-Vr: 18:00-19:30 en 19:30-21:00
// Za:    13:00-14:30 en 15:00-16:30
// Tijdzone: Europe/Amsterdam (we slaan op als ISO/UTC).

const WEEKDAY_BLOCKS = [
  { startHour: 18, startMin: 0 },
  { startHour: 19, startMin: 30 },
];

const SATURDAY_BLOCKS = [
  { startHour: 13, startMin: 0 },
  { startHour: 15, startMin: 0 },
];

const DURATION_MIN = 90;

export type GeneratedSlot = { starts_at: string; ends_at: string };

/**
 * Maak een Date in de Europe/Amsterdam tijdzone (rekening houdend met DST).
 * We bouwen een UTC date die overeenkomt met de gegeven lokale tijd in Amsterdam.
 */
function amsterdamToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  // Maak een initiële UTC-tijd alsof het Amsterdam was, en corrigeer dan voor de offset.
  const naive = new Date(Date.UTC(year, month, day, hour, minute, 0));
  // Bepaal wat 'naive' uitgedrukt zou zijn in Amsterdam-tijd:
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(naive);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const amsAsUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  const offset = amsAsUtc - naive.getTime();
  return new Date(naive.getTime() - offset);
}

export function generateSlots(weeksAhead: number, fromDate: Date = new Date()): GeneratedSlot[] {
  const slots: GeneratedSlot[] = [];
  const totalDays = weeksAhead * 7;
  const start = new Date(fromDate);
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < totalDays; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const dow = day.getDay(); // 0 = zo, 1 = ma, ... 6 = za
    let blocks: typeof WEEKDAY_BLOCKS;
    if (dow >= 1 && dow <= 5) blocks = WEEKDAY_BLOCKS;
    else if (dow === 6) blocks = SATURDAY_BLOCKS;
    else continue; // zondag overslaan

    for (const b of blocks) {
      const startsAt = amsterdamToUtc(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        b.startHour,
        b.startMin
      );
      if (startsAt.getTime() <= fromDate.getTime()) continue;
      const endsAt = new Date(startsAt.getTime() + DURATION_MIN * 60_000);
      slots.push({ starts_at: startsAt.toISOString(), ends_at: endsAt.toISOString() });
    }
  }
  return slots;
}

export function formatSlotLabel(iso: string): string {
  const d = new Date(iso);
  const dateFmt = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const timeFmt = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateFmt.format(d)} · ${timeFmt.format(d)}`;
}

export function formatDayKey(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function formatDayLabel(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(d);
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
