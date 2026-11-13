import type { MetadataRoute } from "next";
import { GUIAS } from "@/lib/guias";
import { CATEGORIES, SECTORS } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/catalogo", 0.9, "weekly"),
    ...CATEGORIES.map((c) => page(`/catalogo/${c.id}`, 0.8, "weekly")),
    ...SECTORS.map((s) => page(`/setores/${s.slug}`, 0.8)),
    page("/guias", 0.6),
    ...GUIAS.map((g) => page(`/guias/${g.slug}`, 0.6)),
  ];
}
