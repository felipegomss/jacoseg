"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "./pagination";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Solicitacao {
  id: string;
  quantidade: number | null;
  prioridade: "BAIXA" | "MEDIA" | "ALTA";
  status: string;
  criadoEm: Date;
  compradoEm: Date | null;
  descartadoEm: Date | null;
  filial: string;
  produto: { codigo: string; nome: string; fornecedor: { nome: string } };
  criadoPor: { name: string };
  atualizadoPor: { name: string } | null;
}

interface Props {
  solicitacoes: Solicitacao[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const prioridadeBadge = {
  BAIXA: "secondary" as const,
  MEDIA: "outline" as const,
  ALTA: "destructive" as const,
};

const prioridadeLabel = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
};

export function HistoricoTable({
  solicitacoes,
  page,
  pageSize,
  total,
  totalPages,
}: Props) {
  if (solicitacoes.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-12 shadow-xs text-center">
        <p className="text-muted-foreground">Nenhum registro encontrado.</p>
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
              <TableHead className="text-center">Qtd</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado por</TableHead>
              <TableHead>Finalizado por</TableHead>
              <TableHead>Criação</TableHead>
              <TableHead>Finalização</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solicitacoes.map((s) => {
              const dataFinal = s.compradoEm || s.descartadoEm;
              return (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-sm">
                    {s.produto.codigo}
                  </TableCell>
                  <TableCell className="font-medium">
                    {s.produto.nome}
                  </TableCell>
                  <TableCell>{s.produto.fornecedor.nome}</TableCell>
                  <TableCell className="text-center tabular-nums">
                    {s.quantidade ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={prioridadeBadge[s.prioridade]}>
                      {prioridadeLabel[s.prioridade]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.status === "COMPRADA" ? "default" : "secondary"
                      }
                      className={
                        s.status === "COMPRADA"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }
                    >
                      {s.status === "COMPRADA" ? "Comprada" : "Descartada"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {s.criadoPor.name}
                  </TableCell>
                  <TableCell className="text-sm">
                    {s.atualizadoPor?.name || "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(s.criadoEm), "dd/MM/yy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {dataFinal
                      ? format(new Date(dataFinal), "dd/MM/yy", {
                          locale: ptBR,
                        })
                      : "—"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
}
