import { COMPANY, STORES } from "./site-data";

export const SITE_URL = "https://www.jacoseg.com.br";
/**
 * Base das URLs absolutas (og:image, canonical). Em produção é o domínio oficial;
 * nos previews da Vercel é o próprio endereço do preview, para o link compartilhado mostrar a imagem certa.
 */
export const BASE_URL =
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production" && process.env.VERCEL_BRANCH_URL
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : SITE_URL;

export const OG_IMAGE = `${SITE_URL}/opengraph-image.jpg`;

/** Open Graph completo de uma página. No Next, o openGraph da página substitui o do layout inteiro. */
export function ogFor(path: string, extra: { title?: string; type?: "website" | "article" } = {}) {
  return {
    type: extra.type ?? "website",
    locale: "pt_BR",
    siteName: "JacoSeg",
    url: path,
    ...(extra.title ? { title: extra.title } : {}),
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "JacoSeg, loja de EPI em Jacobina e Irecê" }],
  };
}

const orgId = `${SITE_URL}/#organizacao`;

/** Organização, site e as duas lojas, para o layout público. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        taxID: COMPANY.cnpj,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/jacoseg-logo.svg`,
        image: OG_IMAGE,
        foundingDate: String(COMPANY.founded),
        sameAs: [COMPANY.instagram, COMPANY.facebook],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: SITE_URL,
        name: "JacoSeg",
        inLanguage: "pt-BR",
        publisher: { "@id": orgId },
      },
      ...STORES.map((s) => ({
        "@type": "Store",
        "@id": `${SITE_URL}/#loja-${s.id}`,
        name: `JacoSeg ${s.city}`,
        description: `Loja de EPI, EPC, ferramentas e material de obra em ${s.city}, Bahia.`,
        parentOrganization: { "@id": orgId },
        url: SITE_URL,
        image: OG_IMAGE,
        telephone: s.phoneDisplay,
        email: s.email,
        hasMap: s.mapsUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: s.street,
          addressLocality: s.city,
          addressRegion: "BA",
          postalCode: s.cep,
          addressCountry: "BR",
        },
        geo: { "@type": "GeoCoordinates", latitude: s.coords[1], longitude: s.coords[0] },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:30" },
        ],
        areaServed: { "@type": "State", name: "Bahia" },
      })),
    ],
  };
}

/** Trilha de navegação. Cada item: [nome, caminho]. */
export function breadcrumb(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
