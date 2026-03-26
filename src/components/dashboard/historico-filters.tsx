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
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface Props {
  busca?: string;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
}

export function HistoricoFilters({ busca, status, dataInicio, dataFim }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusValue, setStatusValue] = useState(status || "todos");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const buscaVal = (fd.get("busca") as string)?.trim();
    if (buscaVal) params.set("busca", buscaVal);
    if (statusValue && statusValue !== "todos") params.set("status", statusValue);
    const di = fd.get("dataInicio") as string;
    if (di) params.set("dataInicio", di);
    const df = fd.get("dataFim") as string;
    if (df) params.set("dataFim", df);

    router.push(`?${params.toString()}`);
  }

  function handleClear() {
    setStatusValue("todos");
    router.push("/painel/historico");
  }

  const hasFilters = !!(busca || status || dataInicio || dataFim);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] items-end gap-3 rounded-xl border bg-card p-4 shadow-xs"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="busca" className="text-xs">Buscar</Label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="busca"
            name="busca"
            defaultValue={busca}
            placeholder="Produto ou código..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label className="text-xs">Status</Label>
        <Select value={statusValue} onValueChange={(v) => setStatusValue(v || "todos")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="COMPRADA">Compradas</SelectItem>
            <SelectItem value="DESCARTADA">Descartadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="dataInicio" className="text-xs">Data início</Label>
        <Input
          id="dataInicio"
          name="dataInicio"
          type="date"
          defaultValue={dataInicio}
          className="w-[140px]"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="dataFim" className="text-xs">Data fim</Label>
        <Input
          id="dataFim"
          name="dataFim"
          type="date"
          defaultValue={dataFim}
          className="w-[140px]"
        />
      </div>

      <Button type="submit" size="sm">
        Filtrar
      </Button>

      {hasFilters ? (
        <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
          <X size={14} className="mr-1" />
          Limpar
        </Button>
      ) : (
        <div />
      )}
    </form>
  );
}
