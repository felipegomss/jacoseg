import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage, { categoryInfo } from "@/components/site/catalog-page";
import { topBrands } from "@/lib/catalogo-server";
import { CATALOG, CATEGORIES } from "@/lib/site-data";
import { ogFor } from "@/lib/seo";

type Props = { params: Promise<{ categoria: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...CATEGORIES.map((c) => ({ categoria: c.id })), { categoria: "outros" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const info = categoryInfo(categoria);
  if (!info) return {};
  const count = CATALOG.byCategory[categoria] ?? 0;
  const brands = topBrands(categoria, 4);
  const path = `/catalogo/${categoria}`;
  return {
    title: `${info.title} em Jacobina e Irecê`,
    description: `${count.toLocaleString("pt-BR")} itens de ${info.title.toLowerCase()}: ${info.items.toLowerCase()}${brands.length ? `, de marcas como ${brands.join(", ")}` : ""}. Lojas JacoSeg em Jacobina e Irecê, BA.`,
    alternates: { canonical: path },
    openGraph: ogFor(path, { title: `${info.title} em Jacobina e Irecê | JacoSeg` }),
    robots: categoria === "outros" ? { index: false, follow: true } : undefined,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  if (!categoryInfo(categoria)) notFound();
  return <CatalogPage category={categoria} />;
}
