import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/site/header";
import SiteFooter from "@/components/site/footer";
import WhatsAppFloat from "@/components/site/whatsapp-float";
import { BASE_URL, JsonLd, ogFor, siteGraph } from "@/lib/seo";
import { cn } from "@/lib/utils";

const archivo = localFont({ src: "../../fonts/archivo-latin-wght-normal.woff2", weight: "100 900", variable: "--font-archivo", display: "swap" });
const jetbrains = localFont({ src: "../../fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Loja de EPI em Jacobina e Irecê, BA | JacoSeg",
    template: "%s | JacoSeg",
  },
  description:
    "EPI com CA válido, ferramentas e material de obra para parques eólicos, mineração, construção, indústria e campo. Mais de 7 mil itens de 180 marcas em duas lojas, em Jacobina e Irecê, na Bahia. Desde 2009.",
  applicationName: "JacoSeg",
  robots: { index: true, follow: true },
  openGraph: ogFor("/"),
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        archivo.variable,
        jetbrains.variable,
        "min-h-screen bg-paper font-[family-name:var(--font-sans)] text-base leading-relaxed text-ink",
      )}
      id="topo"
    >
      <JsonLd data={siteGraph()} />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-safety focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
