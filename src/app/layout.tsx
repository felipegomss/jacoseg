import "./globals.css";
import { Space_Grotesk, DM_Sans, Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const loraHeading = Lora({subsets:['latin'],variable:'--font-heading'});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

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
