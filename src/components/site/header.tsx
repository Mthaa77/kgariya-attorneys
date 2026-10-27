"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  Clock,
  Mail,
  Menu,
  Phone,
  PhoneCall,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigate, useRoute } from "@/lib/router";
import { useSite } from "@/lib/store";
import { FIRM, PRACTICE_AREAS } from "@/lib/site-data";
import { Logo } from "./logo";
import { Icon } from "./icon";
import { Magnetic } from "./interactions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  { label: "Our People", route: "#/people" },
  { label: "About the Firm", route: "#/about" },
  { label: "Kgariya & Co Group", route: "#/group" },
  { label: "Insights", route: "#/insights" },
  { label: "Joining the Firm", route: "#/joining" },
  { label: "Careers", route: "#/careers" },
  { label: "Contact", route: "#/contact" },
];

function PracticeMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="w-[620px] rounded-3xl border border-white/60 bg-white/95 p-3 shadow-luxe-lg backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between px-3 pt-2">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-700">
          Practice hierarchy — depth over width
        </span>
        <span className="text-[10.5px] font-semibold text-muted-foreground">
          06 focus areas
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {PRACTICE_AREAS.map((p, i) => (
          <motion.button
            key={p.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.03 + i * 0.035, ease: EASE }}
            onClick={() => {
              navigate(`#/practice/${p.slug}`);
              onNavigate?.();
            }}
            className="group flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-ivory"
          >
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: p.accent }}
            >
              <Icon name={p.icon} className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-[13.5px] font-semibold leading-snug text-navy-900">
                <span className="text-[10px] font-bold text-gold-600">{p.number}</span>
                {p.shortName}
              </span>
              <span className="mt-0.5 block truncate text-[11.5px] text-muted-foreground">
                {p.tagline}
              </span>
            </span>
          </motion.button>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-xl bg-navy-950 px-4 py-3">
        <p className="text-[12px] text-white/70">
          Not sure which practice fits?{" "}
          <span className="font-semibold text-gold-300">Answer three questions.</span>
        </p>
        <Button
          size="sm"
          variant="gold"
          className="h-7 rounded-full px-3 text-[11.5px]"
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
  );
}

export function Header() {
  const route = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paOpen, setPaOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [paHover, setPaHover] = useState(false);

  // Close the mobile menu when the route changes (derived during render)
  const [lastRoute, setLastRoute] = useState(route);
  if (lastRoute !== route) {
    setLastRoute(route);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              onMouseLeave={() => setHovered(null)}
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
                {/* Practice areas + mega menu */}
                <div
                  className="relative"
                  onMouseEnter={() => setPaHover(true)}
                  onMouseLeave={() => setPaHover(false)}
                >
                  <button
                    onClick={() => setPaHover((v) => !v)}
                    className={cn(
                      "relative flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300",
                      practiceActive || paHover ? "text-gold-300" : "text-white/80 hover:text-white"
                    )}
                  >
                    {paHover && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
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

                  <AnimatePresence>
                    {paHover && (
                      <motion.div
                        initial={{ opacity: 0, y: 14, scale: 0.97, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
                        transition={{ duration: 0.32, ease: EASE }}
                        className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                      >
                        <PracticeMenu />
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
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
            </div>
          </div>
        </div>
      </div>

      {/* ——— Mobile sheet ——— */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-[380px] overflow-y-auto border-navy-100 bg-white p-0 sm:max-w-[420px]"
        >
          <SheetHeader className="border-b border-navy-100/70 p-5 text-left">
            <SheetTitle asChild>
              <div>
                <Logo />
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-[calc(100%-88px)] flex-col overflow-y-auto p-5">
            <button
              onClick={() => setPaOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl bg-ivory px-4 py-3.5 text-[15px] font-bold text-navy-900"
            >
              Practice Areas
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-gold-600 transition-transform duration-300",
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
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-1.5 space-y-1 pb-1">
                    {PRACTICE_AREAS.map((p, i) => (
                      <motion.button
                        key={p.slug}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04, ease: EASE }}
                        onClick={() => {
                          navigate(`#/practice/${p.slug}`);
                          setMobileOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-ivory"
                      >
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                          style={{ backgroundColor: p.accent }}
                        >
                          <Icon name={p.icon} className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-[13.5px] font-semibold text-navy-900">
                          {p.name}
                        </span>
                        <ChevronRight className="ml-auto h-4 w-4 text-gold-600" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-2 space-y-0.5">
              {MAIN_NAV.map((item, i) => (
                <motion.button
                  key={item.route}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: EASE }}
                  onClick={() => navigate(item.route)}
                  className={cn(
                    "block w-full rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition-colors",
                    activeMain(item.route)
                      ? "bg-navy-950 text-gold-300"
                      : "text-navy-900 hover:bg-ivory"
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto space-y-2.5 pt-6">
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  useSite.getState().openDialog("booking");
                }}
                className="h-12 w-full rounded-xl bg-gold-500 text-[14px] font-bold text-navy-950 shadow-gold hover:bg-gold-400"
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
                className="h-12 w-full rounded-xl border-navy-200 text-[14px] font-bold text-navy-900"
              >
                <PhoneCall className="h-4.5 w-4.5" />
                Request a call back
              </Button>
              <div className="rounded-xl bg-ivory p-4 text-center">
                <a href={FIRM.phoneHref} className="text-[14px] font-bold text-navy-900">
                  {FIRM.phone}
                </a>
                <p className="mt-1 text-[12px] text-muted-foreground">{FIRM.hours}</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
