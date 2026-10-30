"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { navigate } from "@/lib/router";
import { ARTICLES, CATEGORIES, getArticle, type Article } from "@/lib/insights";
import { PRACTICE_AREAS, getPractice } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { useSite } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Notfound } from "./notfound";

const ACCENTS: Record<string, string> = {
  "commercial-litigation": "#16315c",
  "real-estate-development": "#1e4076",
  "mining-resources": "#8d6e3f",
  "agricultural-finance": "#4f7256",
  "banking-finance": "#0f2547",
  compliance: "#6b7c98",
};

function fmtDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function InsightsPage() {
  const [cat, setCat] = useState("all");

  const filtered = useMemo(
    () => (cat === "all" ? ARTICLES : ARTICLES.filter((a) => a.categorySlug === cat)),
    [cat]
  );

  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title="Legal updates, written to be used."
        lead="Articles, case notes and practical guides from our practices — plain language, boardroom relevant, and checked against the LPC Code of Conduct."
        image="/images/library.png"
        breadcrumb={[{ label: "Home", route: "#/" }, { label: "Insights" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filters */}
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  className={cn(
                    "rounded-full border px-4.5 py-2.5 text-[12.5px] font-bold transition-all duration-300",
                    cat === c.slug
                      ? "border-navy-950 bg-navy-950 text-gold-300 shadow-luxe"
                      : "border-navy-100 bg-white text-navy-800 hover:border-gold-400/60 hover:bg-ivory"
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Featured first article when 'all' */}
          {cat === "all" && ARTICLES[0] && (
            <Reveal delay={0.05}>
              <button
                onClick={() => navigate(`#/insights/${ARTICLES[0].slug}`)}
                className="group mt-10 grid w-full overflow-hidden rounded-[2rem] border border-navy-100 bg-ivory text-left shadow-luxe transition-all duration-500 hover:shadow-luxe-lg lg:grid-cols-[1.1fr_1fr]"
              >
                <div className="relative min-h-[260px] overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(140deg, ${ACCENTS[ARTICLES[0].categorySlug] ?? "#16315c"} 0%, #0a1b33 100%)`,
                    }}
                  />
                  <div className="texture-grid-dark absolute inset-0 opacity-50" />
                  <span className="absolute left-7 top-7 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-200 backdrop-blur-md">
                    Featured note
                  </span>
                  <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                    <p className="font-display text-[26px] font-semibold leading-tight text-white">
                      Evidence, in writing.
                    </p>
                  </div>
                </div>
                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                    <span
                      className="rounded-full px-3 py-1 text-[10.5px] font-bold text-white"
                      style={{
                        backgroundColor:
                          ACCENTS[ARTICLES[0].categorySlug] ?? "#16315c",
                      }}
                    >
                      {ARTICLES[0].category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {fmtDate(ARTICLES[0].date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {ARTICLES[0].readTime}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold leading-snug text-navy-900 transition-colors group-hover:text-navy-700 sm:text-[1.75rem]">
                    {ARTICLES[0].title}
                  </h2>
                  <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
                    {ARTICLES[0].excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-bold text-gold-700">
                    Read the full note
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            </Reveal>
          )}

          {/* Grid */}
          <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((a) => (
                <motion.button
                  layout
                  key={a.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => navigate(`#/insights/${a.slug}`)}
                  className="group flex h-full flex-col rounded-3xl border border-navy-100 bg-white p-7 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-luxe"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-[10.5px] font-bold text-white"
                      style={{ backgroundColor: ACCENTS[a.categorySlug] ?? "#16315c" }}
                    >
                      {a.category}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[17.5px] font-semibold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
                    {a.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    {a.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-navy-100/70 pt-4 text-[11.5px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {fmtDate(a.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {a.readTime}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-[14px] text-muted-foreground">
              No notes in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-ivory py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-navy-100 bg-white p-8 text-center shadow-luxe sm:p-12">
            <SectionHeading
              align="center"
              eyebrow="Stay current"
              title={
                <>
                  The firm&apos;s legal brief,{" "}
                  <span className="gold-text italic">by email</span>.
                </>
              }
              lead="Occasional, practice-area-tagged updates. No spam, POPIA-consented, unsubscribe anytime."
            />
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: "" }),
      });
      const json = await res.json();
      if (res.ok && json.ok) setDone(true);
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <p className="mt-6 rounded-2xl bg-emerald-50 px-6 py-4 text-[14px] font-semibold text-emerald-800">
        Subscribed — your first brief will find you soon.
      </p>
    );

  return (
    <form onSubmit={submit} className="mx-auto mt-8 max-w-md space-y-4">
      <Input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@company.co.za"
        className="h-12 rounded-full border-navy-100 bg-ivory px-6 text-center"
      />
      <div className="flex items-start justify-center gap-2.5 text-left">
        <Checkbox
          id="nl-consent"
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          className="mt-0.5 border-navy-300 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
        />
        <Label htmlFor="nl-consent" className="text-[12px] leading-relaxed text-muted-foreground">
          I consent under POPIA to receive the firm&apos;s legal brief. *
        </Label>
      </div>
      <Button
        type="submit"
        disabled={busy || !consent}
        className="h-12 w-full rounded-full bg-gold-500 font-bold text-navy-950 shadow-gold hover:bg-gold-400"
      >
        Subscribe
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </form>
  );
}

/* ————— Article reader ————— */

export function ArticlePage({ slug }: { slug: string }) {
  const article = getArticle(slug);
  if (!article) return <Notfound />;

  const related = ARTICLES.filter(
    (a) => a.slug !== slug && a.categorySlug === article.categorySlug
  )
    .concat(ARTICLES.filter((a) => a.slug !== slug))
    .slice(0, 2);

  const accent = ACCENTS[article.categorySlug] ?? "#16315c";
  const practice = getPractice(article.categorySlug);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(150deg, ${accent} 0%, #060f1f 80%)` }}
        />
        <div className="texture-grid-dark absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-14 sm:pb-20 sm:pt-16">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-[12px] text-white/55"
            aria-label="Breadcrumb"
          >
            <button onClick={() => navigate("#/")} className="hover:text-gold-300">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate("#/insights")} className="hover:text-gold-300">
              Insights
            </button>
            <span>/</span>
            <span className="font-semibold text-gold-300">{article.category}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[12px] text-white/60">
              <span
                className="rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white"
                style={{ backgroundColor: accent }}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {fmtDate(article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold leading-[1.15] text-white sm:text-[2.6rem]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70">
              {article.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_320px]">
          <article className="mx-auto w-full max-w-3xl">
            {article.body.map((p, i) => (
              <Reveal key={i} delay={Math.min(i * 0.03, 0.2)}>
                <p
                  className={cn(
                    "text-[15.5px] leading-[1.85] text-navy-900/85",
                    i > 0 && "mt-6"
                  )}
                >
                  {i === 0 ? (
                    <>
                      <span className="float-left mr-3 mt-1 font-display text-[3.4rem] font-bold leading-[0.8] text-gold-500">
                        {p.charAt(0)}
                      </span>
                      {p.slice(1)}
                    </>
                  ) : (
                    p
                  )}
                </p>
              </Reveal>
            ))}

            <Reveal>
              <div className="mt-12 rounded-3xl bg-ivory p-7">
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-gold-700">
                  Editorial note
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  This note is general information, not legal advice. Facts matter —
                  for advice on your specific matter, use the enquiry form and the
                  relevant practice lead will respond after conflict screening.
                </p>
              </div>
            </Reveal>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {practice && (
              <Reveal>
                <div
                  className="rounded-3xl p-7 text-white shadow-luxe"
                  style={{ backgroundColor: accent }}
                >
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/70">
                    Related practice
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold">
                    {practice.name}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-white/75">
                    {practice.tagline}
                  </p>
                  <Button
                    variant="gold"
                    size="sm"
                    className="mt-5 rounded-full"
                    onClick={() => navigate(`#/practice/${practice.slug}`)}
                  >
                    View practice
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-sm">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-700">
                  More notes
                </p>
                <div className="mt-4 space-y-4">
                  {related.map((r) => (
                    <button
                      key={r.slug}
                      onClick={() => navigate(`#/insights/${r.slug}`)}
                      className="group block text-left"
                    >
                      <p className="text-[13.5px] font-semibold leading-snug text-navy-900 transition-colors group-hover:text-gold-700">
                        {r.title}
                      </p>
                      <p className="mt-1 text-[11.5px] text-muted-foreground">
                        {r.category} · {r.readTime}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-3xl border border-navy-100 bg-navy-950 p-7 text-white">
                <p className="font-display text-[16.5px] font-semibold">
                  Need advice on this?
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/65">
                  Send a practice-routed enquiry — no confidential documents before
                  conflict screening, please.
                </p>
                <Button
                  variant="gold"
                  className="mt-5 w-full rounded-full"
                  onClick={() =>
                    useSite.getState().openDialog("questions")
                  }
                >
                  Route my matter
                </Button>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </div>
  );
}
