"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Layers3,
  Route,
} from "lucide-react";
import type {
  PracticeCapabilityGroup,
  PracticeFaq,
  PracticeJourneyStep,
} from "@/lib/practice-page-content";

const sectionLinks = [
  { label: "Overview", id: "overview" },
  { label: "Capabilities", id: "expertise" },
  { label: "Our approach", id: "approach" },
  { label: "Representative matters", id: "matters" },
  { label: "FAQs", id: "faqs" },
  { label: "Enquire", id: "enquire" },
];

export function PracticeSectionNav() {
  return (
    <nav
      aria-label="Practice page sections"
      className="sticky top-[76px] z-30 border-b border-navy-100/80 bg-white/95 shadow-[0_8px_24px_-20px_rgba(10,27,51,0.35)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 py-3 scrollbar-hide">
        <span className="mr-3 hidden shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700 lg:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          On this page
        </span>
        {sectionLinks.map((link, index) => (
          <button
            key={link.id}
            type="button"
            onClick={() =>
              document.getElementById(link.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-transparent px-3.5 py-2 text-[12px] font-semibold text-navy-700 transition-all duration-300 hover:border-gold-300/70 hover:bg-ivory hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <span className="font-display text-[11px] text-gold-600/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function PracticeCapabilityExplorer({
  groups,
  accent,
}: {
  groups: PracticeCapabilityGroup[];
  accent: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = groups[activeIndex] ?? groups[0];

  if (!activeGroup) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
      <div className="lg:sticky lg:top-36 lg:self-start">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
          <Layers3 className="h-4 w-4" />
          Capability map
        </div>
        <h3 className="mt-4 max-w-md font-display text-3xl font-semibold leading-[1.12] text-navy-950 sm:text-4xl">
          Explore the work behind the practice.
        </h3>
        <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted-foreground">
          Choose a capability area to see the services and considerations that
          may form part of an instruction.
        </p>

        <div
          role="group"
          aria-label="Select a practice capability area"
          className="mt-8 space-y-2"
        >
          {groups.map((group, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={group.label}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
                className={[
                  "group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                  active
                    ? "border-navy-900 bg-navy-950 text-white shadow-luxe"
                    : "border-navy-100 bg-white text-navy-900 hover:border-gold-400/70 hover:bg-ivory",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-[13px] font-bold transition-colors",
                    active
                      ? "bg-gold-500 text-navy-950"
                      : "bg-ivory text-gold-700 group-hover:bg-gold-100",
                  ].join(" ")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-bold">{group.label}</span>
                  <span
                    className={[
                      "mt-1 block text-[11.5px] leading-relaxed",
                      active ? "text-white/55" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {group.summary}
                  </span>
                </span>
                <ArrowRight
                  className={[
                    "h-4 w-4 shrink-0 transition-transform duration-300",
                    active
                      ? "translate-x-0 text-gold-400"
                      : "text-gold-600 group-hover:translate-x-1",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="practice-capability-panel"
        aria-live="polite"
        className="relative min-h-[410px] overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-5 shadow-luxe sm:p-8"
        style={{ borderTopColor: accent, borderTopWidth: "4px" }}
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.07] blur-3xl"
          style={{ backgroundColor: accent }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-navy-100 pb-6">
              <div className="max-w-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                  Selected capability
                </p>
                <h4 className="mt-2 font-display text-2xl font-semibold text-navy-950 sm:text-[30px]">
                  {activeGroup.label}
                </h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {activeGroup.summary}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ivory text-gold-700">
                <Compass className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {activeGroup.items.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.045 }}
                  className="group rounded-2xl border border-navy-100 bg-cream p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-luxe"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-gold-700 shadow-sm">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-display text-[12px] font-bold text-navy-900/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h5 className="mt-4 text-[14px] font-bold leading-snug text-navy-950">
                    {item.title}
                  </h5>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function PracticeJourney({
  steps,
  intro,
}: {
  steps: PracticeJourneyStep[];
  intro: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex] ?? steps[0];

  if (!activeStep) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
          <Route className="h-4 w-4" />
          How we approach a mandate
        </div>
        <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.12] text-white sm:text-4xl">
          Considered at every stage.
        </h3>
        <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-white/60">
          {intro}
        </p>
        <div className="mt-8 space-y-2">
          {steps.map((step, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={active}
                className={[
                  "group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
                  active
                    ? "border-gold-500/50 bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.06]",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-display text-[14px] font-bold",
                    active ? "text-gold-300" : "text-white/30",
                  ].join(" ")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={[
                    "flex-1 text-[13px] font-semibold",
                    active ? "text-white" : "text-white/65",
                  ].join(" ")}
                >
                  {step.title}
                </span>
                <ArrowRight
                  className={[
                    "h-4 w-4 transition-all duration-300",
                    active
                      ? "translate-x-0 text-gold-300"
                      : "text-white/25 group-hover:translate-x-1 group-hover:text-gold-300",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-sm sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-gold-400/30 bg-gold-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">
                {activeStep.focus}
              </span>
              <span className="font-display text-6xl font-semibold leading-none text-white/[0.08] sm:text-7xl">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </div>
            <h4 className="mt-10 max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-[38px]">
              {activeStep.title}
            </h4>
            <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-white/65 sm:text-[15px]">
              {activeStep.description}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="relative mt-10 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
            Mandate framework
          </span>
          <div className="flex items-center gap-1.5">
            {steps.map((step, index) => (
              <span
                key={step.title}
                className={[
                  "h-1 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-8 bg-gold-400" : "w-2 bg-white/20",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PracticeFaq({
  slug,
  items,
}: {
  slug: string;
  items: PracticeFaq[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white shadow-luxe">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = "practice-faq-" + slug + "-" + index;
        return (
          <div
            key={item.question}
            className="border-b border-navy-100 last:border-b-0"
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center gap-5 px-5 py-5 text-left transition-colors hover:bg-ivory/70 sm:px-7"
            >
              <span className="font-display text-[12px] font-bold text-gold-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[14px] font-semibold leading-relaxed text-navy-950 sm:text-[15px]">
                {item.question}
              </span>
              <span
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  open ? "rotate-180 bg-navy-950 text-gold-300" : "bg-ivory text-navy-700",
                ].join(" ")}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-4xl pb-6 pl-12 pr-6 text-[13px] leading-[1.8] text-muted-foreground sm:pl-[4.6rem] sm:pr-9 sm:text-[13.5px]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
