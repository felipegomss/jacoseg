import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, Container, Eyebrow, SectionTitle } from "@/components/site/primitives";
import { SECTORS, STORES, getSector, whatsappLink } from "@/lib/site-data";
import { JsonLd, breadcrumb, ogFor } from "@/lib/seo";
import { sectorCatalog } from "@/lib/catalogo-server";
import SectorProducts from "@/components/site/sector-products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  const path = `/setores/${sector.slug}`;
  const title = `EPI para ${sector.title.toLowerCase()} em Jacobina e Irecê`;
  return {
    title,
    description: `${sector.intro} Itens com CA válido para ${sector.norms}. Lojas em Jacobina e Irecê, na Bahia.`,
    alternates: { canonical: path },
    openGraph: ogFor(path, { title: `${title} | JacoSeg` }),
  };
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const matriz = STORES[0];
  const catalog = sectorCatalog(sector.catalog.groups);
  const others = SECTORS.filter((s) => s.slug !== sector.slug);

  return (
    <>
      <JsonLd
        data={breadcrumb([
          ["Início", "/"],
          ["Setores", "/#setores"],
          [sector.title, `/setores/${sector.slug}`],
        ])}
      />
      {/* Hero */}
      <section className="bg-ink text-bone">
        <Container className="flex flex-wrap items-stretch gap-x-16 gap-y-12 pt-10 pb-16 sm:pt-14 sm:pb-24">
          <div className="flex min-w-0 flex-[1_1_560px] flex-col justify-between gap-12">
            <nav aria-label="Trilha" className="text-sm text-fog">
              <Link href="/" className="hover:text-bone">
                Início
              </Link>{" "}
              /{" "}
              <Link href="/#setores" className="hover:text-bone">
                Setores
              </Link>{" "}
              / <span className="text-bone">{sector.title}</span>
            </nav>
            <div>
              <Eyebrow tone="dark" className="mb-6">
                {sector.norms}
              </Eyebrow>
              <h1 className="font-display mb-7 text-[40px] leading-[1.05] font-semibold tracking-[-0.02em] text-balance sm:text-[64px] sm:leading-[1.03]">
                {sector.heading}
              </h1>
              <p className="mb-10 max-w-[520px] text-lg leading-relaxed text-mist sm:text-[19px]">{sector.intro}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink
                  href={whatsappLink(STORES[0].whatsapp, `Olá, JacoSeg! Quero orçar EPI para ${sector.title.toLowerCase()}.`)}
                >
                  Orçar para a equipe <Arrow />
                </ButtonLink>
                <ButtonLink href="#produtos" variant="outline-dark">
                  Ver produtos da linha
                </ButtonLink>
              </div>
            </div>
          </div>
          {sector.image && (
            <figure className="relative m-0 aspect-[4/5] min-w-0 flex-[1_1_100%] overflow-hidden sm:flex-[0_1_460px]">
              <Image
                src={sector.image}
                alt={sector.imageAlt ?? ""}
                fill
                priority
                sizes="(min-width: 640px) 460px, 100vw"
                className="object-cover"
                style={{ objectPosition: sector.imagePosition ?? "center" }}
              />
            </figure>
          )}
        </Container>
      </section>

      {/* Contexto */}
      <section>
        <Container className="flex flex-wrap gap-16 py-20 sm:py-24">
          <SectionTitle className="min-w-0 flex-[1_1_420px] sm:text-[36px]">
            {sector.slug === "eolica"
              ? "A região virou um dos maiores polos eólicos do país. Nosso estoque acompanhou."
              : "Conhecemos as exigências da sua operação. Nosso estoque foi montado a partir delas."}
          </SectionTitle>
          <div className="min-w-0 flex-[1_1_520px] text-graphite">
            {sector.context.map((p) => (
              <p key={p} className="mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Normas */}
      <section>
        <Container className="pb-20 sm:pb-28">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {sector.normsDetail.map((n) => (
              <div key={n.code} className="bg-white p-8">
                <p className="font-display mb-2 text-[32px] font-bold">{n.code}</p>
                <p className="mb-2 font-semibold">{n.name}</p>
                <p className="text-[15px] text-graphite">{n.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Produtos */}
      <section id="produtos" className="scroll-mt-24 bg-stone">
        <Container className="py-20 sm:py-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-4">Do nosso catálogo · {catalog.total} itens para o setor</Eyebrow>
              <SectionTitle className="sm:text-[40px]">Produtos da linha</SectionTitle>
            </div>
            <p className="max-w-[400px] text-graphite">{sector.catalog.intro}</p>
          </div>
          <SectorProducts groups={catalog.groups} whatsapp={matriz.whatsapp} />
        </Container>
      </section>

      {/* Kits */}
      <section>
        <Container className="py-20 sm:py-28">
          <SectionTitle className="mb-10 sm:text-[40px]">Kits por função</SectionTitle>
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {sector.kits.map((k) => (
              <div key={k.role} className="border-t-2 border-ink pt-6">
                <h3 className="font-display mb-3 text-[22px] font-semibold">{k.role}</h3>
                <p className="mb-5 text-[15px] text-graphite">{k.items}</p>
                <a
                  href={whatsappLink(
                    matriz.whatsapp,
                    `Olá, JacoSeg! Quero orçar o kit de ${k.role.toLowerCase()} (${k.items}).\n\nQuantidade de colaboradores: `,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-graphite"
                >
                  Orçar kit →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-safety">
        <Container className="flex flex-wrap items-center justify-between gap-8 py-16 sm:py-[72px]">
          <h2 className="font-display max-w-[680px] text-[28px] leading-[1.15] font-semibold tracking-[-0.01em] text-balance sm:text-[36px]">
            Vai mobilizar uma equipe? Envie a lista e devolvemos o orçamento com o CA de cada item.
          </h2>
          <ButtonLink href={whatsappLink(matriz.whatsapp, "Olá, JacoSeg! Quero enviar a lista da minha equipe para orçamento.")} variant="ink">
            Falar no WhatsApp <Arrow />
          </ButtonLink>
        </Container>
      </section>

      {/* Outros setores */}
      <section>
        <Container className="py-16">
          <Eyebrow className="mb-6">Outros setores</Eyebrow>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
            {others.map((s) => (
              <Link key={s.slug} href={`/setores/${s.slug}`} className="group flex flex-col gap-2 bg-white p-6 hover:bg-paper">
                <span className="font-tech text-xs text-graphite">{s.norms}</span>
                <span className="font-display text-xl font-semibold">
                  {s.title} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
