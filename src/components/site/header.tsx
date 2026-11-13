"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { STORES, HOURS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#produtos", label: "Produtos" },
  { href: "/#setores", label: "Setores" },
  { href: "/#empresas", label: "Para empresas" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/jacoseg-wordmark.svg"
      alt="JacoSeg"
      width={368}
      height={100}
      priority
      className={cn("h-7 w-auto lg:h-9", className)}
    />
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="hidden bg-ink text-[13px] text-fog md:block">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-x-8 gap-y-1 px-8 py-2.5">
          <span>
            Lojas em Jacobina e Irecê — BA · Seg a sex {HOURS[0].time.replace(" — ", "–").replace(/:00/g, "h")} · Sáb 8h–12h30
          </span>
          <span className="flex flex-wrap gap-6">
            {STORES.map((s) => (
              <span key={s.id}>
                {s.city}{" "}
                <a href={s.phoneHref} className="text-bone hover:text-safety">
                  {s.phoneDisplay}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-ink-line bg-ink">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
          <Link href="/" aria-label="JacoSeg — página inicial">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 text-[15px] lg:flex">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="text-bone/90 transition-colors hover:text-safety">
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contato"
            className="hidden min-h-11 items-center bg-safety px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-[#ffc51a] lg:inline-flex"
          >
            Solicitar orçamento
          </Link>

          <button
            type="button"
            className="flex size-11 items-center justify-center border border-ink-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <g stroke="#edebe4" strokeWidth="1.5">
                {open ? (
                  <>
                    <path d="M4 4l12 12" />
                    <path d="M16 4L4 16" />
                  </>
                ) : (
                  <>
                    <path d="M2 6h16" />
                    <path d="M2 14h16" />
                  </>
                )}
              </g>
            </svg>
          </button>
        </div>

        {open && (
          <div id="menu-mobile" className="h-[calc(100dvh-77px)] overflow-y-auto border-t border-ink-line bg-ink px-5 pb-10 lg:hidden">
            <nav aria-label="Menu" className="flex flex-col">
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display border-b border-ink-line py-5 text-2xl font-semibold text-bone"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              {STORES.map((s) => (
                <a
                  key={s.id}
                  href={s.phoneHref}
                  className="flex min-h-[52px] items-center justify-between border border-ink-border px-5 text-bone"
                >
                  <span>Ligar · {s.city}</span>
                  <span className="font-tech text-sm text-fog">{s.phoneDisplay}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
