import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/primitives";
import Catalog from "@/components/site/catalog";
import { CATALOG, CATEGORIES, STORES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Catálogo",
  description: `Mais de ${CATALOG.totalRounded} itens de ${CATALOG.brandsRounded} marcas: EPI, ferramentas, construção, limpeza e utilidades. Monte sua lista e peça o orçamento às lojas de Jacobina e Irecê.`,
};

export default function CatalogoPage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <Container className="pt-10 pb-12 sm:pt-12 sm:pb-14">
          <p className="mb-10 text-sm text-fog">
            <Link href="/" className="hover:text-bone">
              Início
            </Link>{" "}
            / <span className="text-bone">Catálogo</span>
          </p>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="min-w-0 flex-[1_1_480px]">
              <p className="font-tech mb-5 text-xs tracking-[0.08em] text-safety uppercase sm:text-[13px]">
                {CATALOG.total.toLocaleString("pt-BR")} itens · {CATALOG.brands} marcas
              </p>
              <h1 className="font-display text-[44px] leading-[1.03] font-semibold tracking-[-0.02em] sm:text-[60px]">
                Catálogo
              </h1>
            </div>
            <p className="max-w-[420px] flex-[0_1_420px] text-[17px] leading-relaxed text-mist">
              Monte sua lista com o que precisa e mande para a loja. A gente confirma disponibilidade, CA e valores pelo
              WhatsApp.
            </p>
          </div>
        </Container>
      </section>
      <Catalog
        categories={CATEGORIES.map((c) => ({ id: c.id, title: c.title, count: CATALOG.byCategory[c.id] ?? 0 }))}
        otherCount={CATALOG.byCategory.outros ?? 0}
        total={CATALOG.total}
        stores={STORES.map((s) => ({ id: s.id, city: s.city, whatsapp: s.whatsapp }))}
      />
    </>
  );
}
