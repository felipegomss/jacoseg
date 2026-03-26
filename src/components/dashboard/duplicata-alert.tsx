"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { aumentarPrioridade } from "@/lib/actions";
import { toast } from "sonner";

interface Duplicata {
  id: string;
  produtoNome: string;
  filial: string;
  prioridade: string;
  quantidade: number | null;
  criadoPor: string;
}

interface Props {
  duplicata: Duplicata | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
}

const prioridadeLabel: Record<string, string> = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
};

export function DuplicataAlert({ duplicata, open, onOpenChange, onCancel }: Props) {
  if (!duplicata) return null;

  const jaMaxima = duplicata.prioridade === "ALTA";

  async function handleAumentarPrioridade() {
    if (!duplicata) return;
    const result = await aumentarPrioridade(duplicata.id);
    if ("error" in result) {
      toast.error(result.error as string);
    } else {
      toast.success(`Prioridade aumentada para ${prioridadeLabel[result.novaPrioridade as string]}`);
    }
    onOpenChange(false);
    onCancel();
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Solicitação já existente</AlertDialogTitle>
          <AlertDialogDescription>
            Já existe uma solicitação pendente para <strong>{duplicata.produtoNome}</strong> na
            filial <strong>{duplicata.filial}</strong>.
            <br />
            <br />
            Prioridade atual: <strong>{prioridadeLabel[duplicata.prioridade]}</strong>
            {duplicata.quantidade && <> &middot; Quantidade: <strong>{duplicata.quantidade}</strong></>}
            <> &middot; Criada por: <strong>{duplicata.criadoPor}</strong></>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => { onOpenChange(false); onCancel(); }}>
            Cancelar
          </AlertDialogCancel>
          {!jaMaxima ? (
            <AlertDialogAction onClick={handleAumentarPrioridade}>
              Aumentar Prioridade
            </AlertDialogAction>
          ) : (
            <AlertDialogAction disabled onClick={() => { onOpenChange(false); onCancel(); }}>
              Já está em Alta
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
