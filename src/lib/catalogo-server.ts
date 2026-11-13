import fs from "node:fs";
import path from "node:path";
import type { Item } from "@/components/site/catalog";

let cache: Item[] | null = null;

/** Lê public/catalogo.json no build (as páginas do catálogo são estáticas). */
export function catalogItems(): Item[] {
  if (!cache) {
    const raw = fs.readFileSync(path.join(process.cwd(), "public", "catalogo.json"), "utf8");
    cache = JSON.parse(raw).itens as Item[];
  }
  return cache;
}

export function firstItems(category?: string, n = 48) {
  const all = catalogItems();
  return (category ? all.filter((i) => i.c === category) : all).slice(0, n);
}

/** Marcas mais frequentes de uma linha, para textos e descrições. */
export function topBrands(category?: string, n = 6) {
  const count = new Map<string, number>();
  for (const i of catalogItems()) if (i.m && (!category || i.c === category)) count.set(i.m, (count.get(i.m) ?? 0) + 1);
  return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([m]) => m);
}
