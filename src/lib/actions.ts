"use server";

import { prisma } from "@/lib/db";
import { auth, signOut } from "@/lib/auth";
import { solicitacaoSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

async function getSessionOrThrow() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Não autenticado");

  // Verifica se o usuário ainda existe no banco
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true },
  });

  if (!user) {
    await signOut({ redirect: true, redirectTo: "/login" });
    throw new Error("Sessão inválida");
  }

  return session;
}

// Garante que o fornecedor existe e retorna o id
async function upsertFornecedor(nome: string) {
  const trimmed = nome.trim();
  const f = await prisma.fornecedor.upsert({
    where: { nome: trimmed },
    update: {},
    create: { nome: trimmed },
  });
  return f.id;
}

export async function listarFornecedores() {
  return prisma.fornecedor.findMany({
    orderBy: { nome: "asc" },
    select: { id: true, nome: true },
  });
}

export async function buscarProdutoPorCodigo(codigo: string) {
  if (!codigo.trim()) return null;
  const produto = await prisma.produto.findUnique({
    where: { codigo: codigo.trim() },
    include: { fornecedor: { select: { nome: true } } },
  });
  if (!produto) return null;
  return {
    id: produto.id,
    nome: produto.nome,
    fornecedorNome: produto.fornecedor.nome,
    existe: true,
  };
}

// ─── Solicitações ───

export async function verificarDuplicata(codigoProduto: string, filial: string) {
  const produto = await prisma.produto.findUnique({ where: { codigo: codigoProduto } });
  if (!produto) return null;

  // Busca solicitação pendente para o mesmo produto e filial (ou TODAS)
  const duplicata = await prisma.solicitacao.findFirst({
    where: {
      produtoId: produto.id,
      status: "PENDENTE",
      OR: [
        { filial: filial as "IRECE" | "JACOBINA" | "TODAS" },
        { filial: "TODAS" },
        ...(filial !== "TODAS" ? [] : [{ filial: "IRECE" as const }, { filial: "JACOBINA" as const }]),
      ],
    },
    include: {
      produto: true,
      criadoPor: { select: { name: true } },
    },
  });

  if (!duplicata) return null;

  const filialLabel = { IRECE: "Irecê", JACOBINA: "Jacobina", TODAS: "Todas" };

  return {
    id: duplicata.id,
    produtoNome: duplicata.produto.nome,
    filial: filialLabel[duplicata.filial as keyof typeof filialLabel],
    prioridade: duplicata.prioridade,
    quantidade: duplicata.quantidade,
    criadoPor: duplicata.criadoPor.name,
  };
}

export async function aumentarPrioridade(id: string) {
  const session = await getSessionOrThrow();

  const solicitacao = await prisma.solicitacao.findUnique({ where: { id } });
  if (!solicitacao) return { error: "Solicitação não encontrada" };

  const next: Record<string, string> = { BAIXA: "MEDIA", MEDIA: "ALTA" };
  const novaPrioridade = next[solicitacao.prioridade];

  if (!novaPrioridade) return { error: "Já está na prioridade máxima (Alta)" };

  await prisma.solicitacao.update({
    where: { id },
    data: {
      prioridade: novaPrioridade as "BAIXA" | "MEDIA" | "ALTA",
      atualizadoPorId: session.user.id,
    },
  });

  revalidatePath("/painel/solicitacoes");
  return { success: true, novaPrioridade };
}

export async function criarSolicitacao(formData: FormData) {
  const session = await getSessionOrThrow();

  const raw = {
    codigoProduto: formData.get("codigoProduto"),
    nomeProduto: formData.get("nomeProduto"),
    fornecedorNome: formData.get("fornecedorNome"),
    quantidade: formData.get("quantidade"),
    prioridade: formData.get("prioridade"),
    filial: formData.get("filial"),
    observacao: formData.get("observacao"),
  };

  const parsed = solicitacaoSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const data = parsed.data;
  const fornecedorId = await upsertFornecedor(data.fornecedorNome);

  const produto = await prisma.produto.upsert({
    where: { codigo: data.codigoProduto },
    update: { nome: data.nomeProduto, fornecedorId },
    create: { codigo: data.codigoProduto, nome: data.nomeProduto, fornecedorId },
  });

  await prisma.solicitacao.create({
    data: {
      produtoId: produto.id,
      quantidade: data.quantidade ?? null,
      prioridade: data.prioridade,
      filial: data.filial,
      observacao: data.observacao || null,
      criadoPorId: session.user.id,
    },
  });

  revalidatePath("/painel/solicitacoes");
  return { success: true };
}

