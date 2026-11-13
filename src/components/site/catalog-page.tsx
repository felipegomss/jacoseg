import Link from "next/link";
import Catalog from "@/components/site/catalog";
import { Container } from "@/components/site/primitives";
import { firstItems } from "@/lib/catalogo-server";
import { CATALOG, CATEGORIES, STORES } from "@/lib/site-data";
import { JsonLd, breadcrumb } from "@/lib/seo";

export const OTHER_CATEGORY = { id: "outros", title: "Outros itens", items: "Itens diversos que também saem nas lojas" };

export function categoryInfo(id: string) {
  return id === "outros" ? OTHER_CATEGORY : CATEGORIES.find((c) => c.id === id);
}

export default function CatalogPage({ category }: { category?: string }) {
  const info = category ? categoryInfo(category) : undefined;
  const count = category ? CATALOG.byCategory[category] ?? 0 : CATALOG.total;

  return (
    <>
      <JsonLd
        data={breadcrumb([
          ["Início", "/"],
          ["Catálogo", "/catalogo"],
          ...(info ? ([[info.title, `/catalogo/${category}`]] as [string, string][]) : []),
        ])}
      />
      <section className="bg-ink text-bone">
        <Container className="pt-10 pb-12 sm:pt-12 sm:pb-14">
          <nav aria-label="Trilha" className="mb-10 text-sm text-fog">
            <Link href="/" className="hover:text-bone">
              Início
            </Link>{" "}
            /{" "}
            {info ? (
              <>
                <Link href="/catalogo" className="hover:text-bone">
                  Catálogo
                </Link>{" "}
                / <span className="text-bone">{info.title}</span>
              </>
            ) : (
              <span className="text-bone">Catálogo</span>
            )}
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="min-w-0 flex-[1_1_480px]">
              <p className="font-tech mb-5 text-xs tracking-[0.08em] text-safety uppercase sm:text-[13px]">
                {count.toLocaleString("pt-BR")} itens
                {info ? " no catálogo" : ` · ${CATALOG.brands} marcas`}
              </p>
              <h1 className="font-display text-[40px] leading-[1.03] font-semibold tracking-[-0.02em] text-balance sm:text-[60px]">
                {info ? info.title : "Catálogo"}
              </h1>
            </div>
            <p className="max-w-[420px] flex-[0_1_420px] text-[17px] leading-relaxed text-mist">
              {info
                ? `${info.items}. Monte sua lista e a loja de Jacobina ou Irecê confirma disponibilidade, CA e valores pelo WhatsApp.`
                : "Monte sua lista com o que precisa e mande para a loja. A gente confirma disponibilidade, CA e valores pelo WhatsApp."}
            </p>
          </div>
        </Container>
      </section>
      <Catalog
        categories={CATEGORIES.map((c) => ({ id: c.id, title: c.title, count: CATALOG.byCategory[c.id] ?? 0 }))}
        otherCount={CATALOG.byCategory.outros ?? 0}
        total={CATALOG.total}
        stores={STORES.map((s) => ({ id: s.id, city: s.city, whatsapp: s.whatsapp }))}
        category={category}
        initialItems={firstItems(category)}
      />
    </>
  );
}
