"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Pencil, Check, Trash2 } from "lucide-react";
import { marcarComoComprada, descartarSolicitacao } from "@/lib/actions";
import { EditarSolicitacaoDialog } from "./editar-solicitacao-dialog";
import { Pagination } from "./pagination";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface Solicitacao {
  id: string;
  quantidade: number | null;
  observacao: string | null;
  prioridade: "BAIXA" | "MEDIA" | "ALTA";
  filial: "IRECE" | "JACOBINA" | "TODAS";
  criadoEm: Date;
  produto: { codigo: string; nome: string; fornecedor: { nome: string } };
  criadoPor: { name: string };
}

interface Props {
  solicitacoes: Solicitacao[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  userRole: "VENDAS" | "COMPRAS";
  fornecedores: { id: string; nome: string }[];
}

const filialLabel = { IRECE: "Irecê", JACOBINA: "Jacobina", TODAS: "Todas" };
const prioridadeBadge = { BAIXA: "secondary" as const, MEDIA: "outline" as const, ALTA: "destructive" as const };
const prioridadeLabel = { BAIXA: "Baixa", MEDIA: "Média", ALTA: "Alta" };

function RowActions({
  solicitacao,
  userRole,
  fornecedores,
}: {
  solicitacao: Solicitacao;
  userRole: "VENDAS" | "COMPRAS";
  fornecedores: { id: string; nome: string }[];
}) {
  const [editOpen, setEditOpen] = useState(false);
  const { confirm, ConfirmDialog } = useConfirm();

  async function handleComprar() {
    const ok = await confirm({
      title: "Confirmar compra",
      description: "Deseja marcar esta solicitação como comprada?",
      confirmLabel: "Comprada",
    });
    if (!ok) return;
    const result = await marcarComoComprada(solicitacao.id);
    if ("error" in result) toast.error(result.error as string);
    else if (result.success) toast.success("Marcada como comprada");
  }

  async function handleDescartar() {
    const ok = await confirm({
      title: "Descartar solicitação",
      description: "Deseja realmente descartar esta solicitação? Essa ação não pode ser desfeita.",
      confirmLabel: "Descartar",
      variant: "destructive",
    });
    if (!ok) return;
    const result = await descartarSolicitacao(solicitacao.id);
    if (result.success) toast.success("Solicitação descartada");
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
          <EllipsisVerticalIcon className="size-4" />
          <span className="sr-only">Ações</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" />
            Editar
          </DropdownMenuItem>
          {userRole === "COMPRAS" && (
            <DropdownMenuItem onClick={handleComprar} className="text-green-600">
              <Check className="size-4" />
              Comprada
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDescartar} className="text-destructive">
            <Trash2 className="size-4" />
            Descartar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditarSolicitacaoDialog
        solicitacao={solicitacao}
        fornecedores={fornecedores}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}

export function SolicitacoesTable({
  solicitacoes, page, pageSize, total, totalPages, userRole, fornecedores,
}: Props) {
  if (solicitacoes.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center shadow-xs">
        <p className="text-muted-foreground">Nenhuma solicitação pendente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Filial</TableHead>
              <TableHead className="text-center">Qtd</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Observação</TableHead>
              <TableHead>Criado por</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {solicitacoes.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono text-sm">{s.produto.codigo}</TableCell>
                <TableCell className="font-medium">{s.produto.nome}</TableCell>
                <TableCell>{s.produto.fornecedor.nome}</TableCell>
                <TableCell className="text-sm">{filialLabel[s.filial]}</TableCell>
                <TableCell className="text-center tabular-nums">
                  {s.quantidade ?? <span className="text-muted-foreground">—</span>}
                </TableCell>
                <TableCell>
                  <Badge variant={prioridadeBadge[s.prioridade]}>
                    {prioridadeLabel[s.prioridade]}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  {s.observacao ? (
                    <span className="block truncate text-sm text-muted-foreground" title={s.observacao}>
                      {s.observacao}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground/50">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm">{s.criadoPor.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(s.criadoEm), "dd/MM/yy", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <RowActions solicitacao={s} userRole={userRole} fornecedores={fornecedores} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={total} totalPages={totalPages} />
    </div>
  );
}
