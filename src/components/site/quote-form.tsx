"use client";

import { useState } from "react";
import { STORES, SECTORS, whatsappLink } from "@/lib/site-data";

const field =
  "min-h-12 w-full border border-ink-border bg-transparent px-3.5 py-3 text-base text-bone placeholder:text-fog/70 focus:border-safety focus:outline-none";
const label = "flex flex-col gap-2 text-sm text-mist";

export default function QuoteForm() {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "").trim();
    const pedido = String(data.get("pedido") ?? "").trim();
    if (!nome || !pedido) {
      setError("Preencha seu nome e o que você precisa.");
      return;
    }
    setError(null);
    const store = STORES.find((s) => s.id === data.get("loja")) ?? STORES[0];
    const empresa = String(data.get("empresa") ?? "").trim();
    const telefone = String(data.get("telefone") ?? "").trim();
    const setor = String(data.get("setor") ?? "").trim();

    const linhas = [
      `Olá, JacoSeg ${store.city}! Gostaria de um orçamento.`,
      "",
      `Nome: ${nome}`,
      empresa ? `Empresa: ${empresa}` : null,
      telefone ? `Telefone: ${telefone}` : null,
      setor ? `Setor: ${setor}` : null,
      "",
      pedido,
    ].filter((l): l is string => l !== null);

    window.open(whatsappLink(store.whatsapp, linhas.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 content-start gap-5 sm:grid-cols-2">
      <label className={label}>
        Nome
        <input name="nome" type="text" autoComplete="name" required className={field} />
      </label>
      <label className={label}>
        Empresa (opcional)
        <input name="empresa" type="text" autoComplete="organization" className={field} />
      </label>
      <label className={label}>
        Telefone / WhatsApp
        <input name="telefone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className={label}>
        Loja mais próxima
        <select name="loja" className={`${field} bg-ink`} defaultValue="jacobina">
          {STORES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.city}
            </option>
          ))}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        Setor
        <select name="setor" className={`${field} bg-ink`} defaultValue="">
          <option value="">Selecione</option>
          {SECTORS.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Outro">Outro</option>
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        O que você precisa?
        <textarea
          name="pedido"
          rows={5}
          required
          placeholder="Ex.: 10 cinturões paraquedista, 10 talabartes duplos, botinas nº 39 a 44…"
          className={`${field} resize-y`}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-safety sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 bg-bone px-7 font-semibold text-ink transition-colors hover:bg-white"
        >
          Enviar pedido
        </button>
        <span className="text-sm text-fog">Abre o WhatsApp da loja escolhida com a mensagem pronta.</span>
      </div>
    </form>
  );
}
