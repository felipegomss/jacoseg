import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import SiteHeader from "@/components/site/header";
import SiteFooter from "@/components/site/footer";
import WhatsAppFloat from "@/components/site/whatsapp-float";
import { COMPANY, STORES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const archivo = Archivo({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-archivo", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jacoseg.com.br"),
  title: {
    default: "JacoSeg — EPI certificado em Jacobina e Irecê",
    template: "%s · JacoSeg",
  },
  description:
    "EPI, EPC e ferramentas para energia eólica, mineração, construção e agro no Centro-Norte baiano. Lojas em Jacobina e Irecê, estoque próprio e CA válido. Desde 2009.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "JacoSeg",
    images: ["/hero-wind.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: "https://www.jacoseg.com.br",
  foundingDate: String(COMPANY.founded),
  sameAs: [COMPANY.instagram, COMPANY.facebook],
  subOrganization: STORES.map((s) => ({
    "@type": "Store",
    name: `JacoSeg ${s.city}`,
    telephone: s.phoneDisplay,
    email: s.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.street,
      addressLocality: s.city,
      addressRegion: "BA",
      postalCode: s.cep,
      addressCountry: "BR",
    },
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-12:30"],
  })),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        archivo.variable,
        jetbrains.variable,
        "min-h-screen bg-paper font-[family-name:var(--font-sans)] text-base leading-relaxed text-ink",
      )}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
