"use client";

import { useEffect, useState } from "react";

// Seg–Sex 08:00–18:00 · Sáb 08:00–12:30 · Dom fechado (horário da Bahia)
const SCHEDULE: Record<number, [number, number] | null> = {
  0: null,
  1: [8 * 60, 18 * 60],
  2: [8 * 60, 18 * 60],
  3: [8 * 60, 18 * 60],
  4: [8 * 60, 18 * 60],
  5: [8 * 60, 18 * 60],
  6: [8 * 60, 12 * 60 + 30],
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function fmt(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

function nowInBahia() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bahia",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return { day: WEEKDAYS.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function status() {
  const { day, minutes } = nowInBahia();
  const today = SCHEDULE[day];
  if (today && minutes >= today[0] && minutes < today[1]) {
    return { open: true, text: `Aberto agora · até ${fmt(today[1])}` };
  }
  if (today && minutes < today[0]) return { open: false, text: `Fechado · abre hoje às ${fmt(today[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const next = SCHEDULE[d];
    if (next) return { open: false, text: `Fechado · abre ${i === 1 ? "amanhã" : "segunda"} às ${fmt(next[0])}` };
  }
  return { open: false, text: "Fechado" };
}

export default function StoreStatus() {
  const [s, setS] = useState<ReturnType<typeof status> | null>(null);

  useEffect(() => {
    setS(status());
    const id = setInterval(() => setS(status()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-tech inline-flex min-h-5 items-center gap-2 text-xs tracking-[0.04em]" aria-live="polite">
      {s && (
        <>
          <span className="relative flex size-2">
            {s.open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-safety opacity-60 motion-reduce:hidden" />}
            <span className={`relative inline-flex size-2 rounded-full ${s.open ? "bg-safety" : "bg-ink-border"}`} />
          </span>
          <span className={s.open ? "text-bone" : "text-fog"}>{s.text}</span>
        </>
      )}
    </span>
  );
}
