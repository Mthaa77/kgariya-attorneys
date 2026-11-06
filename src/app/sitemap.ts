import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLES } from "@/lib/insights";
import { articlesQuery } from "@/sanity/lib/queries";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.kgariyainc.co.za";
  const staticRoutes = ["/", "/insights"].map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.6 }));
  const staticArticles = ARTICLES.map((article) => ({ url: `${base}/insights/${article.slug}`, lastModified: new Date(article.date), changeFrequency: "monthly" as const, priority: article.featured ? 0.8 : 0.7 }));
  try {
    const result = await sanityFetch({ query: articlesQuery, perspective: "published" });
    const articles = (result.data as Array<{ slug?: string; publicationDate?: string; title?: string }>).filter((article) => Boolean(article.slug));
    return [
      ...staticRoutes,
      ...staticArticles,
      ...articles.map((article) => ({ url: `${base}/insights/${article.slug}`, lastModified: article.publicationDate ? new Date(article.publicationDate) : new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ];
  } catch {
    return [...staticRoutes, ...staticArticles];
  }
}
