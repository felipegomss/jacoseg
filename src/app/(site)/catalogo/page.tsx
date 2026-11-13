import type { Metadata } from "next";
import CatalogPage from "@/components/site/catalog-page";
import { CATALOG } from "@/lib/site-data";
import { ogFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Catálogo de EPI, ferramentas e material de obra",
  description: `Mais de ${CATALOG.totalRounded} itens de ${CATALOG.brandsRounded} marcas: EPI com CA, ferramentas, construção, limpeza e utilidades. Monte sua lista e peça o orçamento às lojas de Jacobina e Irecê, na Bahia.`,
  alternates: { canonical: "/catalogo" },
  openGraph: ogFor("/catalogo"),
};

export default function CatalogoPage() {
  return <CatalogPage />;
}
