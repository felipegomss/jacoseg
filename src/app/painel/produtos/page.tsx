import { prisma } from "@/lib/db";
import { ProdutosTable } from "@/components/dashboard/produtos-table";

export const metadata = { title: "Produtos — JacoSeg" };

interface Props {
  searchParams: Promise<{ page?: string; busca?: string }>;
}

export default async function ProdutosPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = 15;
  const skip = (page - 1) * pageSize;

  const where = params.busca
    ? {
        OR: [
          { nome: { contains: params.busca, mode: "insensitive" as const } },
          { codigo: { contains: params.busca, mode: "insensitive" as const } },
          { fornecedor: { nome: { contains: params.busca, mode: "insensitive" as const } } },
        ],
      }
    : {};

  const [produtos, total, fornecedores] = await Promise.all([
    prisma.produto.findMany({
      where,
      include: { fornecedor: { select: { nome: true } } },
      orderBy: { nome: "asc" },
      skip,
      take: pageSize,
    }),
    prisma.produto.count({ where }),
    prisma.fornecedor.findMany({ orderBy: { nome: "asc" }, select: { id: true, nome: true } }),
  ]);

  return (
    <ProdutosTable
      produtos={produtos}
      fornecedores={fornecedores}
      page={page}
      pageSize={pageSize}
      total={total}
      totalPages={Math.ceil(total / pageSize)}
      busca={params.busca}
    />
  );
}
