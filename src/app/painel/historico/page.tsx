import { prisma } from "@/lib/db";
import { HistoricoTable } from "@/components/dashboard/historico-table";
import { HistoricoFilters } from "@/components/dashboard/historico-filters";
import type { StatusSolicitacao } from "@/generated/prisma/client";

export const metadata = { title: "Histórico — JacoSeg" };

interface Props {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    busca?: string;
    status?: string;
    dataInicio?: string;
    dataFim?: string;
  }>;
}

export default async function HistoricoPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Math.min(50, Number(params.pageSize) || 10));
  const skip = (page - 1) * pageSize;

  const statusFilter: StatusSolicitacao[] = params.status === "COMPRADA"
    ? ["COMPRADA"]
    : params.status === "DESCARTADA"
      ? ["DESCARTADA"]
      : ["COMPRADA", "DESCARTADA"];

  const where: Record<string, unknown> = {
    status: { in: statusFilter },
  };

  if (params.busca) {
    where.OR = [
      { produto: { nome: { contains: params.busca, mode: "insensitive" } } },
      { produto: { codigo: { contains: params.busca, mode: "insensitive" } } },
    ];
  }

  if (params.dataInicio || params.dataFim) {
    const dateFilter: Record<string, Date> = {};
    if (params.dataInicio) dateFilter.gte = new Date(params.dataInicio);
    if (params.dataFim) {
      const fim = new Date(params.dataFim);
      fim.setHours(23, 59, 59, 999);
      dateFilter.lte = fim;
    }
    where.OR = undefined;
    where.AND = [
      ...(params.busca
        ? [
            {
              OR: [
                { produto: { nome: { contains: params.busca, mode: "insensitive" } } },
                { produto: { codigo: { contains: params.busca, mode: "insensitive" } } },
              ],
            },
          ]
        : []),
      {
        OR: [
          { compradoEm: dateFilter },
          { descartadoEm: dateFilter },
        ],
      },
    ];
  }

  const [solicitacoes, total] = await Promise.all([
    prisma.solicitacao.findMany({
      where: where as never,
      include: {
        produto: { include: { fornecedor: { select: { nome: true } } } },
        criadoPor: { select: { name: true } },
        atualizadoPor: { select: { name: true } },
      },
      orderBy: { atualizadoEm: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.solicitacao.count({ where: where as never }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">
          Histórico
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} {total === 1 ? "registro" : "registros"}
        </p>
      </div>

      <HistoricoFilters
        busca={params.busca}
        status={params.status}
        dataInicio={params.dataInicio}
        dataFim={params.dataFim}
      />

      <HistoricoTable
        solicitacoes={solicitacoes}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
}
