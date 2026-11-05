import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { articleBySlugQuery } from "@/sanity/lib/queries";
import type { SanityArticle } from "@/sanity/types";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = (await sanityFetch({ query: articleBySlugQuery, params: { slug }, perspective: "published" }).then((result) => result.data)) as SanityArticle | null;
  if (!article) return { title: "Insight not found" };
  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function SanityArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = (await sanityFetch({ query: articleBySlugQuery, params: { slug }, perspective: "published" }).then((result) => result.data)) as SanityArticle | null;
  if (!article) notFound();
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">{article.category}</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-navy-950">{article.title}</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">{article.excerpt}</p>
      <article className="prose prose-slate mt-12 max-w-none prose-headings:font-display prose-a:text-gold-700 prose-blockquote:border-gold-500">
        <PortableText value={article.body as never} />
      </article>
    </main>
  );
}
