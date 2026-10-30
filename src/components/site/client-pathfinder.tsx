"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarClock,
  Check,
  Compass,
  Handshake,
  HardHat,
  Hourglass,
  KeyRound,
  Landmark,
  MapPinned,
  Mountain,
  Phone,
  RotateCcw,
  Scale,
  ShieldCheck,
  User,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { FIRM, getPractice } from "@/lib/site-data";
import { Icon } from "./icon";
import { Magnetic } from "./interactions";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ————————————————— Routing model ————————————————— */

type ProfileId =
  | "company"
  | "lender"
  | "developer"
  | "public"
  | "individual"
  | "practitioner";
type NeedId =
  | "dispute"
  | "development"
  | "mining"
  | "agri"
  | "finance"
  | "property";
type TimelineId = "urgent" | "weeks" | "planning";

type Option<T extends string> = { id: T; label: string; hint: string; icon: LucideIcon };

const PROFILES: Option<ProfileId>[] = [
  { id: "company", label: "A company or business", hint: "Commercial mandates, contracts, disputes", icon: Building2 },
  { id: "lender", label: "A bank or lender", hint: "Facilities, enforcement, workouts", icon: Landmark },
  { id: "developer", label: "A developer or landowner", hint: "Packaging, approvals, capital close", icon: HardHat },
  { id: "public", label: "Public sector / SOE", hint: "Departments, municipalities, entities", icon: ShieldCheck },
  { id: "individual", label: "A private individual", hint: "Property, finance, personal mandates", icon: User },
  { id: "practitioner", label: "A retiring practitioner", hint: "Referrals, handovers, succession", icon: Handshake },
];

const NEEDS: Option<NeedId>[] = [
  { id: "dispute", label: "A commercial dispute or claim", hint: "Court, arbitration, enforcement", icon: Scale },
  { id: "development", label: "A development or land use", hint: "Townships, rezoning, capital close", icon: MapPinned },
  { id: "mining", label: "A mining-adjacent matter", hint: "Surface rights, SLPs, mineral rights", icon: Mountain },
  { id: "agri", label: "Farm or agricultural finance", hint: "Land Bank, farm bonds, movables", icon: Wheat },
  { id: "finance", label: "Banking, finance or security", hint: "Facilities, workouts, restructuring", icon: Banknote },
  { id: "property", label: "A transfer, bond or sectional title", hint: "Conveyancing and registration", icon: KeyRound },
];

const NEED_PRACTICE: Record<NeedId, string> = {
  dispute: "commercial-litigation",
  development: "real-estate-development",
  mining: "mining-resources",
  agri: "agricultural-finance",
  finance: "banking-finance",
  property: "conveyancing-property",
};

const TIMELINES: Option<TimelineId>[] = [
  { id: "urgent", label: "Urgent — days matter", hint: "Interdicts, notices, hard deadlines", icon: Zap },
  { id: "weeks", label: "Within weeks", hint: "An active transaction or dispute", icon: CalendarClock },
  { id: "planning", label: "Planning ahead", hint: "Structuring, advisory, panels", icon: Hourglass },
];

type Waypoint = { label: string; hint: string; target: string; kind: "scroll" | "route" };

