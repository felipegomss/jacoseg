import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { SolicitacoesTable } from "@/components/dashboard/solicitacoes-table";
import { NovaSolicitacaoDialog } from "@/components/dashboard/nova-solicitacao-dialog";
import { SolicitacoesFilters } from "@/components/dashboard/solicitacoes-filters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata = { title: "Solicitações — JacoSeg" };

interface Props {
  searchParams: Promise<{ page?: string; pageSize?: string; fornecedor?: string; busca?: string }>;
}

export default async function SolicitacoesPage({ searchParams }: Props) {
  const session = await auth();
  const userRole = (session?.user as { role: "VENDAS" | "COMPRAS" }).role;
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Math.min(50, Number(params.pageSize) || 10));
  const skip = (page - 1) * pageSize;

  const conditions: unknown[] = [{ status: "PENDENTE" }];

  if (params.busca) {
    conditions.push({
      OR: [
        { produto: { codigo: { contains: params.busca, mode: "insensitive" } } },
        { produto: { nome: { contains: params.busca, mode: "insensitive" } } },
      ],
    });
  }

  if (params.fornecedor) {
    conditions.push({ produto: { fornecedor: { nome: params.fornecedor } } });
  }

  const where = conditions.length === 1 ? conditions[0] : { AND: conditions };

  const [solicitacoes, total, fornecedores] = await Promise.all([
    prisma.solicitacao.findMany({
      where: where as never,
      include: {
        produto: { include: { fornecedor: { select: { nome: true } } } },
        criadoPor: { select: { name: true } },
      },
      orderBy: [
        { prioridade: "desc" },
        { criadoEm: "desc" },
        { produto: { nome: "asc" } },
      ],
      skip,
      take: pageSize,
    }),
    prisma.solicitacao.count({ where: where as never }),
    prisma.fornecedor.findMany({ orderBy: { nome: "asc" }, select: { id: true, nome: true } }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Solicitações Pendentes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} {total === 1 ? "solicitação pendente" : "solicitações pendentes"}
          </p>
        </div>
        <NovaSolicitacaoDialog fornecedores={fornecedores}>
          <Button>
            <Plus size={16} className="mr-1" />
            Nova Solicitação
          </Button>
        </NovaSolicitacaoDialog>
      </div>

      <SolicitacoesFilters
        fornecedores={fornecedores}
        fornecedorAtivo={params.fornecedor}
        busca={params.busca}
      />

      <SolicitacoesTable
        solicitacoes={solicitacoes}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        userRole={userRole}
        fornecedores={fornecedores}
      />
    </div>
  );
}
