"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { navigate } from "@/lib/router";
import { PRACTICE_AREAS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

/**
 * Interactive six-practice selector. The selected practice expands into a
 * focused overview, core capabilities and client context without sending
 * visitors away from the homepage.
 */
export function PracticeExplorer() {
  const [selectedSlug, setSelectedSlug] = useState(PRACTICE_AREAS[0].slug);
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const headingId = useId();
  const selected =
    PRACTICE_AREAS.find((area) => area.slug === selectedSlug) ??
    PRACTICE_AREAS[0];

  return (
    <div className="mt-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-700">
            Explore the practices
          </p>
          <p className="mt-1 text-[13px] text-navy-700/65">
            Select a discipline to see its focus and capabilities.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-500">
          <span className="h-px w-8 bg-gold-500/70" />
          {selected.number} / {String(PRACTICE_AREAS.length).padStart(2, "0")}
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.18fr)] lg:gap-6">
        <div
          aria-label="Choose a practice area"
          className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1"
        >
          {PRACTICE_AREAS.map((area, index) => {
            const active = area.slug === selected.slug;

            return (
              <button
                key={area.slug}
                type="button"
                aria-pressed={active}
                aria-controls={panelId}
                onClick={() => setSelectedSlug(area.slug)}
                className={cn(
                  "group relative flex min-h-[108px] min-w-0 items-center gap-3 overflow-hidden rounded-2xl border p-3.5 text-left transition-all duration-300 sm:min-h-[94px] sm:gap-4 sm:p-4",
                  active
                    ? "border-navy-950 bg-navy-950 text-white shadow-[0_16px_36px_rgba(10,27,51,0.18)]"
                    : "border-navy-100 bg-white text-navy-950 shadow-[0_5px_18px_rgba(10,27,51,0.045)] hover:-translate-y-0.5 hover:border-gold-400/70 hover:shadow-[0_12px_28px_rgba(10,27,51,0.09)]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="practice-active-rail"
                    className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700"
                    transition={{
                      duration: reduceMotion ? 0 : 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                )}

                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 sm:h-11 sm:w-11",
                    active ? "bg-white/10 text-gold-300" : "text-white"
                  )}
                  style={{
                    backgroundColor: active ? undefined : area.accent,
                  }}
                >
                  <Icon name={area.icon} className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "mb-1 block text-[9px] font-bold tracking-[0.18em]",
                      active ? "text-gold-300" : "text-gold-700"
                    )}
                  >
                    {area.number}
                  </span>
                  <span
                    className={cn(
                      "block text-[12px] font-bold leading-snug sm:text-[14px]",
                      active ? "text-white" : "text-navy-950"
                    )}
                  >
                    {area.shortName}
                  </span>
                  <span
                    className={cn(
                      "mt-1 hidden text-[11px] leading-snug sm:block",
                      active ? "text-white/55" : "text-navy-600/60"
                    )}
                  >
                    {area.tagline}
                  </span>
                </span>

                <ChevronRight
                  className={cn(
                    "hidden h-4 w-4 shrink-0 transition-transform duration-300 sm:block",
                    active
                      ? "translate-x-0.5 text-gold-300"
                      : "text-navy-300 group-hover:translate-x-0.5 group-hover:text-gold-600"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div id={panelId} aria-live="polite" aria-atomic="false" className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={selected.slug}
              aria-labelledby={headingId}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[1.8rem] border border-navy-100 bg-white shadow-[0_20px_60px_rgba(10,27,51,0.11)]"
            >
              <div className="relative h-[218px] overflow-hidden sm:h-[250px]">
                <Image
                  src={selected.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07172d]/95 via-[#07172d]/76 to-[#07172d]/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07172d]/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5 sm:px-7 sm:pt-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-300 shadow-[0_0_10px_rgba(198,165,92,0.8)]" />
                    Selected practice
                  </span>
                  <span className="font-display text-[28px] font-semibold tracking-tight text-white/70">
                    {selected.number}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                    <Icon name={selected.icon} className="h-4 w-4" />
                    Specialist practice
                  </div>
                  <h3
                    id={headingId}
                    className="max-w-xl font-display text-[25px] font-semibold leading-[1.12] tracking-tight text-white sm:text-[32px]"
                  >
                    {selected.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-[12px] italic text-white/70 sm:text-[13px]">
                    {selected.tagline}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex items-center gap-2">
                  <span className="h-px w-7 bg-gold-500" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-700">
                    Practice overview
                  </p>
                </div>
                <p className="mt-3 text-[13px] leading-[1.85] text-navy-800/80 sm:text-[14px]">
                  {selected.overview[0] ?? selected.intro}
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_150px] sm:gap-6">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-950">
                      Key points
                    </h4>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-x-4">
                      {selected.scope.slice(0, 4).map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-[12px] leading-relaxed text-navy-700/80"
                        >
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f4f0e6] text-gold-700">
                            <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    {selected.scope.length > 4 && (
                      <p className="mt-3 pl-6 text-[10px] font-semibold text-navy-500/65">
                        + {selected.scope.length - 4} further capabilities on the full practice profile
                      </p>
                    )}
                  </div>

                  <div className="flex min-h-[112px] flex-row items-center justify-between gap-3 rounded-2xl border border-[#e8e2d4] bg-[#f7f5ef] px-4 py-4 sm:flex-col sm:items-start sm:justify-center">
                    <div>
                      <p className="font-display text-[36px] leading-none tracking-tight text-navy-950">
                        {selected.stat.value}
                        <span className="text-gold-600">{selected.stat.suffix}</span>
                      </p>
                      <p className="mt-2 max-w-[120px] text-[10px] font-semibold leading-snug text-navy-600/75">
                        {selected.stat.label}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold-700 sm:mt-1">
                      Practice indicator
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-navy-100 pt-5">
                  <span className="mr-1 text-[9px] font-bold uppercase tracking-[0.16em] text-navy-500">
                    Typically instructed by
                  </span>
                  {selected.clients.slice(0, 3).map((client) => (
                    <span
                      key={client}
                      className="rounded-full border border-navy-100 bg-[#fbfaf7] px-2.5 py-1.5 text-[10px] font-medium text-navy-700"
                    >
                      {client}
                    </span>
                  ))}
                  {selected.clients.length > 3 && (
                    <span className="text-[10px] font-semibold text-gold-700">
                      +{selected.clients.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[10px] text-navy-500/65">
                    Explore the full scope, delivery model and representative matters.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(`#/practice/${selected.slug}`)}
                    className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-navy-950 px-4 py-2.5 text-[11px] font-bold text-white shadow-[0_8px_18px_rgba(10,27,51,0.16)] transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-[0_12px_24px_rgba(10,27,51,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                  >
                    View practice profile
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
