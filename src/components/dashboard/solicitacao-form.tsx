"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FornecedorCombobox } from "./fornecedor-combobox";
import { buscarProdutoPorCodigo } from "@/lib/actions";
import { Loader2 } from "lucide-react";

interface Props {
  defaultValues?: {
    codigoProduto: string;
    nomeProduto: string;
    fornecedorNome: string;
    quantidade: number | null;
    prioridade: string;
    filial: string;
    observacao: string;
    produtoExiste?: boolean;
  };
  fornecedores: { id: string; nome: string }[];
  onSubmit: (formData: FormData) => Promise<{ success?: boolean; error?: Record<string, string[]> }>;
  onSuccess?: () => void;
  submitLabel: string;
}

export function SolicitacaoForm({
  defaultValues,
  fornecedores,
  onSubmit,
  onSuccess,
  submitLabel,
}: Props) {
  const [nome, setNome] = useState(defaultValues?.nomeProduto || "");
  const [fornecedor, setFornecedor] = useState(defaultValues?.fornecedorNome || "");
  const [prioridade, setPrioridade] = useState(defaultValues?.prioridade || "MEDIA");
  const [filial, setFilial] = useState(defaultValues?.filial || "TODAS");
  const [produtoExiste, setProdutoExiste] = useState(defaultValues?.produtoExiste || false);
  const [loading, setLoading] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleCodigoBlur(e: React.FocusEvent<HTMLInputElement>) {
    const codigo = e.target.value.trim();
    if (!codigo) {
      setProdutoExiste(false);
      return;
    }
    setBuscando(true);
    const produto = await buscarProdutoPorCodigo(codigo);
    setBuscando(false);
    if (produto) {
      setNome(produto.nome);
      setFornecedor(produto.fornecedorNome);
      setProdutoExiste(true);
    } else {
      setNome("");
      setFornecedor("");
      setProdutoExiste(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    formData.set("nomeProduto", nome);
    formData.set("fornecedorNome", fornecedor);
    formData.set("prioridade", prioridade);
    formData.set("filial", filial);
    const result = await onSubmit(formData);

    setLoading(false);

    if (result.error) {
      setErrors(result.error);
    } else if (result.success) {
      onSuccess?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="codigoProduto">Código do Produto</Label>
        <div className="relative">
          <Input
            id="codigoProduto"
            name="codigoProduto"
            defaultValue={defaultValues?.codigoProduto}
            onBlur={handleCodigoBlur}
            required
            placeholder="Ex: EPI-001"
          />
          {buscando && (
            <Loader2
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground"
            />
          )}
        </div>
        {produtoExiste && (
          <p className="text-xs text-green-600">Produto encontrado — nome e fornecedor preenchidos automaticamente.</p>
        )}
        {errors.codigoProduto && (
          <p className="text-xs text-destructive">{errors.codigoProduto[0]}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nomeProduto">Nome do Produto</Label>
          <Input
            id="nomeProduto"
            name="nomeProduto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Nome do produto"
            disabled={produtoExiste}
          />
          {errors.nomeProduto && (
            <p className="text-xs text-destructive">{errors.nomeProduto[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Fornecedor</Label>
          {produtoExiste ? (
            <>
              <Input value={fornecedor} disabled />
              <input type="hidden" name="fornecedorNome" value={fornecedor} />
            </>
          ) : (
            <FornecedorCombobox
              fornecedores={fornecedores}
              value={fornecedor}
              onChange={setFornecedor}
              name="fornecedorNome"
            />
          )}
          {errors.fornecedorNome && (
            <p className="text-xs text-destructive">{errors.fornecedorNome[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="quantidade">Quantidade</Label>
          <Input
            id="quantidade"
            name="quantidade"
            type="number"
            min={1}
            defaultValue={defaultValues?.quantidade ?? ""}
            placeholder="Opcional"
          />
          {errors.quantidade && (
            <p className="text-xs text-destructive">{errors.quantidade[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Prioridade</Label>
          <Select value={prioridade} onValueChange={(v) => setPrioridade(v || "MEDIA")}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BAIXA">Baixa</SelectItem>
              <SelectItem value="MEDIA">Média</SelectItem>
              <SelectItem value="ALTA">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Filial</Label>
          <Select value={filial} onValueChange={(v) => setFilial(v || "TODAS")}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODAS">Todas</SelectItem>
              <SelectItem value="IRECE">Irecê</SelectItem>
              <SelectItem value="JACOBINA">Jacobina</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacao">Observação</Label>
        <Textarea
          id="observacao"
          name="observacao"
          defaultValue={defaultValues?.observacao}
          placeholder="Observações adicionais (opcional)"
          rows={3}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 size={16} className="mr-1 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
