"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Map as MLMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { STORES, type Store } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const STORE_ZOOM = 16;

function boundsOfStores(): [[number, number], [number, number]] {
  const lngs = STORES.map((s) => s.coords[0]);
  const lats = STORES.map((s) => s.coords[1]);
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}

function markerEl(store: Store, onClick: () => void) {
  const el = document.createElement("button");
  el.type = "button";
  el.setAttribute("aria-label", `Aproximar na loja de ${store.city}`);
  el.className = "group flex cursor-pointer flex-col items-center gap-1.5 bg-transparent p-0";
  el.innerHTML = `
    <span class="font-display whitespace-nowrap bg-ink px-2.5 py-1 text-[13px] font-semibold text-bone shadow-[0_2px_10px_rgba(0,0,0,0.25)]">${store.city}</span>
    <span class="block size-4 border-2 border-ink bg-safety transition-transform group-hover:scale-125"></span>`;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick();
  });
  return el;
}

export default function StoresMap({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const [active, setActive] = useState<Store["id"] | null>(null);
  const [failed, setFailed] = useState(false);

  const fitAll = useCallback((animate = true) => {
    map.current?.fitBounds(boundsOfStores(), { padding: { top: 90, bottom: 60, left: 90, right: 90 }, duration: animate ? 1400 : 0 });
    setActive(null);
  }, []);

  const focus = useCallback((store: Store) => {
    map.current?.flyTo({ center: store.coords, zoom: STORE_ZOOM, speed: 1.4, essential: true });
    setActive(store.id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const maplibre = (await import("maplibre-gl")).default;
        if (cancelled || !container.current) return;
        const m = new maplibre.Map({
          container: container.current,
          style: STYLE_URL,
          bounds: boundsOfStores(),
          fitBoundsOptions: { padding: { top: 90, bottom: 60, left: 90, right: 90 } },
          attributionControl: { compact: true },
          cooperativeGestures: true,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
        });
        m.on("error", () => {});
        map.current = m;
        markers.current = STORES.map((s) =>
          new maplibre.Marker({ element: markerEl(s, () => focus(s)), anchor: "bottom" }).setLngLat(s.coords).addTo(m),
        );
      } catch {
        setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      markers.current.forEach((mk) => mk.remove());
      map.current?.remove();
      map.current = null;
    };
  }, [focus]);

  const activeStore = STORES.find((s) => s.id === active);

  return (
    <div className={cn("relative overflow-hidden border border-line bg-paper", className)}>
      <div ref={container} className="h-[420px] w-full sm:h-[480px]" aria-label="Mapa com as lojas de Jacobina e Irecê" role="region" />

      {failed && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-graphite">
          Não foi possível carregar o mapa.
        </div>
      )}

      {/* Seletor de lojas */}
      <div className="absolute top-3 left-3 flex gap-1 bg-paper/95 p-1 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
        {STORES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => focus(s)}
            aria-pressed={active === s.id}
            className={cn(
              "min-h-10 cursor-pointer px-3 text-sm font-semibold transition-colors",
              active === s.id ? "bg-ink text-bone" : "text-ink hover:bg-stone",
            )}
          >
            {s.city}
          </button>
        ))}
      </div>

      {/* Ver as duas lojas */}
      <button
        type="button"
        onClick={() => fitAll()}
        aria-label="Ver as duas lojas"
        title="Ver as duas lojas"
        className={cn(
          "absolute top-3 right-3 flex size-11 cursor-pointer items-center justify-center rounded-full bg-ink text-bone shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-opacity hover:bg-[#2a2924]",
          active ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      </button>

      {/* Cartão da loja ativa */}
      {activeStore && (
        <div className="absolute right-3 bottom-8 left-3 flex flex-wrap items-center justify-between gap-3 bg-ink p-4 text-bone shadow-[0_4px_20px_rgba(0,0,0,0.3)] sm:right-auto sm:max-w-[360px]">
          <div className="min-w-0">
            <p className="font-tech mb-1 text-[11px] tracking-[0.08em] text-safety uppercase">
              {activeStore.label} · {activeStore.city}
            </p>
            <p className="text-sm leading-snug text-mist">
              {activeStore.street}, {activeStore.district}
            </p>
          </div>
          <a
            href={activeStore.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center bg-safety px-4 text-sm font-semibold text-ink hover:bg-[#ffc51a]"
          >
            Como chegar →
          </a>
        </div>
      )}
    </div>
  );
}
