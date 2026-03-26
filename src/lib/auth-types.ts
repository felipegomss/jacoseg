import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "VENDAS" | "COMPRAS";
    };
  }

  interface User {
    role: "VENDAS" | "COMPRAS";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "VENDAS" | "COMPRAS";
  }
}
