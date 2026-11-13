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

function norm(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Mesma regra da busca do catálogo: todas as palavras precisam aparecer. */
function search(busca: string, categoria?: string) {
  const terms = norm(busca).split(/\s+/).filter(Boolean);
  return catalogItems().filter(
    (i) => (!categoria || i.c === categoria) && terms.every((t) => norm(`${i.n} ${i.m} ${i.id} ${i.v.join(" ")}`).includes(t)),
  );
}

/** Nome sem tamanho, numeração e cor, para não repetir o mesmo produto na amostra. */
function baseName(n: string) {
  return norm(n)
    .replace(/\b(tam\.?|tamanho|n[º°o]\.?)\s*\S+/g, "")
    .replace(/\b(pp|p|m|g|gg|xg|eg|xgg|exg)\b/g, "")
    .replace(/\b(amarel[oa]|azul|branc[oa]|verde|vermelh[oa]|cinza|pret[oa]|laranja|bege|marrom)\b/g, "")
    .replace(/[^a-z]+/g, " ")
    .trim()
    .slice(0, 28);
}

/** Até `n` itens variados, dando preferência aos que têm marca e CA no nome. */
function sample(items: Item[], n = 4) {
  const score = (i: Item) => (i.m ? 1 : 0) + (/\bc\.?a\.?\b|\bca\s*\d/.test(norm(i.n)) ? 1 : 0);
  const out: Item[] = [];
  const seen = new Set<string>();
  for (const i of [...items].sort((a, b) => score(b) - score(a))) {
    const b = baseName(i.n);
    if (seen.has(b)) continue;
    seen.add(b);
    out.push(i);
    if (out.length === n) break;
  }
  return out;
}

export type SectorGroup = { norm: string; title: string; count: number; href: string; items: Item[] };

export function sectorCatalog(groups: { norm: string; title: string; busca: string; categoria?: string }[]) {
  const ids = new Set<string>();
  const out: SectorGroup[] = groups.map((g) => {
    const found = search(g.busca, g.categoria);
    found.forEach((i) => ids.add(i.id));
    const qs = g.busca ? `?busca=${encodeURIComponent(g.busca)}` : "";
    return { norm: g.norm, title: g.title, count: found.length, href: `/catalogo${g.categoria ? `/${g.categoria}` : ""}${qs}`, items: sample(found) };
  });
  return { total: ids.size, groups: out.filter((g) => g.count > 0) };
}
