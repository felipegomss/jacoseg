"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { whatsappLink } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Container } from "./primitives";

type Item = { id: string; n: string; m: string; c: string; u: string; v: string[] };
type Category = { id: string; title: string; count: number };
type StoreRef = { id: string; city: string; whatsapp: string };

const PAGE = 48;
const LIST_KEY = "jacoseg:lista";

function norm(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function readParams() {
  if (typeof window === "undefined") return { q: "", cat: "", brand: "" };
  const p = new URLSearchParams(window.location.search);
  return { q: p.get("busca") ?? "", cat: p.get("categoria") ?? "", brand: p.get("marca") ?? "" };
}

function variationLabel(item: Item) {
  const first = item.v[0] ?? "";
  return /^nº/i.test(first) ? "Numeração" : "Variações";
}

function itemLine(item: Item) {
  return `${item.n}${item.m ? ` (${item.m})` : ""}, cód. ${item.id}`;
}

export default function Catalog({
  categories,
  otherCount,
  total,
  stores,
}: {
  categories: Category[];
  otherCount: number;
  total: number;
  stores: StoreRef[];
}) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [list, setList] = useState<string[]>([]);
  const [listOpen, setListOpen] = useState(false);
  const ready = useRef(false);

  // Estado inicial a partir da URL e da lista salva no navegador.
  useEffect(() => {
    const p = readParams();
    setQ(p.q);
    setCat(p.cat);
    setBrand(p.brand);
    try {
      const saved = JSON.parse(localStorage.getItem(LIST_KEY) ?? "[]");
      if (Array.isArray(saved)) setList(saved.filter((x) => typeof x === "string"));
    } catch {}
    ready.current = true;
    fetch("/catalogo.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setItems(d.itens))
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    try {
      localStorage.setItem(LIST_KEY, JSON.stringify(list));
    } catch {}
  }, [list]);

  // Mantém filtros na URL para poder compartilhar o link.
  useEffect(() => {
    if (!ready.current) return;
    const p = new URLSearchParams();
    if (q) p.set("busca", q);
    if (cat) p.set("categoria", cat);
    if (brand) p.set("marca", brand);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    setLimit(PAGE);
  }, [q, cat, brand]);

  const indexed = useMemo(
    () => (items ?? []).map((it) => ({ it, key: norm(`${it.n} ${it.m} ${it.id} ${it.v.join(" ")}`) })),
    [items],
  );

  const brands = useMemo(() => {
    const count = new Map<string, number>();
    for (const it of items ?? []) if (it.m && (!cat || it.c === cat)) count.set(it.m, (count.get(it.m) ?? 0) + 1);
    return [...count.entries()].sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
  }, [items, cat]);

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    return indexed
      .filter(({ it, key }) => (!cat || it.c === cat) && (!brand || it.m === brand) && terms.every((t) => key.includes(t)))
      .map(({ it }) => it);
  }, [indexed, q, cat, brand]);

  const byId = useMemo(() => new Map((items ?? []).map((it) => [it.id, it])), [items]);
  const listItems = list.map((id) => byId.get(id)).filter((x): x is Item => Boolean(x));
  const inList = (id: string) => list.includes(id);
  const toggle = (id: string) => setList((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  const listMessage =
    "Olá, JacoSeg! Montei esta lista no catálogo do site e gostaria de um orçamento:\n\n" +
    listItems.map((it) => `• ${itemLine(it)}`).join("\n") +
    "\n\nQuantidades e tamanhos: ";

  const catTitle = cat === "outros" ? "Outros itens" : categories.find((c) => c.id === cat)?.title;
  const chip = (active: boolean) =>
    cn(
      "inline-flex min-h-11 cursor-pointer items-center gap-2 border px-3.5 text-sm transition-colors",
      active ? "border-ink bg-ink text-bone" : "border-[#bfbaae] text-ink hover:border-ink",
    );

  return (
    <>
      {/* Busca */}
      <section className="bg-ink pb-10 text-bone">
        <Container>
          <form role="search" className="flex flex-wrap gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="busca" className="sr-only">
              Buscar no catálogo
            </label>
            <div className="flex min-h-[60px] min-w-0 flex-[1_1_420px] items-center gap-3 bg-paper px-5 text-ink">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5c5a52" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
              <input
                id="busca"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Busque por produto, marca, código ou CA"
                className="min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-graphite"
                autoComplete="off"
              />
            </div>
            <label htmlFor="marca" className="sr-only">
              Marca
            </label>
            <select
              id="marca"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="min-h-[60px] flex-[1_1_240px] cursor-pointer border border-ink-border bg-ink px-4 text-[15px] text-bone sm:flex-[0_1_260px]"
            >
              <option value="">Todas as marcas</option>
              {brand && !brands.some(([b]) => b === brand) && <option value={brand}>{brand}</option>}
              {brands.map(([b, n]) => (
                <option key={b} value={b}>
                  {b} ({n})
                </option>
              ))}
            </select>
          </form>
        </Container>
      </section>

      {/* Categorias */}
      <section className="border-b border-line bg-paper">
        <Container className="py-6">
          <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={!cat} onClick={() => setCat("")} className={chip(!cat)}>
              Todos <span className={cn("font-tech text-[11px]", !cat ? "text-fog" : "text-graphite")}>{total.toLocaleString("pt-BR")}</span>
            </button>
            {[...categories, { id: "outros", title: "Outros itens", count: otherCount }].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cat === c.id}
                onClick={() => setCat(cat === c.id ? "" : c.id)}
                className={chip(cat === c.id)}
              >
                {c.title}
                <span className={cn("font-tech text-[11px]", cat === c.id ? "text-fog" : "text-graphite")}>
                  {c.count.toLocaleString("pt-BR")}
                </span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Resultados */}
      <section className={cn("pt-10 pb-28", listItems.length > 0 && "pb-40")}>
        <Container>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4" aria-live="polite">
            <p className="text-[15px] text-graphite">
              {items ? (
                <>
                  <strong className="font-semibold text-ink">
                    {results.length.toLocaleString("pt-BR")} {results.length === 1 ? "item" : "itens"}
                  </strong>{" "}
                  {catTitle ? `em ${catTitle}` : "em todas as linhas"}
                  {brand && ` · ${brand}`}
                  {q && ` · “${q}”`}
                </>
              ) : failed ? (
                "Não foi possível carregar o catálogo agora."
              ) : (
                "Carregando o catálogo…"
              )}
            </p>
            {(q || cat || brand) && (
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setCat("");
                  setBrand("");
                }}
                className="font-tech min-h-11 cursor-pointer text-xs tracking-[0.08em] text-graphite uppercase underline-offset-4 hover:text-ink hover:underline"
              >
                Limpar filtros
              </button>
            )}
          </div>

          {!items && !failed && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-[200px] animate-pulse border border-line bg-white" />
              ))}
            </div>
          )}

          {items && results.length === 0 && (
            <div className="border border-line bg-white p-8 sm:p-10">
              <p className="font-display mb-2 text-2xl font-semibold">Nada encontrado com esses filtros.</p>
              <p className="mb-6 max-w-[560px] text-graphite">
                Tente outra palavra ou fale direto com a loja. Muita coisa sai por encomenda e nem tudo está no site.
              </p>
              <a
                href={whatsappLink(stores[0].whatsapp, `Olá, JacoSeg! Procuro: ${q}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center bg-safety px-5 font-semibold text-ink hover:bg-[#ffc51a]"
              >
                Perguntar no WhatsApp →
              </a>
            </div>
          )}

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.slice(0, limit).map((it) => {
              const added = inList(it.id);
              return (
                <li key={it.id} className="flex flex-col border border-line bg-white p-6">
                  <div className="font-tech mb-3.5 flex justify-between gap-3 text-xs">
                    <span className="tracking-[0.06em] uppercase">{it.m || " "}</span>
                    <span className="shrink-0 text-graphite">Cód. {it.id}</span>
                  </div>
                  <h3 className="font-display mb-5 text-lg leading-snug font-semibold break-words">{it.n}</h3>
                  <div className="mt-auto">
                    {it.v.length > 0 && (
                      <>
                        <p className="font-tech mb-2 text-[11px] tracking-[0.08em] text-graphite uppercase">{variationLabel(it)}</p>
                        <ul className="mb-5 flex flex-wrap gap-1" aria-label={variationLabel(it)}>
                          {it.v.map((v) => (
                            <li key={v} className="font-tech border border-line px-1.5 py-0.5 text-[11px] text-graphite">
                              {v.replace(/^nº\s*/i, "")}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => toggle(it.id)}
                        aria-pressed={added}
                        className={cn(
                          "inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border px-3.5 text-sm font-semibold transition-colors",
                          added ? "border-ink bg-ink text-bone hover:bg-[#2a2924]" : "border-ink text-ink hover:bg-stone",
                        )}
                      >
                        {added ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                              <path d="M5 12l5 5L20 7" />
                            </svg>
                            Na lista
                          </>
                        ) : (
                          "+ Adicionar à lista"
                        )}
                      </button>
                      <a
                        href={whatsappLink(stores[0].whatsapp, `Olá, JacoSeg! Quero consultar: ${itemLine(it)}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Consultar ${it.n} no WhatsApp`}
                        title="Consultar no WhatsApp"
                        className="inline-flex min-h-11 min-w-11 items-center justify-center bg-safety text-ink transition-colors hover:bg-[#ffc51a]"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {results.length > limit && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setLimit((l) => l + PAGE)}
                className="min-h-[52px] cursor-pointer border border-ink px-7 font-semibold transition-colors hover:bg-ink hover:text-bone"
              >
                Carregar mais {Math.min(PAGE, results.length - limit)}
              </button>
            </div>
          )}

          <div className="mt-20 flex flex-wrap justify-between gap-x-16 gap-y-6 border-t-2 border-ink pt-7">
            <h2 className="font-display flex-[1_1_320px] text-[28px] leading-tight font-semibold">Não achou o que procura?</h2>
            <p className="flex-[1_1_420px] text-graphite">
              O catálogo mostra o que mais sai nas lojas, mas a gente trabalha com muito mais coisa e encomenda por pedido.
              Mande a descrição ou uma foto pelo{" "}
              <a
                href={whatsappLink(stores[0].whatsapp, "Olá, JacoSeg! Procuro um item que não achei no catálogo: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline underline-offset-4"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Lista de orçamento */}
      {listItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-ink text-bone shadow-[0_-8px_24px_rgba(0,0,0,0.18)]">
          {listOpen && (
            <div id="lista-orcamento" className="max-h-[50vh] overflow-y-auto border-b border-ink-line">
              <Container className="py-4">
                <ul className="flex flex-col">
                  {listItems.map((it) => (
                    <li key={it.id} className="flex items-center justify-between gap-4 border-b border-ink-line py-2.5 last:border-0">
                      <span className="min-w-0 text-sm">
                        <span className="font-tech mr-2 text-[11px] text-fog">{it.id}</span>
                        {it.n}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggle(it.id)}
                        aria-label={`Remover ${it.n} da lista`}
                        className="flex size-11 shrink-0 cursor-pointer items-center justify-center text-fog hover:text-bone"
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <path d="M4 4l12 12M16 4L4 16" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setList([]);
                    setListOpen(false);
                  }}
                  className="font-tech mt-2 min-h-11 cursor-pointer text-xs tracking-[0.08em] text-fog uppercase hover:text-bone"
                >
                  Esvaziar lista
                </button>
              </Container>
            </div>
          )}
          <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3 sm:py-4">
            <div className="flex min-w-0 flex-[1_1_280px] items-center gap-4">
              <span className="font-display text-[28px] leading-none font-bold text-safety">{listItems.length}</span>
              <div className="min-w-0">
                <p className="font-semibold">
                  {listItems.length === 1 ? "item na sua lista" : "itens na sua lista"}
                  <span className="font-normal text-fog sm:hidden">. Envie para:</span>
                </p>
                <p className="hidden truncate text-[13px] text-fog sm:block">{listItems.map((it) => it.n).join(", ")}</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:flex-wrap">
              <button
                type="button"
                onClick={() => setListOpen((o) => !o)}
                aria-expanded={listOpen}
                aria-controls="lista-orcamento"
                className="min-h-12 cursor-pointer border border-ink-border px-3 text-[15px] hover:border-fog sm:px-4"
              >
                {listOpen ? "Fechar" : "Ver lista"}
              </button>
              {stores.map((s, i) => (
                <a
                  key={s.id}
                  href={whatsappLink(s.whatsapp, listMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enviar a lista para a loja de ${s.city} pelo WhatsApp`}
                  className={cn(
                    "inline-flex min-h-12 items-center justify-center px-3 text-[15px] font-semibold sm:px-5",
                    i === 0 ? "bg-safety text-ink hover:bg-[#ffc51a]" : "border border-safety text-safety hover:bg-safety/10",
                  )}
                >
                  <span className="hidden sm:inline">Enviar para&nbsp;</span>
                  {s.city} →
                </a>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
