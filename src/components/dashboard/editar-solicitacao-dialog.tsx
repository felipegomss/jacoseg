"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SolicitacaoForm } from "./solicitacao-form";
import { editarSolicitacao } from "@/lib/actions";
import { toast } from "sonner";

interface Solicitacao {
  id: string;
  quantidade: number | null;
  observacao: string | null;
  prioridade: string;
  filial: string;
  produto: { codigo: string; nome: string; fornecedor: { nome: string } };
}

interface Props {
  solicitacao: Solicitacao;
  fornecedores: { id: string; nome: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditarSolicitacaoDialog({ solicitacao, fornecedores, open, onOpenChange }: Props) {
  async function handleSubmit(formData: FormData) {
    const result = await editarSolicitacao(solicitacao.id, formData);
    if (result.success) {
      toast.success("Solicitação atualizada");
    }
    return result;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Solicitação</DialogTitle>
        </DialogHeader>
        <SolicitacaoForm
          defaultValues={{
            codigoProduto: solicitacao.produto.codigo,
            nomeProduto: solicitacao.produto.nome,
            fornecedorNome: solicitacao.produto.fornecedor.nome,
            quantidade: solicitacao.quantidade,
            prioridade: solicitacao.prioridade,
            filial: solicitacao.filial,
            observacao: solicitacao.observacao || "",
            produtoExiste: true,
          }}
          fornecedores={fornecedores}
          onSubmit={handleSubmit}
          onSuccess={() => onOpenChange(false)}
          submitLabel="Salvar Alterações"
        />
      </DialogContent>
    </Dialog>
  );
}
