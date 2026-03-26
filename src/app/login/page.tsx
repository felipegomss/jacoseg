import { LoginForm } from "./login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export const metadata = { title: "Login — JacoSeg" };

export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.id) {
    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true },
    });
    // Só redireciona se o user realmente existe no banco
    if (dbUser) redirect("/painel/solicitacoes");
    // Se não existe, mostra o form de login (o login vai gerar um JWT novo)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-gray-900">
            JacoSeg
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sistema de Reposição de Produtos
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
