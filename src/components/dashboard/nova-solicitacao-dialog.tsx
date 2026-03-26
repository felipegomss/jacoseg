"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SolicitacaoForm } from "./solicitacao-form";
import { DuplicataAlert } from "./duplicata-alert";
import { criarSolicitacao, verificarDuplicata } from "@/lib/actions";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  fornecedores: { id: string; nome: string }[];
}

export function NovaSolicitacaoDialog({ children, fornecedores }: Props) {
  const [open, setOpen] = useState(false);
  const [duplicata, setDuplicata] = useState<Awaited<ReturnType<typeof verificarDuplicata>>>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const codigo = formData.get("codigoProduto") as string;
    const filial = formData.get("filial") as string;

    const dup = await verificarDuplicata(codigo, filial);
    if (dup) {
      setDuplicata(dup);
      setAlertOpen(true);
      return { error: {} as Record<string, string[]> };
    }

    const result = await criarSolicitacao(formData);
    if (result.success) {
      toast.success("Solicitação criada com sucesso");
    }
    return result;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={children as React.ReactElement}>{}</DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova Solicitação</DialogTitle>
          </DialogHeader>
          <SolicitacaoForm
            fornecedores={fornecedores}
            onSubmit={handleSubmit}
            onSuccess={() => setOpen(false)}
            submitLabel="Criar Solicitação"
          />
        </DialogContent>
      </Dialog>

      <DuplicataAlert
        duplicata={duplicata}
        open={alertOpen}
        onOpenChange={setAlertOpen}
        onCancel={() => setDuplicata(null)}
      />
    </>
  );
}
