import "./globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";

// Fontes salvas no projeto: o build não depende do Google Fonts.
const inter = localFont({ src: "../fonts/inter-latin-wght-normal.woff2", weight: "100 900", variable: "--font-sans" });

const loraHeading = localFont({ src: "../fonts/lora-latin-wght-normal.woff2", weight: "400 700", variable: "--font-heading" });

const dmSans = localFont({ src: "../fonts/dm-sans-latin-wght-normal.woff2", weight: "100 1000", variable: "--font-body", display: "swap" });

export const metadata = {
  title: "JacoSeg — Soluções em Segurança do Trabalho",
  description:
    "Desde 2009 fornecendo EPIs, EPCs e ferramentas de alta qualidade. Proteção, inovação e excelência para a segurança no trabalho.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn(dmSans.variable, "font-sans", inter.variable, loraHeading.variable)}>
      <body className="font-[family-name:var(--font-body)] antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