/** Personal itinerary stops per profile — the case for visiting each area of the site. */
const WAYPOINTS: Record<ProfileId, Waypoint[]> = {
  company: [
    { label: "The case roll", hint: "Anonymised outcomes, forums and scales", target: "case-roll", kind: "scroll" },
    { label: "Fee structures", hint: "Three commercial models, agreed in writing", target: "fees", kind: "scroll" },
    { label: "The firm behind the matters", hint: "Story, values and standing", target: "#/about", kind: "route" },
  ],
  lender: [
    { label: "The case roll", hint: "Enforcement and recovery outcomes", target: "case-roll", kind: "scroll" },
    { label: "Fee structures", hint: "Panel-ready commercial models", target: "fees", kind: "scroll" },
    { label: "The attorneys who act", hint: "Meet the team", target: "#/people", kind: "route" },
  ],
  developer: [
    { label: "Development packaging dossier", hint: "Sector matrix — capital to township register", target: "client-matrix", kind: "scroll" },
    { label: "How we engage", hint: "Four steps from enquiry to close", target: "journey", kind: "scroll" },
    { label: "Fee structures", hint: "Success-weighted models for developments", target: "fees", kind: "scroll" },
  ],
  public: [
    { label: "Credentials & standing", hint: "LPC registration, audit, leadership", target: "#/about", kind: "route" },
    { label: "Sectors we serve", hint: "Public mandates in the client matrix", target: "client-matrix", kind: "scroll" },
    { label: "The case roll", hint: "Outcomes and forums, anonymised", target: "case-roll", kind: "scroll" },
  ],
  individual: [
    { label: "Fee transparency", hint: "What a mandate costs — agreed upfront", target: "fees", kind: "scroll" },
    { label: "Client voices", hint: "What clients say after close", target: "testimonials", kind: "scroll" },
    { label: "How we engage", hint: "From first call to matter close", target: "journey", kind: "scroll" },
  ],
  practitioner: [
    { label: "Joining the firm", hint: "Referrals, handovers, succession", target: "#/joining", kind: "route" },
    { label: "Kgariya & Co Group", hint: "The wider group structure", target: "#/group", kind: "route" },
    { label: "The attorneys who act", hint: "Who would take the file over", target: "#/people", kind: "route" },
  ],
};

const TIMELINE_CTA: Record<TimelineId, { note: string }> = {
  urgent: {
    note: "Urgent applications and interdicts run on short deadlines — a director takes this call personally.",
  },
  weeks: {
    note: "We will schedule a scoping consultation within days — strategy first, before positions harden.",
  },
  planning: {
    note: "Start with scope and strategy — a structured enquiry receives a considered reply within one business day.",
  },
};

const RAIL_STEPS = [
  { n: "01", title: "Who you are", sub: "Your corner of the market" },
  { n: "02", title: "The mandate", sub: "What you are facing" },
  { n: "03", title: "Your timeline", sub: "How fast it must move" },
  { n: "04", title: "Your route", sub: "A personal itinerary" },
];

/* ————————————————— Motion presets ————————————————— */

const itemV = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const stepParentV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const resultParentV = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ————————————————— Component ————————————————— */

