"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, FileText, MousePointerClick } from "lucide-react";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { getPractice, SECTORS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/icon";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/interactions";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 6800;

/**
 * "Client matrix" — interactive sector explorer.
 * A master–detail index: the rail auto-cycles through the sectors the firm
 * serves; the dark dossier panel reveals the mandate, the firm's response,
 * the practices on standby and a reference matter file. Hover / focus pauses
 * the cycle; every control is clickable.
 */
export function SectorMatrix() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SECTORS.length), DURATION);
    return () => clearTimeout(t);
  }, [index, paused]);

  const sector = SECTORS[index];
  const practices = sector.practices
    .map((slug) => getPractice(slug))
    .filter(Boolean);
  const fp = getPractice(sector.fileRef[0]);
  const file = fp?.matters[sector.fileRef[1]];

  return (
    <section
      aria-label="Client matrix — sectors we serve"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="texture-dots pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading + meta strip */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Client matrix"
            title={
              <>
                Sectors we serve — and the{" "}
                <span className="gold-text italic">strategy</span> we bring.
              </>
            }
            lead="An institutional ecosystem across the South African economy, from blue-chip boards to mining communities. Select a sector to open its dossier."
          />
          <Reveal delay={0.15} className="shrink-0">
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <div className="flex items-center gap-4 rounded-full border border-navy-100 bg-ivory px-5 py-2.5 shadow-sm">
                <span className="text-[11px] font-bold tracking-[0.18em] text-navy-900">
                  08 <span className="text-muted-foreground">SECTORS</span>
                </span>
                <span className="h-3 w-px bg-navy-100" />
                <span className="text-[11px] font-bold tracking-[0.18em] text-navy-900">
                  06 <span className="text-muted-foreground">PRACTICES</span>
                </span>
                <span className="h-3 w-px bg-navy-100" />
                <span className="text-[11px] font-bold tracking-[0.18em] text-gold-700">
                  PANEL-READY
                </span>
              </div>
              <p className="hidden items-center gap-1.5 text-[11px] font-semibold text-muted-foreground/80 lg:flex">
                <MousePointerClick className="h-3.5 w-3.5 text-gold-600" />
                Auto-cycling dossier — hover to pause, click to explore
              </p>
            </div>
          </Reveal>
        </div>

        {/* Explorer */}
        <Reveal delay={0.1} className="mt-14">
          <div className="grid min-w-0 gap-5 lg:grid-cols-[0.95fr_1.45fr] lg:gap-7">
            {/* ——— Sector index rail (desktop) / chip scroller (mobile) ——— */}
            <div className="min-w-0 lg:hidden">
              <div className="scrollbar-hide -mx-6 flex snap-x gap-2.5 overflow-x-auto px-6 pb-1">
                {SECTORS.map((s, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setIndex(i)}
                      aria-pressed={active}
                      className={cn(
                        "flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2.5 text-[12.5px] font-bold transition-all duration-300",
                        active
                          ? "border-navy-950 bg-navy-950 text-white shadow-luxe"
                          : "border-navy-100 bg-white text-navy-700 hover:border-gold-500/60"
                      )}
                    >
                      <Icon
                        name={s.icon}
                        className={cn("h-4 w-4", active ? "text-gold-400" : "text-gold-600")}
                      />
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden overflow-hidden rounded-[2rem] border border-navy-100 bg-ivory shadow-sm lg:block">
              {/* ledger header */}
              <div className="flex items-center justify-between border-b border-navy-100/80 px-6 py-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  Sector index
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-700">
                  {String(index + 1).padStart(2, "0")} / {String(SECTORS.length).padStart(2, "0")}
                </span>
              </div>
              <div className="divide-y divide-navy-100/70">
                {SECTORS.map((s, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setIndex(i)}
                      aria-pressed={active}
                      className="group relative block w-full text-left"
                    >
                      {active && (
                        <motion.span
                          layoutId="sector-rail-pill"
                          transition={{ duration: 0.5, ease: EASE }}
                          className="absolute inset-0 bg-navy-950"
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-4 px-6 py-[15px]">
                        <span
                          className={cn(
                            "w-7 font-display text-[13px] font-semibold tabular-nums transition-colors duration-300",
                            active ? "text-gold-400" : "text-muted-foreground/60"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                            active
                              ? "bg-gold-500/15 text-gold-400"
                              : "bg-navy-950/[0.06] text-navy-800 group-hover:bg-gold-500/15 group-hover:text-gold-700"
                          )}
                        >
                          <Icon name={s.icon} className="h-4 w-4" />
                        </span>
                        <span
                          className={cn(
                            "flex-1 font-display text-[15.5px] font-semibold tracking-tight transition-colors duration-300",
                            active ? "text-white" : "text-navy-800"
                          )}
                        >
                          {s.name}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "h-4 w-4 shrink-0 transition-all duration-300",
                            active
                              ? "text-gold-400"
                              : "text-navy-600/30 opacity-0 group-hover:text-gold-600 group-hover:opacity-100"
                          )}
                        />
                      </span>
                      {active && !paused && (
                        <motion.span
                          key={`progress-${index}`}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: DURATION / 1000, ease: "linear" }}
                          className="absolute bottom-0 left-0 z-10 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ——— Dossier panel ——— */}
            <div className="relative min-h-[560px] min-w-0 overflow-hidden rounded-[2rem] bg-navy-950 shadow-luxe-lg lg:min-h-0">
              <div className="texture-grid-dark pointer-events-none absolute inset-0" />
              <div className="animate-aurora pointer-events-none absolute -right-24 -top-32 h-80 w-[400px] rounded-full bg-gold-500/15 blur-[110px]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative flex h-full flex-col p-7 sm:p-10"
                >
                  {/* ghost index */}
                  <span className="pointer-events-none absolute -right-3 -top-7 font-display text-[7rem] font-bold leading-none text-white/[0.05] sm:text-[9rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* header */}
                  <div className="flex items-start gap-4">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gold-500 p-3 text-navy-950 shadow-gold">
                      <Icon name={sector.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold-300">
                        Sector dossier · {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
                        {sector.name}
                      </h3>
                      <p className="mt-1 font-display text-[15px] italic text-gold-300/90">
                        {sector.tagline}
                      </p>
                    </div>
                  </div>

                  {/* mandate vs response */}
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-white/10">
                    <div className="sm:pr-7">
                      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
                        <ArrowDownRight className="h-3.5 w-3.5 text-gold-400/80" />
                        The mandate challenge
                      </p>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-white/75">
                        {sector.need}
                      </p>
                    </div>
                    <div className="sm:pl-7">
                      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-300">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        The Kgariya response
                      </p>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-white/85">
                        {sector.response}
                      </p>
                    </div>
                  </div>

                  {/* practice chips */}
                  <div className="mt-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
                      Practices on standby
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {practices.map(
                        (p) =>
                          p && (
                            <button
                              key={p.slug}
                              onClick={() => navigate(`#/practice/${p.slug}`)}
                              className="group/chip flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] font-bold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-gold-400/60 hover:bg-gold-500/15 hover:text-gold-200"
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: p.accent }}
                              />
                              {p.shortName}
                              <ArrowUpRight className="h-3.5 w-3.5 text-gold-400 transition-transform duration-300 group-hover/chip:-translate-y-0.5 group-hover/chip:translate-x-0.5" />
                            </button>
                          )
                      )}
                    </div>
                  </div>

                  {/* matter file teaser */}
                  {fp && file && (
                    <button
                      onClick={() => {
                        document
                          .getElementById("case-roll")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="group/file mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-left backdrop-blur-sm transition-all duration-300 hover:border-gold-500/40 hover:bg-white/[0.08] sm:p-6"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-300">
                          <FileText className="h-3.5 w-3.5" />
                          From the matter file · {fp.number}
                          {String(sector.fileRef[1] + 1).padStart(2, "0")}
                        </p>
                        <span className="flex items-center gap-1 text-[10.5px] font-bold text-gold-300 opacity-70 transition-opacity group-hover/file:opacity-100">
                          Open the case roll
                          <ArrowRight className="h-3 w-3 transition-transform group-hover/file:translate-x-1" />
                        </span>
                      </div>
                      <p className="mt-3 font-display text-[16.5px] font-semibold leading-snug text-white">
                        {file.title}
                      </p>
                      <div className="mt-3.5 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[10.5px] font-bold text-emerald-300">
                          {file.outcome}
                        </span>
                        {file.forum && (
                          <span className="rounded-full border border-white/15 px-3 py-1 text-[10.5px] font-semibold text-white/60">
                            {file.forum}
                          </span>
                        )}
                        {file.scale && (
                          <span className="rounded-full border border-white/15 px-3 py-1 text-[10.5px] font-semibold text-white/60">
                            {file.scale}
                          </span>
                        )}
                      </div>
                    </button>
                  )}

                  {/* CTA */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                    <Magnetic strength={0.15}>
                      <button
                        onClick={() => useSite.getState().openDialog("questions")}
                        className="btn-sheen group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-6 py-3 text-[13.5px] font-bold text-navy-950 shadow-gold transition-all duration-300 hover:bg-gold-400"
                      >
                        Discuss a mandate
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Magnetic>
                    <p className="hidden max-w-[220px] text-right text-[10.5px] leading-relaxed text-white/40 sm:block">
                      Indicative capability statement — sectors are anonymised
                      under LPC marketing rules.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
