import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, Container, Eyebrow } from "@/components/site/primitives";
import { GUIAS, getGuia } from "@/lib/guias";
import { STORES, whatsappLink } from "@/lib/site-data";
import { JsonLd, SITE_URL, breadcrumb, ogFor } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) return {};
  const path = `/guias/${g.slug}`;
  return {
    title: g.titulo,
    description: g.resumo,
    alternates: { canonical: path },
    openGraph: ogFor(path, { type: "article", title: `${g.titulo} | JacoSeg` }),
  };
}

export default async function GuiaPage({ params }: Props) {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) notFound();
  const outros = GUIAS.filter((o) => o.slug !== g.slug);

  return (
    <>
      <JsonLd
        data={breadcrumb([
          ["Início", "/"],
          ["Guias técnicos", "/guias"],
          [g.titulo, `/guias/${g.slug}`],
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.titulo,
          description: g.resumo,
          inLanguage: "pt-BR",
          about: g.norma,
          timeRequired: `PT${g.minutos}M`,
          mainEntityOfPage: `${SITE_URL}/guias/${g.slug}`,
          image: `${SITE_URL}/opengraph-image.jpg`,
          author: { "@id": `${SITE_URL}/#organizacao` },
          publisher: { "@id": `${SITE_URL}/#organizacao` },
        }}
      />
      <section className="bg-ink text-bone">
        <Container className="pt-14 pb-16 sm:pt-20 sm:pb-20">
          <nav aria-label="Trilha" className="mb-12 text-sm text-fog">
            <Link href="/" className="hover:text-bone">
              Início
            </Link>{" "}
            /{" "}
            <Link href="/guias" className="hover:text-bone">
              Guias técnicos
            </Link>
          </nav>
          <Eyebrow tone="dark" className="mb-6">
            {g.norma} · {g.minutos} min de leitura
          </Eyebrow>
          <h1 className="font-display mb-6 max-w-[860px] text-[36px] leading-[1.06] font-semibold tracking-[-0.02em] text-balance sm:text-[56px]">
            {g.titulo}
          </h1>
          <p className="max-w-[640px] text-lg leading-relaxed text-mist">{g.resumo}</p>
        </Container>
      </section>

      <article>
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-[720px]">
            {g.blocos.map((b, i) => (
              <section key={b.titulo} className="border-t border-line pt-8 pb-12">
                <p className="font-tech mb-3 text-xs text-graphite">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="font-display mb-5 text-[26px] leading-tight font-semibold">{b.titulo}</h2>
                {b.paragrafos?.map((p) => (
                  <p key={p} className="mb-4 text-[17px] leading-relaxed text-[#3a3933]">
                    {p}
                  </p>
                ))}
                {b.itens && (
                  <ul className="mt-2 flex flex-col">
                    {b.itens.map((it) => (
                      <li key={it} className="flex gap-4 border-b border-line py-3 text-[16px] leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 inline-block size-1.5 shrink-0 bg-safety" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="font-tech text-xs leading-relaxed text-graphite">
              CONTEÚDO ORIENTATIVO · NÃO SUBSTITUI O TEXTO OFICIAL DAS NORMAS NEM A AVALIAÇÃO DO RESPONSÁVEL TÉCNICO
            </p>
          </div>
        </Container>
      </article>

      <section className="bg-safety">
        <Container className="flex flex-wrap items-center justify-between gap-8 py-14">
          <h2 className="font-display max-w-[640px] text-[26px] leading-[1.15] font-semibold tracking-[-0.01em] text-balance sm:text-[32px]">
            Precisa montar o pedido para a equipe? A gente confere o CA de cada item.
          </h2>
          <ButtonLink
            href={whatsappLink(STORES[0].whatsapp, `Olá, JacoSeg! Li o guia "${g.titulo}" e quero um orçamento.`)}
            variant="ink"
          >
            Falar no WhatsApp <Arrow />
          </ButtonLink>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <Eyebrow className="mb-6">Outros guias</Eyebrow>
          <div className="grid gap-8 md:grid-cols-2">
            {outros.map((o) => (
              <Link key={o.slug} href={`/guias/${o.slug}`} className="group flex flex-col gap-2 border-t-2 border-ink pt-5">
                <span className="font-tech text-xs text-graphite">
                  {o.norma} · {o.minutos} MIN
                </span>
                <span className="font-display text-xl font-semibold">
                  {o.titulo} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
