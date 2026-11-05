import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { articlesQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.kgariyainc.co.za";
  const result = (await sanityFetch({ query: articlesQuery, perspective: "published" }).catch(() => ({ data: [] }))) as { data: Array<{ slug: string }> };
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...result.data.map((article) => ({ url: `${base}/insights/${article.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
