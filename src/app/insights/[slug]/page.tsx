import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { articleBySlugQuery, articlesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityArticle } from "@/sanity/types";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

const baseUrl = "https://www.kgariyainc.co.za";
type Props = { params: Promise<{ slug: string }> };

async function getArticle(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const result = await sanityFetch({ query: articleBySlugQuery, params: { slug }, perspective: "published" });
  return result.data as SanityArticle | null;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Insight not found | Kgariya Attorneys" };
  const title = article.seo?.title || article.title;
  const description = article.seo?.description || article.excerpt;
  const image = article.seo?.socialImage || article.mainImage;
  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/insights/${article.slug}` },
    openGraph: {
      type: "article",
      url: `${baseUrl}/insights/${article.slug}`,
      title,
      description,
      publishedTime: article.publicationDate,
      authors: article.author?.fullName ? [article.author.fullName] : undefined,
      images: image ? [{ url: urlFor(image).width(1600).auto("format").url(), alt: article.imageAlt || article.title }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [urlFor(image).width(1600).auto("format").url()] : undefined },
    robots: { index: true, follow: true },
  };
}

export default async function SanityArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const related = ((await sanityFetch({ query: articlesQuery, perspective: "published" })).data as SanityArticle[])
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);
  const image = article.mainImage ? urlFor(article.mainImage).width(1800).auto("format").url() : null;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <article>
          <header className="bg-navy-950 px-6 py-20 text-white sm:py-28">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">{article.category || "Insights"}</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-6xl">{article.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{article.excerpt}</p>
              <p className="mt-7 text-sm text-white/55">
                {article.publicationDate ? new Date(article.publicationDate).toLocaleDateString("en-ZA", { dateStyle: "long" }) : ""}
                {article.author?.fullName ? ` · ${article.author.fullName}` : ""}
              </p>
            </div>
          </header>
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_280px] sm:py-24">
            <div className="mx-auto w-full max-w-3xl">
              {image && <img src={image} alt={article.imageAlt || article.title} className="mb-12 w-full rounded-3xl object-cover" />}
              <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-navy-900 prose-a:text-gold-700 prose-blockquote:border-gold-500">
                <PortableText
                  value={article.body as never}
                  components={{
                    types: { image: ({ value }) => <img src={value ? urlFor(value).width(1400).auto("format").url() : ""} alt={value?.alt || "Article image"} className="my-8 w-full rounded-2xl" /> },
                  }}
                />
              </div>
              <div className="mt-14 rounded-3xl bg-ivory p-7 text-sm leading-relaxed text-muted-foreground">
                This article is general information, not legal advice. Please use the enquiry form for advice on your specific matter after conflict screening.
              </div>
            </div>
            <aside className="h-fit rounded-3xl border border-navy-100 bg-ivory p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">More insights</p>
              <div className="mt-5 flex flex-col gap-4">
                {related.map((item) => <a key={item._id} href={`/insights/${item.slug}`} className="font-display text-lg font-semibold text-navy-900 hover:text-gold-700">{item.title}</a>)}
              </div>
              <a href="/insights" className="mt-7 inline-block text-sm font-bold text-gold-700">Back to all insights</a>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
