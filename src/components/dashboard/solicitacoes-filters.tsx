"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface Props {
  fornecedores: { id: string; nome: string }[];
  fornecedorAtivo?: string;
  busca?: string;
}

export function SolicitacoesFilters({ fornecedores, fornecedorAtivo, busca }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fornecedorValue, setFornecedorValue] = useState(fornecedorAtivo || "todos");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const buscaVal = (fd.get("busca") as string)?.trim();
    if (buscaVal) params.set("busca", buscaVal);
    if (fornecedorValue && fornecedorValue !== "todos") params.set("fornecedor", fornecedorValue);

    router.push(`?${params.toString()}`);
  }

  function handleClear() {
    setFornecedorValue("todos");
    router.push("/painel/solicitacoes");
  }

  // Usa apenas as props do server para decidir se mostra o botão
  const hasFilters = Boolean(busca) || Boolean(fornecedorAtivo);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3"
    >
      <div className="relative min-w-[200px] flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="busca"
          defaultValue={busca}
          placeholder="Buscar por código ou nome do produto..."
          className="pl-9"
        />
      </div>

      <Select value={fornecedorValue} onValueChange={(v) => setFornecedorValue(v || "todos")}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Fornecedor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os fornecedores</SelectItem>
          {fornecedores.map((f) => (
            <SelectItem key={f.id} value={f.nome}>
              {f.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" size="sm">Filtrar</Button>

      {hasFilters ? (
        <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
          <X size={14} className="mr-1" />
          Limpar
        </Button>
      ) : null}
    </form>
  );
}
