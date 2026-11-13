import Link from "next/link";
import { COMPANY, HOURS, SECTORS, STORES } from "@/lib/site-data";
import { Logo } from "./header";

export default function SiteFooter() {
  return (
    <footer className="bg-ink-deep text-sm text-fog">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs leading-relaxed">
            EPI, EPC e ferramentas para eólica, mineração, construção, indústria e campo. Desde {COMPANY.founded}.
          </p>
          <div className="mt-6 flex gap-5">
            <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-safety">
              Instagram
            </a>
            <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-safety">
              Facebook
            </a>
          </div>
        </div>

        {STORES.map((s) => (
          <div key={s.id}>
            <p className="font-tech mb-4 text-xs tracking-[0.08em] text-mist uppercase">
              {s.label} · {s.city}
            </p>
            <ul className="flex flex-col gap-2 leading-relaxed">
              <li>
                {s.street}, {s.district}
              </li>
              <li>
                <a href={s.phoneHref} className="text-bone hover:text-safety">
                  {s.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${s.email}`} className="hover:text-bone">
                  {s.email}
                </a>
              </li>
            </ul>
          </div>
        ))}

        <div>
          <p className="font-tech mb-4 text-xs tracking-[0.08em] text-mist uppercase">Horário</p>
          <ul className="flex flex-col gap-2">
            {HOURS.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="font-tech text-xs text-bone">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="font-tech mt-8 mb-3 text-xs tracking-[0.08em] text-mist uppercase">Setores</p>
          <ul className="flex flex-col gap-1.5">
            {SECTORS.map((s) => (
              <li key={s.slug}>
                <Link href={`/setores/${s.slug}`} className="hover:text-bone">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-5 py-6 text-xs sm:px-8">
          <span>
            {COMPANY.legalName} · CNPJ {COMPANY.cnpj}
          </span>
          <span>© {new Date().getFullYear()} JacoSeg</span>
        </div>
      </div>
    </footer>
  );
}
