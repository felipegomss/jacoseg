"use client";

import { useState } from "react";
import Link from "next/link";
import type { SectorGroup } from "@/lib/catalogo-server";
import { whatsappLink } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export default function SectorProducts({ groups, whatsapp }: { groups: SectorGroup[]; whatsapp: string }) {
  const [active, setActive] = useState(0);
  const g = groups[active];
  if (!g) return null;

  return (
    <>
      <div role="tablist" aria-label="Tipo de produto" className="mb-6 flex flex-wrap gap-2">
        {groups.map((x, i) => (
          <button
            key={x.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="setor-produtos"
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex min-h-11 cursor-pointer items-center gap-2 border px-3.5 text-sm transition-colors",
              i === active ? "border-ink bg-ink text-bone" : "border-[#bfbaae] text-ink hover:border-ink",
            )}
          >
            {x.title}
            <span className={cn("font-tech text-[11px]", i === active ? "text-fog" : "text-graphite")}>{x.count}</span>
          </button>
        ))}
      </div>

      <ul id="setor-produtos" role="tabpanel" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {g.items.map((it) => (
          <li key={it.id} className="flex flex-col border border-line bg-white p-6">
            <div className="font-tech mb-3.5 flex justify-between gap-3 text-xs">
              <span className="tracking-[0.06em] uppercase">{it.m || " "}</span>
              <span className="shrink-0 text-graphite">Cód. {it.id}</span>
            </div>
            <h3 className="font-display mb-5 text-[17px] leading-snug font-semibold break-words">{it.n}</h3>
            <a
              href={whatsappLink(whatsapp, `Olá, JacoSeg! Quero consultar: ${it.n}${it.m ? ` (${it.m})` : ""}, cód. ${it.id}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-11 items-center justify-center border border-ink text-sm font-semibold transition-colors hover:bg-ink hover:text-bone"
            >
              Consultar no WhatsApp
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="font-tech text-xs tracking-[0.08em] text-graphite uppercase">
          {g.norm} · {g.title}
        </p>
        <Link href={g.href} className="border-b border-ink pb-0.5 font-semibold hover:text-graphite">
          Ver {g.count === 1 ? "o item" : `os ${g.count} itens`} no catálogo →
        </Link>
      </div>
    </>
  );
}
