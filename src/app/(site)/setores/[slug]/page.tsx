import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, Container, Eyebrow, SectionTitle } from "@/components/site/primitives";
import { WindRidge } from "@/components/site/illustrations";
import { SECTORS, STORES, getSector, whatsappLink } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  return {
    title: `EPI para ${sector.title.toLowerCase()}`,
    description: `${sector.intro} ${sector.norms}. Lojas em Jacobina e Irecê.`,
  };
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const matriz = STORES[0];
  const others = SECTORS.filter((s) => s.slug !== sector.slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-bone">
        <Container className="pt-10 sm:pt-14">
          <nav aria-label="Trilha" className="mb-12 text-sm text-fog sm:mb-16">
            <Link href="/" className="hover:text-bone">
              Início
            </Link>{" "}
            /{" "}
            <Link href="/#setores" className="hover:text-bone">
              Setores
            </Link>{" "}
            / <span className="text-bone">{sector.title}</span>
          </nav>
          <div className="flex flex-wrap items-end gap-x-12 gap-y-6 pb-14 sm:pb-20">
            <div className="min-w-0 flex-[1_1_640px]">
              <Eyebrow tone="dark" className="mb-6">
                {sector.norms}
              </Eyebrow>
              <h1 className="font-display text-[40px] leading-[1.05] font-semibold tracking-[-0.02em] text-balance sm:text-[60px]">
                {sector.heading}
              </h1>
            </div>
            <p className="min-w-0 flex-[1_1_380px] text-lg text-mist">{sector.intro}</p>
          </div>
        </Container>
        <Container>
          {sector.image ? (
            <div className="relative h-[260px] overflow-hidden sm:h-[420px]">
              <Image
                src={sector.image}
                alt="Aerogeradores em uma serra"
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover grayscale-[35%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-ink/25" />
            </div>
          ) : (
            <div className="border-t border-ink-line pt-8">
              <WindRidge className="mx-auto block h-auto w-full max-w-[720px] opacity-80" />
            </div>
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
      <section className="bg-stone">
        <Container className="py-20 sm:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionTitle className="sm:text-[40px]">Produtos da linha</SectionTitle>
            <p className="max-w-[420px] text-graphite">
              Itens de referência. Consulte modelos, tamanhos e números de CA disponíveis em cada loja.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sector.products.map((p) => (
              <article key={p.name} className="flex flex-col border border-line bg-paper p-6 sm:p-7">
                <p className="font-tech mb-3 text-xs text-graphite">{p.norm}</p>
                <h3 className="font-display mb-2 text-[19px] leading-snug font-semibold">{p.name}</h3>
                <p className="mb-6 flex-grow text-sm text-graphite">{p.note}</p>
                <a
                  href={whatsappLink(matriz.whatsapp, `Olá, JacoSeg! Quero orçar: ${p.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start border-b border-ink pb-0.5 text-sm font-semibold hover:text-graphite"
                >
                  Consultar disponibilidade
                </a>
              </article>
            ))}
          </div>
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
