import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export const solicitacaoSchema = z.object({
  codigoProduto: z.string().min(1, "Código obrigatório"),
  nomeProduto: z.string().min(1, "Nome obrigatório"),
  fornecedorNome: z.string().min(1, "Fornecedor obrigatório"),
  quantidade: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce.number().int().min(1, "Mínimo 1").optional()
  ),
  prioridade: z.enum(["BAIXA", "MEDIA", "ALTA"]),
  filial: z.enum(["IRECE", "JACOBINA", "TODAS"]),
  observacao: z.string().optional(),
});

export type SolicitacaoFormData = z.infer<typeof solicitacaoSchema>;
