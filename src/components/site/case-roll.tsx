"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  FileText,
  Gavel,
  Layers,
} from "lucide-react";
import { navigate } from "@/lib/router";
import { PRACTICE_AREAS, type Matter, type PracticeArea } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/interactions";

const EASE = [0.22, 1, 0.36, 1] as const;

type RollFile = Matter & {
  practice: PracticeArea;
  fileNo: string;
};

/** The full anonymised case roll — every practice's matters, docket-numbered. */
const ROLL: RollFile[] = PRACTICE_AREAS.flatMap((p) =>
  p.matters.map((m, mi) => ({
    ...m,
    practice: p,
    fileNo: `${p.number}·${String(mi + 1).padStart(2, "0")}`,
  }))
);

/**
 * "Representative matters" — an interactive case roll.
 * A court-docket style ledger: filter by practice, then open any file to
 * expand its dossier (strategy, forum, scale, outcome). Rows stagger in on
 * scroll; expansion animates smoothly. Fully anonymised per LPC rules.
 */
export function CaseRoll() {
  const [filter, setFilter] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const files = useMemo(
    () => (filter === "all" ? ROLL : ROLL.filter((f) => f.practice.slug === filter)),
    [filter]
  );

  const pickFilter = (slug: string) => {
    setFilter(slug);
    setOpenId(null);
  };

  return (
    <section
      id="case-roll"
      aria-label="Representative matters — anonymised case roll"
      className="relative scroll-mt-24 overflow-hidden bg-ivory py-24 sm:py-28"
    >
      <div className="texture-dots pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading + legend */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Representative matters"
            title={
              <>
                Capability, shown through{" "}
                <span className="gold-text italic">matters</span>.
              </>
            }
            lead="The firm's case roll — filter it by practice, then open any file to read the strategy, forum and outcome. Anonymised throughout: no client names, no case numbers, published subject to LPC marketing rules."
          />
          <Reveal delay={0.15} className="shrink-0">
            <div className="flex items-center gap-4 rounded-full border border-navy-100 bg-white px-5 py-2.5 shadow-sm">
              <span className="text-[11px] font-bold tracking-[0.18em] text-navy-900">
                {ROLL.length} <span className="text-muted-foreground">FILES</span>
              </span>
              <span className="h-3 w-px bg-navy-100" />
              <span className="text-[11px] font-bold tracking-[0.18em] text-navy-900">
                06 <span className="text-muted-foreground">PRACTICES</span>
              </span>
              <span className="h-3 w-px bg-navy-100" />
              <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-emerald-700">
                <span className="animate-live-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
                ALL RESOLVED
              </span>
            </div>
          </Reveal>
        </div>

        {/* Practice filters */}
        <Reveal delay={0.1} className="mt-10">
          <div className="scrollbar-hide -mx-6 flex gap-2.5 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
            <button
              onClick={() => pickFilter("all")}
              aria-pressed={filter === "all"}
              className={cn(
                "relative shrink-0 rounded-full px-5 py-2.5 text-[12.5px] font-bold transition-colors duration-300",
                filter === "all" ? "text-white" : "text-navy-700 hover:text-navy-950"
              )}
            >
              {filter === "all" && (
                <motion.span
                  layoutId="roll-filter-pill"
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 rounded-full bg-navy-950 shadow-luxe"
                />
              )}
              <span className="relative z-10">
                All files
                <span className={cn("ml-2 tabular-nums", filter === "all" ? "text-gold-400" : "text-gold-700")}>
                  {ROLL.length}
                </span>
              </span>
            </button>
            {PRACTICE_AREAS.map((p) => {
              const active = filter === p.slug;
              const count = ROLL.filter((f) => f.practice.slug === p.slug).length;
              return (
                <button
                  key={p.slug}
                  onClick={() => pickFilter(p.slug)}
                  aria-pressed={active}
                  className={cn(
                    "relative shrink-0 rounded-full border px-5 py-2.5 text-[12.5px] font-bold transition-colors duration-300",
                    active
                      ? "border-transparent text-white"
                      : "border-navy-100 bg-white text-navy-700 hover:border-gold-500/60"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="roll-filter-pill"
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute inset-0 rounded-full bg-navy-950 shadow-luxe"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: p.accent }}
                    />
                    {p.shortName}
                    <span className={cn("tabular-nums", active ? "text-gold-400" : "text-gold-700")}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* The roll */}
        <Reveal delay={0.15} className="mt-8">
          <div className="overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-luxe">
            {/* ledger header (desktop) */}
            <div className="hidden grid-cols-[92px_1.5fr_1fr_200px_44px] items-center gap-4 border-b border-navy-100 bg-navy-950/[0.03] px-7 py-3.5 lg:grid">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                File Nº
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Matter
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Forum & scale
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Outcome
              </span>
              <span />
            </div>

            <div className="divide-y divide-navy-100/70">
              {files.map((f, i) => {
                const open = openId === f.fileNo;
                return (
                  <motion.div
                    key={f.fileNo}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.3), ease: EASE }}
                    className={cn(
                      "group relative transition-colors duration-300",
                      open ? "bg-ivory/70" : "hover:bg-ivory/50"
                    )}
                  >
                    {/* gold rule on hover / open */}
                    <span
                      className={cn(
                        "absolute left-0 top-0 h-full w-[3px] origin-top bg-gradient-to-b from-gold-500 to-gold-300 transition-transform duration-400",
                        open ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                      )}
                    />
                    <button
                      onClick={() => setOpenId(open ? null : f.fileNo)}
                      aria-expanded={open}
                      className="grid w-full grid-cols-[1fr_36px] items-center gap-x-4 gap-y-3 px-6 py-5 text-left sm:px-7 lg:grid-cols-[92px_1.5fr_1fr_200px_44px] lg:gap-y-0"
                    >
                      {/* file no */}
                      <span className="order-1 font-display text-[13.5px] font-semibold tabular-nums text-gold-700">
                        {f.fileNo}
                      </span>

                      {/* chevron */}
                      <span
                        className={cn(
                          "order-2 flex h-9 w-9 items-center justify-center justify-self-end rounded-full border transition-all duration-300 lg:order-5",
                          open
                            ? "rotate-180 border-gold-500 bg-gold-500 text-navy-950"
                            : "border-navy-100 text-navy-600/60 group-hover:border-gold-500/60 group-hover:text-gold-700"
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>

                      {/* title + sector */}
                      <span className="order-3 col-span-2 lg:order-2 lg:col-span-1">
                        <span className="font-display text-[16px] font-semibold leading-snug tracking-tight text-navy-900 transition-colors duration-300 group-hover:text-navy-700">
                          {f.title}
                        </span>
                        <span className="mt-1.5 flex items-center gap-2 lg:hidden">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: f.practice.accent }}
                          />
                          <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                            {f.sector} · {f.practice.shortName}
                          </span>
                        </span>
                      </span>

                      {/* forum & scale */}
                      <span className="order-4 col-span-2 lg:order-3 lg:col-span-1">
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-navy-700">
                          <Gavel className="h-3 w-3 shrink-0 text-gold-600" />
                          {f.forum}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground lg:mt-1.5">
                          <Layers className="h-3 w-3 shrink-0 text-gold-600/70" />
                          {f.scale}
                        </span>
                      </span>

                      {/* outcome */}
                      <span className="order-5 lg:order-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/90 px-3 py-1.5 text-[10.5px] font-bold text-emerald-300">
                          <BadgeCheck className="h-3 w-3 shrink-0" />
                          <span className="lg:hidden xl:inline">{f.outcome}</span>
                          <span className="hidden lg:inline xl:hidden">Resolved</span>
                        </span>
                      </span>
                    </button>

                    {/* dossier drawer */}
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="dossier"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-7 pt-1 sm:px-7 lg:pl-[124px]">
                            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-7">
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-700">
                                  <FileText className="h-3.5 w-3.5" />
                                  Case notes · {f.fileNo}
                                </p>
                                <span className="rounded-full bg-ivory px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-700">
                                  {f.sector}
                                </span>
                              </div>
                              <p className="mt-4 text-[14px] leading-relaxed text-navy-800/90">
                                {f.detail}
                              </p>
                              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-navy-100/70 pt-4">
                                <button
                                  onClick={() => navigate(`#/practice/${f.practice.slug}`)}
                                  className="group/link flex items-center gap-2 text-[12.5px] font-bold text-gold-700 link-underline"
                                >
                                  Handled by {f.practice.shortName}
                                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                                </button>
                                <p className="text-[10.5px] leading-relaxed text-muted-foreground/70">
                                  Anonymised profile — no client names, case numbers or
                                  confidential details (LPC marketing rules).
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Footer meta + CTA */}
        <Reveal delay={0.2} className="mt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-[12px] font-semibold text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-navy-900">
                {files.length} of {ROLL.length}
              </span>{" "}
              anonymised files
              {filter !== "all" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-bold text-navy-900">
                    {PRACTICE_AREAS.find((p) => p.slug === filter)?.shortName}
                  </span>
                </>
              )}
            </p>
            <Magnetic strength={0.15}>
              <button
                onClick={() => navigate("#/contact")}
                className="btn-sheen group inline-flex items-center gap-2.5 rounded-full bg-navy-950 px-7 py-3.5 text-[13.5px] font-bold text-white shadow-luxe transition-colors duration-300 hover:bg-navy-800"
              >
                Discuss a similar matter
                <ArrowRight className="h-4 w-4 text-gold-400 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
