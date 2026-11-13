import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, SectionTitle } from "@/components/site/primitives";
import { GUIAS } from "@/lib/guias";
import { ogFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guias técnicos de segurança do trabalho",
  description: "Normas de segurança do trabalho explicadas sem rodeio: kit para torre eólica (NR-35), como consultar o CA de um EPI (NR-6) e proteção respiratória na mineração (NR-22).",
  alternates: { canonical: "/guias" },
  openGraph: ogFor("/guias"),
};

export default function GuiasPage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <Container className="pt-14 pb-16 sm:pt-20 sm:pb-24">
          <nav aria-label="Trilha" className="mb-12 text-sm text-fog">
            <Link href="/" className="hover:text-bone">
              Início
            </Link>{" "}
            / <span className="text-bone">Guias técnicos</span>
          </nav>
          <Eyebrow tone="dark" className="mb-6">
            Guias técnicos
          </Eyebrow>
          <h1 className="font-display max-w-[760px] text-[40px] leading-[1.05] font-semibold tracking-[-0.02em] text-balance sm:text-[64px] sm:leading-[1.03]">
            Normas explicadas sem rodeio.
          </h1>
        </Container>
      </section>
      <section>
        <Container className="py-20 sm:py-24">
          <SectionTitle as="h2" className="sr-only">
            Todos os guias
          </SectionTitle>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {GUIAS.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="group flex flex-col gap-3 border-t-2 border-ink pt-6"
              >
                <span className="font-tech text-xs text-graphite">
                  {g.norma} · {g.minutos} MIN
                </span>
                <span className="font-display text-[22px] leading-snug font-semibold">{g.titulo}</span>
                <span className="text-[15px] text-graphite">{g.resumo}</span>
                <span className="mt-2 text-sm font-semibold">
                  Ler guia <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
