"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination } from "./pagination";
import { criarFornecedor, editarFornecedor, excluirFornecedor } from "@/lib/actions";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Pencil, Trash2, Search, EllipsisVerticalIcon } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Fornecedor {
  id: string;
  nome: string;
  createdAt: Date;
}

interface Props {
  fornecedores: Fornecedor[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  busca?: string;
}

function FornecedorForm({
  defaultValues,
  onSubmit,
  submitLabel,
}: {
  defaultValues?: { nome?: string };
  onSubmit: (fd: FormData) => Promise<void>;
  submitLabel: string;
}) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit(new FormData(e.currentTarget));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome do Fornecedor</Label>
        <Input id="nome" name="nome" defaultValue={defaultValues?.nome} required placeholder="Nome do fornecedor" />
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

export function FornecedoresTable({ fornecedores, page, pageSize, total, totalPages, busca }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createOpen, setCreateOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const editFornecedor = fornecedores.find((f) => f.id === editId);
  const { confirm, ConfirmDialog } = useConfirm();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const val = (fd.get("busca") as string)?.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (val) { params.set("busca", val); } else { params.delete("busca"); }
    params.delete("page");
    router.push(`?${params.toString()}`);
  }

  async function handleCreate(fd: FormData) {
    const res = await criarFornecedor(fd);
    if ("error" in res) { toast.error(res.error as string); return; }
    toast.success("Fornecedor criado");
    setCreateOpen(false);
  }

  async function handleEdit(fd: FormData) {
    if (!editId) return;
    const res = await editarFornecedor(editId, fd);
    if ("error" in res) { toast.error(res.error as string); return; }
    toast.success("Fornecedor atualizado");
    setEditId(null);
  }

  async function handleDelete(id: string) {
    const ok = await confirm({
      title: "Excluir fornecedor",
      description: "Deseja realmente excluir este fornecedor? Essa ação não pode ser desfeita.",
      confirmLabel: "Excluir",
      variant: "destructive",
    });
    if (!ok) return;
    const res = await excluirFornecedor(id);
    if ("error" in res) { toast.error(res.error as string); return; }
    toast.success("Fornecedor excluído");
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Fornecedores</h1>
          <p className="mt-1 text-sm text-muted-foreground">{total} fornecedores cadastrados</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger render={<Button />}>
            <Plus size={16} className="mr-1" /> Novo Fornecedor
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader><DialogTitle>Novo Fornecedor</DialogTitle></DialogHeader>
            <FornecedorForm onSubmit={handleCreate} submitLabel="Criar" />
          </DialogContent>
        </Dialog>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input name="busca" defaultValue={busca} placeholder="Buscar fornecedor..." className="pl-9" />
        </div>
        <Button type="submit" variant="outline" size="sm">Buscar</Button>
      </form>

      <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fornecedores.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="py-8 text-center text-muted-foreground">Nenhum fornecedor encontrado.</TableCell></TableRow>
            ) : (
              fornecedores.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.nome}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{format(new Date(f.createdAt), "dd/MM/yy", { locale: ptBR })}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
                        <EllipsisVerticalIcon className="size-4" />
                        <span className="sr-only">Ações</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditId(f.id)}>
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(f.id)} className="text-destructive">
                          <Trash2 className="size-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination page={page} pageSize={pageSize} total={total} totalPages={totalPages} />

      <Dialog open={!!editId} onOpenChange={(o) => !o && setEditId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Editar Fornecedor</DialogTitle></DialogHeader>
          {editFornecedor && (
            <FornecedorForm defaultValues={{ nome: editFornecedor.nome }} onSubmit={handleEdit} submitLabel="Salvar" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
