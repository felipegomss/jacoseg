import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, COMPANY, HOURS, SECTORS, STORES, catalogHref, whatsappLink } from "@/lib/site-data";
import StoreStatus from "./store-status";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#empresas", label: "Para empresas" },
  { href: "/#sobre", label: "Sobre a JacoSeg" },
  { href: "/guias", label: "Guias técnicos" },
  { href: "/#contato", label: "Pedir orçamento" },
];

const SOCIAL = [
  { href: COMPANY.instagram, label: "Instagram", handle: "@jacoseg" },
  { href: COMPANY.facebook, label: "Facebook", handle: "JacoSeg" },
];

function ColTitle({ children }: { children: React.ReactNode }) {
  return <p className="font-tech mb-5 text-xs tracking-[0.08em] text-mist uppercase">{children}</p>;
}

const linkCls = "text-fog transition-colors hover:text-bone";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink-line bg-ink-deep text-sm text-fog" aria-labelledby="rodape-titulo">
      {/* Fechamento */}
      <div className="mx-auto max-w-[1280px] px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <h2
            id="rodape-titulo"
            className="font-display max-w-[760px] text-[40px] leading-[1.02] font-semibold tracking-[-0.025em] text-balance text-bone sm:text-[64px]"
          >
            Segurança não espera. <span className="text-fog">A gente também não.</span>
          </h2>
          <p className="max-w-[340px] text-[15px] leading-relaxed">
            Escolha a loja e fale direto com quem vai separar o seu pedido.
          </p>
        </div>

        {/* Lojas */}
        <div className="mt-14 grid gap-px border border-ink-line bg-ink-line md:grid-cols-2">
          {STORES.map((s) => (
            <section key={s.id} aria-label={`Loja de ${s.city}`} className="flex flex-col bg-ink-deep p-7 sm:p-10">
              <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-tech mb-2 text-xs tracking-[0.08em] text-safety uppercase">{s.label}</p>
                  <p className="font-display text-[32px] leading-none font-semibold text-bone sm:text-[40px]">{s.city}</p>
                </div>
                <StoreStatus />
              </div>

              <address className="mb-8 grid gap-x-8 gap-y-5 not-italic sm:grid-cols-2">
                <div>
                  <p className="font-tech mb-1.5 text-[11px] tracking-[0.08em] uppercase">Endereço</p>
                  <p className="leading-relaxed text-mist">
                    {s.street}
                    <br />
                    {s.district}, {s.city}, BA
                    <br />
                    CEP {s.cep}
                  </p>
                </div>
                <div>
                  <p className="font-tech mb-1.5 text-[11px] tracking-[0.08em] uppercase">Contato</p>
                  <p className="leading-relaxed">
                    <a href={s.phoneHref} className="text-bone hover:text-safety">
                      {s.phoneDisplay}
                    </a>
                    <br />
                    <a href={`mailto:${s.email}`} className={linkCls}>
                      {s.email}
                    </a>
                  </p>
                </div>
              </address>

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href={whatsappLink(s.whatsapp, `Olá, JacoSeg ${s.city}!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 bg-safety px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-[#ffc51a]"
                >
                  WhatsApp {s.city} <span aria-hidden="true">→</span>
                </a>
                <a
                  href={s.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center border border-ink-border px-5 text-[15px] font-medium text-bone transition-colors hover:border-fog"
                >
                  Como chegar
                </a>
              </div>
            </section>
          ))}
        </div>

        {/* Navegação */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 sm:py-20 lg:grid-cols-[1fr_1fr_1.3fr_1fr]">
          <nav aria-label="Navegação do rodapé">
            <ColTitle>Navegação</ColTitle>
            <ul className="flex flex-col gap-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Setores">
            <ColTitle>Setores</ColTitle>
            <ul className="flex flex-col gap-3">
              {SECTORS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/setores/${s.slug}`} className={`group ${linkCls}`}>
                    <span className="font-tech mr-2 text-[11px] text-ink-border transition-colors group-hover:text-safety">
                      {s.norms.split(" · ")[0]}
                    </span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColTitle>Linhas de produto</ColTitle>
            <ul className="columns-1 gap-x-6 sm:columns-2">
              {CATEGORIES.map((c) => (
                <li key={c.id} className="mb-3 break-inside-avoid">
                  <Link href={catalogHref(c.id)} className={linkCls}>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-12">
            <div>
              <ColTitle>Horário</ColTitle>
              <dl className="flex flex-col gap-2.5">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-4 border-b border-ink-line pb-2.5">
                    <dt>{h.days}</dt>
                    <dd className="font-tech text-xs text-bone">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <ColTitle>Redes</ColTitle>
              <ul className="flex flex-col gap-3">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={`group flex justify-between gap-4 ${linkCls}`}>
                      <span>{s.label}</span>
                      <span className="font-tech text-xs text-ink-border transition-colors group-hover:text-safety">
                        {s.handle} ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Assinatura: linha da Chapada + marca */}
      <div aria-hidden="true" className="select-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-14 w-full sm:h-20">
          <path
            d="M0 70 L180 46 L360 54 L470 22 L700 18 L820 6 L1060 12 L1180 2 L1440 8"
            fill="none"
            stroke="#f2b705"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Image
            src="/brand/jacoseg-logo-branco.svg"
            alt=""
            width={980}
            height={522}
            className="mx-auto -mt-2 h-auto w-full max-w-[1180px] opacity-[0.06]"
          />
        </div>
      </div>

      {/* Base */}
      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-7 text-xs sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="leading-relaxed">
            © {year} {COMPANY.legalName}
            <span className="mx-2 hidden text-ink-border sm:inline">·</span>
            <br className="sm:hidden" />
            CNPJ {COMPANY.cnpj} · Desde {COMPANY.founded}
          </p>
          </div>
          <a
            href="#topo"
            className="font-tech inline-flex min-h-11 items-center gap-2 self-start tracking-[0.08em] text-bone uppercase transition-colors hover:text-safety md:self-auto"
          >
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