export function ClientPathfinder() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [need, setNeed] = useState<NeedId | null>(null);
  const [timeline, setTimeline] = useState<TimelineId | null>(null);

  const practice = need ? getPractice(NEED_PRACTICE[need]) : null;
  const waypoints = profile ? WAYPOINTS[profile] : [];
  const cta = timeline ? TIMELINE_CTA[timeline] : null;
  const profileOpt = PROFILES.find((p) => p.id === profile);
  const needOpt = NEEDS.find((n) => n.id === need);

  const reset = () => {
    setStep(0);
    setProfile(null);
    setNeed(null);
    setTimeline(null);
  };

  const goWaypoint = (w: Waypoint) => {
    if (w.kind === "route") {
      navigate(w.target);
      return;
    }
    scrollToId(w.target);
  };

  return (
    <section
      id="pathfinder"
      aria-label="Client pathfinder — guided onboarding"
      className="relative overflow-hidden bg-navy-950 py-24 sm:py-28"
    >
      {/* Backdrop */}
      <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="animate-aurora pointer-events-none absolute -right-24 -top-28 h-96 w-[30rem] rounded-full bg-gold-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gold-400/[0.07] blur-[110px]" />

      {/* Ghost step numeral */}
      <div className="pointer-events-none absolute -bottom-8 left-2 hidden select-none lg:block">
        <AnimatePresence mode="wait">
          <motion.span
            key={step}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -26 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="block font-display text-[13rem] font-semibold leading-none text-white/[0.045]"
          >
            {RAIL_STEPS[step].n}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* ——— Left: story + rail ——— */}
        <div className="min-w-0">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">
                Begin here
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-balance text-white sm:text-4xl lg:text-[2.75rem]">
              Three answers.{" "}
              <span className="gold-text italic">Your route through the firm.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-100/80">
              Most mandates do not arrive with a label attached. Tell us who you
              are, what you are facing and how fast it must move — we will map
              your route to the right practice, the right evidence and the right
              conversation before you write a single line of enquiry.
            </p>
          </Reveal>

          {/* Step rail */}
          <Reveal delay={0.12} className="mt-10 hidden lg:block">
            <div className="relative pl-1">
              {/* connector + animated gold fill */}
              <div className="absolute bottom-4 left-[19px] top-4 w-px bg-white/10" />
              <motion.div
                className="absolute left-[19px] top-4 w-px origin-top bg-gradient-to-b from-gold-400 to-gold-600"
                animate={{ height: `calc(${(step / 3) * 100}% - 8px)` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
              <ol className="space-y-6">
                {RAIL_STEPS.map((r, i) => {
                  const done = i < step;
                  const current = i === step;
                  return (
                    <li key={r.n} className="relative flex items-start gap-4">
                      <button
                        type="button"
                        disabled={!done}
                        aria-current={current ? "step" : undefined}
                        aria-label={`Step ${r.n} — ${r.title}${done ? " (completed, click to revise)" : ""}`}
                        onClick={() => done && setStep(i)}
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-300",
                          done &&
                            "border-gold-500 bg-gold-500 text-navy-950 hover:scale-105 hover:shadow-gold",
                          current &&
                            "border-gold-400 bg-navy-950 text-gold-300 shadow-gold ring-4 ring-gold-500/15",
                          !done && !current && "border-white/15 bg-navy-950 text-white/30"
                        )}
                      >
                        {done ? <Check className="h-4 w-4" /> : r.n}
                      </button>
                      <div className="min-w-0 pt-0.5">
                        <p
                          className={cn(
                            "text-[14px] font-bold transition-colors",
                            current ? "text-white" : done ? "text-navy-100" : "text-white/35"
                          )}
                        >
                          {r.title}
                        </p>
                        <p className="mt-0.5 text-[12px] text-white/40">{r.sub}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          {/* Confidentiality note */}
          <Reveal delay={0.2} className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" />
              <p className="text-[12.5px] leading-relaxed text-white/65">
                Confidential by design — your answers stay on this device until
                you choose to make contact. Nothing is submitted or stored.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToId("practice-areas")}
              className="group mt-6 flex items-center gap-2 text-[13px] font-semibold text-white/55 transition-colors hover:text-gold-300"
            >
              Prefer to browse first? The six practices are one scroll away
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </Reveal>
        </div>

        {/* ——— Right: the console ——— */}
        <Reveal delay={0.15} className="min-w-0">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-luxe-lg ring-1 ring-white/60">
            {/* Header band */}
            <div className="relative bg-navy-950 px-7 py-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15">
                    <Compass className="h-5 w-5 text-gold-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold leading-tight text-white">
                      Client pathfinder
                    </p>
                    <p className="text-[11.5px] text-white/55">
                      Guided intake · about 60 seconds
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-gold-300">
                  {step < 3 ? `STEP ${step + 1} OF 3` : "ROUTE READY"}
                </span>
              </div>
            </div>

            {/* Progress hairline */}
            <div className="relative h-1 overflow-hidden bg-navy-50">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300"
                animate={{ width: `${step < 3 ? ((step + 1) / 4) * 100 : 100}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>

            {/* Body */}
            <div className="relative px-6 pb-6 pt-7 sm:px-7" aria-live="polite">
              <AnimatePresence mode="wait">
                {/* ——— Q1: profile ——— */}
                {step === 0 && (
                  <motion.div
                    key="q-profile"
                    variants={stepParentV}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.3, ease: EASE } }}
                  >
                    <motion.div variants={itemV}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                        Question 1 — Who are you?
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-navy-900 sm:text-[1.35rem]">
                        So we route you to the desk that normally acts for you.
                      </h3>
                    </motion.div>
                    <div className="mt-6 grid grid-cols-2 gap-2.5">
                      {PROFILES.map((o) => (
                        <OptionCard
                          key={o.id}
                          option={o}
                          selected={profile === o.id}
                          onSelect={() => {
                            setProfile(o.id);
                            setStep(1);
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ——— Q2: need ——— */}
                {step === 1 && (
                  <motion.div
                    key="q-need"
                    variants={stepParentV}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.3, ease: EASE } }}
                  >
                    <motion.div variants={itemV}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                        Question 2 — What do you need?
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-navy-900 sm:text-[1.35rem]">
                        One line is enough — we unpack the detail together.
                      </h3>
                    </motion.div>
                    <div className="mt-6 grid grid-cols-2 gap-2.5">
                      {NEEDS.map((o) => (
                        <OptionCard
                          key={o.id}
                          option={o}
                          selected={need === o.id}
                          onSelect={() => {
                            setNeed(o.id);
                            setStep(2);
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ——— Q3: timeline ——— */}
                {step === 2 && (
                  <motion.div
                    key="q-timeline"
                    variants={stepParentV}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.3, ease: EASE } }}
                  >
                    <motion.div variants={itemV}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                        Question 3 — How fast must it move?
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-navy-900 sm:text-[1.35rem]">
                        Timelines change the advice — we plan around yours.
                      </h3>
                    </motion.div>
                    <div className="mt-6 space-y-2.5">
                      {TIMELINES.map((o) => (
                        <motion.button
                          key={o.id}
                          variants={itemV}
                          type="button"
                          onClick={() => {
                            setTimeline(o.id);
                            setStep(3);
                          }}
                          className={cn(
                            "group flex w-full items-center gap-4 rounded-2xl border px-4.5 py-4 text-left transition-all duration-300",
                            timeline === o.id
                              ? "border-gold-500 bg-gold-200/30 shadow-gold"
                              : "border-navy-100 hover:border-gold-400/70 hover:bg-ivory"
                          )}
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                            <o.icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[14px] font-bold text-navy-900">
                              {o.label}
                            </span>
                            <span className="mt-0.5 block text-[12px] text-muted-foreground">
                              {o.hint}
                            </span>
                          </span>
                          <ArrowUpRight className="ml-auto h-4.5 w-4.5 shrink-0 text-navy-200 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-600" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ——— Result: the route ——— */}
                {step === 3 && practice && profile && need && timeline && (
                  <motion.div
                    key="result"
                    variants={resultParentV}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.3, ease: EASE } }}
                    className="min-h-0"
                  >
                    <motion.div variants={itemV} className="flex items-center gap-2.5">
                      <BadgeCheck className="h-5 w-5 text-gold-600" />
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                        Your route is ready
                      </p>
                    </motion.div>

                    {/* Answer chips — clickable to revise */}
                    <motion.div variants={itemV} className="mt-4 flex flex-wrap gap-2">
                      <ReviseChip prefix="You" label={profileOpt?.label ?? ""} onClick={() => setStep(0)} />
                      <ReviseChip prefix="Need" label={needOpt?.label ?? ""} onClick={() => setStep(1)} />
                      <ReviseChip
                        prefix="Timeline"
                        label={TIMELINES.find((t) => t.id === timeline)?.label ?? ""}
                        onClick={() => setStep(2)}
                      />
                    </motion.div>

                    {/* Stop 01 — the practice */}
                    <motion.button
                      variants={itemV}
                      type="button"
                      onClick={() => navigate(`#/practice/${practice.slug}`)}
                      className="group mt-5 flex w-full items-center gap-4 rounded-2xl p-5 text-left text-white shadow-luxe transition-transform duration-300 hover:-translate-y-0.5"
                      style={{ backgroundColor: practice.accent }}
                    >
                      <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                        <Icon name={practice.icon} className="h-6.5 w-6.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                          Stop 01 · Recommended practice
                        </span>
                        <span className="mt-0.5 block font-display text-lg font-semibold leading-snug">
                          {practice.name}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-white/70">
                          {practice.tagline}
                        </span>
                      </span>
                      <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </motion.button>

                    {/* Stops 02–04 — waypoints */}
                    <motion.div variants={itemV} className="mt-6">
                      <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-navy-900">
                        Along the way
                      </p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        Evidence and context worth seeing before we talk.
                      </p>
                    </motion.div>
                    <div className="relative mt-3 space-y-1">
                      <div className="absolute bottom-5 left-[13px] top-5 w-px border-l-2 border-dashed border-navy-100" />
                      {waypoints.map((w, i) => (
                        <motion.button
                          key={w.label}
                          variants={itemV}
                          type="button"
                          onClick={() => goWaypoint(w)}
                          className="group relative flex w-full items-center gap-4 rounded-2xl border border-transparent px-3 py-3 text-left transition-all duration-300 hover:border-navy-100 hover:bg-ivory"
                        >
                          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-950 text-[10.5px] font-bold text-gold-400 ring-1 ring-navy-950 transition-transform duration-300 group-hover:scale-110">
                            {String(i + 2).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13.5px] font-bold text-navy-900">
                              {w.label}
                            </span>
                            <span className="block text-[11.5px] leading-snug text-muted-foreground">
                              {w.hint}
                            </span>
                          </span>
                          <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-navy-200 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-600" />
                        </motion.button>
                      ))}
                    </div>

                    {/* Next move CTA */}
                    <motion.div
                      variants={itemV}
                      className="mt-5 rounded-2xl border border-navy-100 bg-ivory p-5"
                    >
                      <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-700">
                        Your next move
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                        {cta?.note}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {timeline === "urgent" && (
                          <Magnetic strength={0.12}>
                            <a
                              href={FIRM.phoneHref}
                              className="btn-sheen inline-flex h-10 items-center gap-2 rounded-xl bg-gold-500 px-5 text-[13px] font-bold text-navy-950 shadow-gold transition-colors hover:bg-gold-400"
                            >
                              <Phone className="h-4 w-4" />
                              Call {FIRM.phone}
                            </a>
                          </Magnetic>
                        )}
                        {timeline === "weeks" && (
                          <Magnetic strength={0.12}>
                            <Button
                              className="btn-sheen h-10 rounded-xl bg-gold-500 px-5 font-bold text-navy-950 shadow-gold hover:bg-gold-400"
                              onClick={() => useSite.getState().openDialog("booking")}
                            >
                              Book a consultation
                            </Button>
                          </Magnetic>
                        )}
                        {timeline === "planning" && (
                          <Magnetic strength={0.12}>
                            <Button
                              className="btn-sheen h-10 rounded-xl bg-gold-500 px-5 font-bold text-navy-950 shadow-gold hover:bg-gold-400"
                              onClick={() => navigate("#/contact")}
                            >
                              Send an enquiry
                            </Button>
                          </Magnetic>
                        )}
                        <Button
                          variant="outline"
                          className="h-10 rounded-xl border-navy-200 px-5 font-bold text-navy-900"
                          onClick={() => scrollToId("practice-areas")}
                        >
                          Browse the six practices
                        </Button>
                      </div>
                    </motion.div>

                    <motion.p
                      variants={itemV}
                      className="mt-4 flex items-start gap-2 text-[11.5px] leading-relaxed text-muted-foreground/80"
                    >
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                      This route is guidance, not legal advice — and it is never
                      stored until you choose to send an enquiry.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer controls */}
              <div className="mt-7 flex items-center justify-between border-t border-navy-50 pt-4">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="flex items-center gap-1.5 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:text-navy-900 disabled:opacity-40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-1.5 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:text-navy-900"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Start over
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————— Sub-components ————————————————— */

function OptionCard({
  option,
  selected,
  onSelect,
}: {
  option: Option<string>;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      variants={itemV}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group flex min-w-0 flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
        selected
          ? "border-gold-500 bg-gold-200/30 shadow-gold"
          : "border-navy-100 hover:border-gold-400/70 hover:bg-ivory"
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
        <option.icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-bold leading-snug text-navy-900">
          {option.label}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
          {option.hint}
        </span>
      </span>
    </motion.button>
  );
}

function ReviseChip({
  prefix,
  label,
  onClick,
}: {
  prefix: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex max-w-full items-center gap-1.5 rounded-full border border-navy-100 bg-ivory px-3 py-1.5 text-[11px] font-semibold text-navy-800 transition-all duration-300 hover:border-gold-500 hover:shadow-gold"
    >
      <span className="text-muted-foreground">{prefix}</span>
      <span className="truncate font-bold text-navy-900">{label}</span>
      <RotateCcw className="h-3 w-3 shrink-0 text-navy-300 transition-colors group-hover:text-gold-600" />
    </button>
  );
}
