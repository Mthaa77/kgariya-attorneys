import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { articlesQuery } from "@/sanity/lib/queries";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.kgariyainc.co.za";
  const staticRoutes = ["/", "/insights", "/people", "/about", "/contact", "/legal"].map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.5 }));
  try {
    const result = await sanityFetch({ query: articlesQuery, perspective: "published" });
    const articles = (result.data as Array<{ slug?: string; publicationDate?: string; title?: string }>).filter((article) => article.slug && !article.slug.startsWith("qa-") && article.title !== "QA Preview Article — Sanity Integration Test");
    return [
      ...staticRoutes,
      ...articles.map((article) => ({ url: `${base}/insights/${article.slug}`, lastModified: article.publicationDate ? new Date(article.publicationDate) : new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ];
  } catch {
    return staticRoutes;
  }
}
