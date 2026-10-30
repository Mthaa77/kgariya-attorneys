"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Landmark,
  Mail,
  Menu,
  Newspaper,
  Phone,
  PhoneCall,
  Search,
  Users,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigate, useRoute } from "@/lib/router";
import { useSite } from "@/lib/store";
import { FIRM, PRACTICE_AREAS, PRACTICE_FORUMS, getPractice } from "@/lib/site-data";
import { Logo } from "./logo";
import { Icon } from "./icon";
import { Magnetic } from "./interactions";
import { SAFlagChip } from "./sa-legal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;

/** Utility strip above the capsule — quietly slides away once scrolling starts. */
function TopBar({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={cn(
        "hidden overflow-hidden transition-all duration-500 ease-out lg:block",
        hidden ? "max-h-0 -translate-y-2 opacity-0" : "max-h-12 translate-y-0 opacity-100"
      )}
    >
      <div className="mx-auto flex h-11 max-w-[1400px] items-center justify-between px-6 text-[12.5px]">
        <div className="flex items-center gap-6 text-white/65">
          <a
            href={FIRM.phoneHref}
            className="flex items-center gap-2 transition-colors hover:text-gold-300"
          >
            <Phone className="h-3.5 w-3.5 text-gold-400" />
            {FIRM.phone}
          </a>
          <a
            href={`mailto:${FIRM.email}`}
            className="flex items-center gap-2 transition-colors hover:text-gold-300"
          >
            <Mail className="h-3.5 w-3.5 text-gold-400" />
            {FIRM.email}
          </a>
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-gold-400" />
            {FIRM.hoursShort}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => useSite.getState().openDialog("callback")}
            className="rounded-full px-3 py-1 text-[12px] font-semibold text-gold-300 transition-colors hover:bg-white/10 hover:text-gold-200"
          >
            Request a call back
          </button>
          <span className="h-4 w-px bg-white/15" />
          <button
            onClick={() => useSite.getState().openDialog("search")}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white/65 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

const MAIN_NAV = [
  { label: "Our People", route: "#/people", icon: Users },
  { label: "About the Firm", route: "#/about", icon: Landmark },
  { label: "Kgariya & Co Group", route: "#/group", icon: Building2 },
  { label: "Insights", route: "#/insights", icon: Newspaper },
  { label: "Joining the Firm", route: "#/joining", icon: GraduationCap },
  { label: "Careers", route: "#/careers", icon: Briefcase },
  { label: "Contact", route: "#/contact", icon: Mail },
];

/* ————————————————————————————————————————————————
   Practice menu tray — the flagship mega menu.
   Left: sliding practice index · Right: crossfading
   chambers dossier imagery · Gold hairline entrance.
———————————————————————————————————————————————— */

const TRAY_MEDIA: Record<string, { src: string; caption: string; alt: string }> = {
  "commercial-litigation": {
    src: "/images/sa-advocate-court.png",
    caption: "In the forum — counsel arriving before the High Court",
    alt: "South African counsel in court robes carrying a briefcase in a wood-panelled courtroom",
  },
  "real-estate-development": {
    src: "/images/sa-team-boardroom.png",
    caption: "In consultation — a development packaging session",
    alt: "South African attorneys reviewing development documents in a glass boardroom",
  },
  "banking-finance": {
    src: "/images/sa-attorney-library.png",
    caption: "In the library — security documentation in drafting",
    alt: "South African attorney drafting finance documents in a law library",
  },
  "mining-resources": {
    src: "/images/sa-counsel-speaking.png",
    caption: "On your feet — submissions in regulatory review",
    alt: "South African counsel making submissions from a courtroom lectern",
  },
  "agricultural-finance": {
    src: "/images/sa-team-corridor.png",
    caption: "Counsel on the move — between forums",
    alt: "South African counsel and attorney walking through the firm's offices",
  },
  "conveyancing-property": {
    src: "/images/sa-judge-bench.png",
    caption: "Officers of the court — Deeds Office & Master's alignments",
    alt: "A South African judicial officer in robes presiding at the bench",
  },
};

function PracticeMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [activeSlug, setActiveSlug] = useState(PRACTICE_AREAS[0].slug);
  const active = getPractice(activeSlug) ?? PRACTICE_AREAS[0];
  const media = TRAY_MEDIA[active.slug];
  const forum = PRACTICE_FORUMS[active.slug]?.[0];

  const go = () => {
    navigate(`#/practice/${active.slug}`);
    onNavigate?.();
  };

  return (
    <div className="w-[min(94vw,940px)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-navy-950/[0.985] text-left shadow-luxe-lg backdrop-blur-2xl">
      {/* gold hairline sweep on open */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-gradient-to-r from-transparent via-gold-400/80 to-transparent"
      />

      <div className="grid lg:grid-cols-[1.02fr_1.12fr]">
        {/* ——— Left: practice index ——— */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between px-3 pt-2">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-300">
              Practice hierarchy
            </span>
            <span className="text-[10.5px] font-semibold text-white/40">
              06 focus areas
            </span>
          </div>

          <div className="mt-2.5 space-y-0.5">
            {PRACTICE_AREAS.map((p, i) => {
              const isActive = activeSlug === p.slug;
              return (
                <motion.button
                  key={p.slug}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.34, delay: 0.06 + i * 0.045, ease: EASE }}
                  onMouseEnter={() => setActiveSlug(p.slug)}
                  onFocus={() => setActiveSlug(p.slug)}
                  onClick={() => {
                    navigate(`#/practice/${p.slug}`);
                    onNavigate?.();
                  }}
                  aria-current={isActive}
                  className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="tray-row"
                      className="absolute inset-0 rounded-xl bg-white/[0.07] ring-1 ring-white/10"
                      transition={SPRING}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="tray-gold"
                      className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-gold-400"
                      transition={SPRING}
                    />
                  )}
                  <span
                    className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition-transform duration-300"
                    style={{ backgroundColor: p.accent }}
                  >
                    <Icon name={p.icon} className="h-4 w-4" />
                  </span>
                  <span className="relative z-10 min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[13.5px] font-semibold leading-snug text-white">
                      <span className="text-[10px] font-bold text-gold-400">{p.number}</span>
                      {p.shortName}
                    </span>
                    <span className="mt-0.5 block truncate text-[11.5px] text-white/45">
                      {p.tagline}
                    </span>
                  </span>
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="relative z-10 shrink-0"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-gold-300" />
                  </motion.span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
            <p className="text-[12px] leading-snug text-white/65">
              Not sure which practice fits?{" "}
              <span className="font-semibold text-gold-300">Answer three questions.</span>
            </p>
            <Button
              size="sm"
              variant="gold"
              className="btn-sheen h-7 shrink-0 rounded-full px-3 text-[11.5px]"
              onClick={() => {
                useSite.getState().openDialog("questions");
                onNavigate?.();
              }}
            >
              Start the flow
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* ——— Right: chambers dossier panel ——— */}
        <div className="relative hidden min-h-[460px] overflow-hidden border-l border-white/10 lg:block">
          <AnimatePresence initial={false}>
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 1.07 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(min-width: 1280px) 480px, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/45 via-transparent to-transparent" />

              {/* ghost numeral */}
              <span className="pointer-events-none absolute right-5 top-3 font-display text-[5.5rem] font-bold leading-none text-white/10">
                {active.number}
              </span>

              {/* dossier content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                  className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-300"
                >
                  <span className="h-px w-6 bg-gold-400/70" />
                  {media.caption}
                </motion.p>
                <motion.h4
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.16 }}
                  className="mt-2.5 font-display text-[1.35rem] font-semibold leading-snug text-white"
                >
                  {active.name}
                </motion.h4>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.22 }}
                  className="mt-3.5 flex flex-wrap gap-1.5"
                >
                  {forum && (
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10.5px] font-semibold text-white/75 backdrop-blur-sm">
                      {forum.name} · {forum.note}
                    </span>
                  )}
                  <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10.5px] font-semibold text-white/75 backdrop-blur-sm">
                    {active.matters.length} representative matters
                  </span>
                  <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 text-[10.5px] font-semibold text-gold-300 backdrop-blur-sm">
                    {active.stat.value}
                    {active.stat.suffix} {active.stat.label}
                  </span>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.28 }}
                  onClick={go}
                  className="btn-sheen group mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-[12px] font-bold text-navy-950 shadow-gold transition-colors hover:bg-gold-400"
                >
                  Open the practice dossier
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ——— Bottom jurisdiction strip ——— */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-navy-900/60 px-5 py-3">
        <div className="flex items-center gap-3">
          <SAFlagChip dark />
        </div>
        <p className="text-[11.5px] text-white/50">
          Regulated by the Legal Practice Council ·{" "}
          <a href={FIRM.phoneHref} className="font-semibold text-gold-300 transition-colors hover:text-gold-200">
            {FIRM.phone}
          </a>
        </p>
      </div>
    </div>
  );
}

export function Header() {
  const route = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paOpen, setPaOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [paHover, setPaHover] = useState(false);

  // Close menus when the route changes (derived during render)
  const [lastRoute, setLastRoute] = useState(route);
  if (lastRoute !== route) {
    setLastRoute(route);
    if (mobileOpen) setMobileOpen(false);
    if (paHover) setPaHover(false);
    if (hovered) setHovered(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The open tray dismisses on scroll or Escape — keeps the capsule feeling alive
  useEffect(() => {
    if (!paHover) return;
    const onScroll = () => setPaHover(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPaHover(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [paHover]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.4 });

  const activeMain = (r: string) => route === r || route.startsWith(r + "/");
  const practiceActive = route.startsWith("#/practice");

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto">
          <TopBar hidden={scrolled} />

          {/* ——— Floating capsule navbar ——— */}
          <div className="px-3 pb-2 pt-2 sm:px-5">
            <div
              className={cn(
                "relative mx-auto flex items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 ease-out sm:px-6",
                scrolled
                  ? "h-[62px] max-w-[1240px] border-white/10 bg-navy-950/75 shadow-luxe-lg backdrop-blur-2xl"
                  : "h-[74px] max-w-[1400px] border-white/10 bg-navy-950/40 shadow-luxe backdrop-blur-xl"
              )}
              onMouseLeave={() => {
                setHovered(null);
                setPaHover(false);
              }}
            >
              {/* subtle top sheen on the capsule */}
              <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <button
                onClick={() => navigate("#/")}
                aria-label="Kgariya Attorneys — home"
                className="shrink-0 transition-transform duration-300 hover:scale-[1.03]"
              >
                <Logo dark compact={scrolled} />
              </button>

              {/* Desktop nav */}
              <nav
                className="hidden items-center gap-0.5 xl:flex"
                aria-label="Primary"
              >
                {/* Practice areas + mega tray */}
                <div className="relative">
                  <button
                    onClick={() => setPaHover((v) => !v)}
                    onMouseEnter={() => setPaHover(true)}
                    aria-haspopup="true"
                    aria-expanded={paHover}
                    className={cn(
                      "relative flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300",
                      practiceActive || paHover ? "text-gold-300" : "text-white/80 hover:text-white"
                    )}
                  >
                    {paHover && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={SPRING}
                      />
                    )}
                    <span className="relative">Practice Areas</span>
                    <ChevronDown
                      className={cn(
                        "relative h-3.5 w-3.5 transition-transform duration-300",
                        paHover && "rotate-180"
                      )}
                    />
                  </button>
                </div>

                {MAIN_NAV.map((item) => {
                  const active = activeMain(item.route);
                  return (
                    <button
                      key={item.route}
                      onClick={() => navigate(item.route)}
                      onMouseEnter={() => setHovered(item.route)}
                      className={cn(
                        "relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-colors duration-300",
                        active ? "text-gold-300" : "text-white/80 hover:text-white"
                      )}
                    >
                      {hovered === item.route && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/10"
                          transition={SPRING}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => useSite.getState().openDialog("search")}
                  aria-label="Search the site"
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:border-gold-400/60 hover:text-gold-300 md:flex xl:hidden"
                >
                  <Search className="h-4 w-4" />
                </button>
                <Magnetic strength={0.18} className="hidden md:inline-block">
                  <Button
                    onClick={() => useSite.getState().openDialog("booking")}
                    className="btn-sheen h-11 rounded-full bg-gold-500 px-5 text-[13px] font-bold text-navy-950 shadow-gold transition-all duration-300 hover:bg-gold-400 hover:shadow-luxe"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Book a consultation
                  </Button>
                </Magnetic>
                <button
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-gold transition-transform duration-300 hover:scale-105 xl:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>

              {/* Page scroll progress hairline */}
              <motion.div
                aria-hidden
                style={{ scaleX: progress }}
                className={cn(
                  "absolute bottom-[7px] left-1/2 h-[2px] w-[52%] -translate-x-1/2 origin-left rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 transition-opacity duration-500",
                  scrolled ? "opacity-90" : "opacity-0"
                )}
              />

              {/* ——— The practice tray, anchored to the capsule ——— */}
              <AnimatePresence>
                {paHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(5px)" }}
                    transition={{ duration: 0.34, ease: EASE }}
                    className="absolute left-2 top-full z-50 origin-top sm:left-4"
                  >
                    <PracticeMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Mobile tray — premium navy drawer ——— */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          aria-describedby={undefined}
          className="w-full max-w-[400px] gap-0 overflow-y-auto border-white/10 bg-navy-950 p-0 sm:max-w-[430px] [&>button]:right-4 [&>button]:top-4 [&>button]:z-30 [&>button]:rounded-full [&>button]:bg-navy-950/70 [&>button]:p-1.5 [&>button]:text-white [&>button]:opacity-100 [&>button]:backdrop-blur-md"
        >
          <SheetTitle className="sr-only">Site menu — Kgariya Attorneys Incorporated</SheetTitle>
          {/* image header band */}
          <div className="relative h-44 shrink-0 overflow-hidden">
            <Image
              src="/images/sa-team-corridor.png"
              alt="Kgariya counsel and attorney walking through the firm's offices"
              fill
              sizes="(max-width: 640px) 100vw, 430px"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-navy-950/10" />
            <div className="absolute left-5 top-5">
              <Logo dark />
            </div>
            <div className="absolute inset-x-5 bottom-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
                className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-300"
              >
                Evidence over slogans
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.22 }}
                className="mt-1 text-[12px] text-white/70"
              >
                Pretoria · Gauteng · Nationwide mandates
              </motion.p>
            </div>
          </div>

          <div className="flex min-h-[calc(100%-11rem)] flex-col p-5">
            {/* Practice areas accordion */}
            <button
              onClick={() => setPaOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl bg-white/[0.06] px-4 py-3.5 text-[15px] font-bold text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.09]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
                  <Landmark className="h-3.5 w-3.5" />
                </span>
                Practice Areas
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-gold-300 transition-transform duration-300",
                  paOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {paOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="shrink-0 overflow-hidden"
                >
                  <div className="mt-1.5 space-y-1 pb-1">
                    {PRACTICE_AREAS.map((p, i) => (
                      <motion.button
                        key={p.slug}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.32, delay: i * 0.045, ease: EASE }}
                        onClick={() => {
                          navigate(`#/practice/${p.slug}`);
                          setMobileOpen(false);
                        }}
                        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
                      >
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                          style={{ backgroundColor: p.accent }}
                        >
                          <Icon name={p.icon} className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-semibold text-white">
                            {p.shortName}
                          </span>
                          <span className="block truncate text-[11px] text-white/45">
                            {p.tagline}
                          </span>
                        </span>
                        <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-gold-400 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main navigation — staggered */}
            <div className="mt-3 space-y-0.5">
              {MAIN_NAV.map((item, i) => {
                const NavIcon = item.icon;
                const active = activeMain(item.route);
                return (
                  <motion.button
                    key={item.route}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, delay: 0.05 + i * 0.04, ease: EASE }}
                    onClick={() => navigate(item.route)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition-colors",
                      active
                        ? "bg-gold-500/15 text-gold-300 ring-1 ring-gold-500/30"
                        : "text-white/85 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    <NavIcon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        active ? "text-gold-300" : "text-white/40"
                      )}
                    />
                    {item.label}
                    <ChevronRight
                      className={cn(
                        "ml-auto h-4 w-4 transition-all duration-300",
                        active ? "text-gold-400" : "text-white/20"
                      )}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Footer stack */}
            <div className="mt-auto space-y-2.5 pt-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3, ease: EASE }}
                className="space-y-2.5"
              >
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    useSite.getState().openDialog("booking");
                  }}
                  className="btn-sheen h-12 w-full rounded-xl bg-gold-500 text-[14px] font-bold text-navy-950 shadow-gold hover:bg-gold-400"
                >
                  <CalendarCheck className="h-4.5 w-4.5" />
                  Book a consultation
                </Button>
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    useSite.getState().openDialog("callback");
                  }}
                  variant="outline"
                  className="h-12 w-full rounded-xl border-white/20 bg-transparent text-[14px] font-bold text-white hover:bg-white/10 hover:text-white"
                >
                  <PhoneCall className="h-4.5 w-4.5" />
                  Request a call back
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.38, ease: EASE }}
                className="rounded-xl bg-white/[0.05] p-4 text-center ring-1 ring-white/10"
              >
                <a href={FIRM.phoneHref} className="text-[14px] font-bold text-gold-300">
                  {FIRM.phone}
                </a>
                <p className="mt-1 text-[12px] text-white/50">{FIRM.hours}</p>
                <div className="mt-3 flex justify-center">
                  <SAFlagChip dark />
                </div>
              </motion.div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
