import { prisma } from "@/lib/db";
import { FornecedoresTable } from "@/components/dashboard/fornecedores-table";

export const metadata = { title: "Fornecedores — JacoSeg" };

interface Props {
  searchParams: Promise<{ page?: string; busca?: string }>;
}

export default async function FornecedoresPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = 15;
  const skip = (page - 1) * pageSize;

  const where = params.busca
    ? { nome: { contains: params.busca, mode: "insensitive" as const } }
    : {};

  const [fornecedores, total] = await Promise.all([
    prisma.fornecedor.findMany({
      where,
      orderBy: { nome: "asc" },
      skip,
      take: pageSize,
    }),
    prisma.fornecedor.count({ where }),
  ]);

  return (
    <FornecedoresTable
      fornecedores={fornecedores}
      page={page}
      pageSize={pageSize}
      total={total}
      totalPages={Math.ceil(total / pageSize)}
      busca={params.busca}
    />
  );
}