export async function editarSolicitacao(id: string, formData: FormData) {
  const session = await getSessionOrThrow();

  const raw = {
    codigoProduto: formData.get("codigoProduto"),
    nomeProduto: formData.get("nomeProduto"),
    fornecedorNome: formData.get("fornecedorNome"),
    quantidade: formData.get("quantidade"),
    prioridade: formData.get("prioridade"),
    filial: formData.get("filial"),
    observacao: formData.get("observacao"),
  };

  const parsed = solicitacaoSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const data = parsed.data;
  const fornecedorId = await upsertFornecedor(data.fornecedorNome);

  const produto = await prisma.produto.upsert({
    where: { codigo: data.codigoProduto },
    update: { nome: data.nomeProduto, fornecedorId },
    create: { codigo: data.codigoProduto, nome: data.nomeProduto, fornecedorId },
  });

  await prisma.solicitacao.update({
    where: { id },
    data: {
      produtoId: produto.id,
      quantidade: data.quantidade ?? null,
      prioridade: data.prioridade,
      filial: data.filial,
      observacao: data.observacao || null,
      atualizadoPorId: session.user.id,
    },
  });

  revalidatePath("/painel/solicitacoes");
  return { success: true };
}

export async function marcarComoComprada(id: string) {
  const session = await getSessionOrThrow();
  if (session.user.role === "VENDAS") {
    return { error: "Apenas o perfil COMPRAS pode marcar como comprada" };
  }

  await prisma.solicitacao.update({
    where: { id },
    data: { status: "COMPRADA", compradoEm: new Date(), atualizadoPorId: session.user.id },
  });

  revalidatePath("/painel/solicitacoes");
  revalidatePath("/painel/historico");
  return { success: true };
}

export async function descartarSolicitacao(id: string) {
  const session = await getSessionOrThrow();

  await prisma.solicitacao.update({
    where: { id },
    data: { status: "DESCARTADA", descartadoEm: new Date(), atualizadoPorId: session.user.id },
  });

  revalidatePath("/painel/solicitacoes");
  revalidatePath("/painel/historico");
  return { success: true };
}

// ─── Produtos ───

export async function criarProduto(formData: FormData) {
  await getSessionOrThrow();
  const codigo = (formData.get("codigo") as string)?.trim();
  const nome = (formData.get("nome") as string)?.trim();
  const fornecedorNome = (formData.get("fornecedor") as string)?.trim();
  if (!codigo || !nome || !fornecedorNome) return { error: "Campos obrigatórios" };

  const exists = await prisma.produto.findUnique({ where: { codigo } });
  if (exists) return { error: "Código já cadastrado" };

  const fornecedorId = await upsertFornecedor(fornecedorNome);
  await prisma.produto.create({ data: { codigo, nome, fornecedorId } });
  revalidatePath("/painel/produtos");
  return { success: true };
}

export async function editarProduto(id: string, formData: FormData) {
  await getSessionOrThrow();
  const nome = (formData.get("nome") as string)?.trim();
  const fornecedorNome = (formData.get("fornecedor") as string)?.trim();
  if (!nome || !fornecedorNome) return { error: "Campos obrigatórios" };

  const fornecedorId = await upsertFornecedor(fornecedorNome);
  await prisma.produto.update({ where: { id }, data: { nome, fornecedorId } });
  revalidatePath("/painel/produtos");
  return { success: true };
}

export async function excluirProduto(id: string) {
  await getSessionOrThrow();
  const hasRelations = await prisma.solicitacao.count({ where: { produtoId: id } });
  if (hasRelations > 0) return { error: "Produto possui solicitações vinculadas" };
  await prisma.produto.delete({ where: { id } });
  revalidatePath("/painel/produtos");
  return { success: true };
}

// ─── Fornecedores ───

export async function criarFornecedor(formData: FormData) {
  await getSessionOrThrow();
  const nome = (formData.get("nome") as string)?.trim();
  if (!nome) return { error: "Nome obrigatório" };

  const exists = await prisma.fornecedor.findUnique({ where: { nome } });
  if (exists) return { error: "Fornecedor já cadastrado" };

  await prisma.fornecedor.create({ data: { nome } });
  revalidatePath("/painel/fornecedores");
  return { success: true };
}

export async function editarFornecedor(id: string, formData: FormData) {
  await getSessionOrThrow();
  const nome = (formData.get("nome") as string)?.trim();
  if (!nome) return { error: "Nome obrigatório" };

  await prisma.fornecedor.update({ where: { id }, data: { nome } });
  revalidatePath("/painel/fornecedores");
  return { success: true };
}

export async function excluirFornecedor(id: string) {
  await getSessionOrThrow();
  const hasProducts = await prisma.produto.count({ where: { fornecedorId: id } });
  if (hasProducts > 0) return { error: "Fornecedor possui produtos vinculados" };
  await prisma.fornecedor.delete({ where: { id } });
  revalidatePath("/painel/fornecedores");
  return { success: true };
}
