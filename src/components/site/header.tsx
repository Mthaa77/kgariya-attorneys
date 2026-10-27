"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Mail,
  Menu,
  Phone,
  Search,
  X,
  CalendarCheck,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigate, useRoute } from "@/lib/router";
import { useSite } from "@/lib/store";
import { FIRM, PRACTICE_AREAS } from "@/lib/site-data";
import { Logo } from "./logo";
import { Icon } from "./icon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

function TopBar() {
  return (
    <div className="hidden bg-navy-950 text-white lg:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-[12.5px]">
        <div className="flex items-center gap-6 text-white/75">
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
          <span className="h-4 w-px bg-white/20" />
          <button
            onClick={() => useSite.getState().openDialog("search")}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
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
    <div className="w-[620px] rounded-2xl border border-white/60 bg-white/95 p-3 shadow-luxe-lg backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between px-3 pt-2">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-700">
          Practice hierarchy — depth over width
        </span>
        <span className="text-[10.5px] font-semibold text-muted-foreground">
          06 focus areas
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {PRACTICE_AREAS.map((p) => (
          <button
            key={p.slug}
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
          </button>
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

  // Close the mobile menu when the route changes (derived during render)
  const [lastRoute, setLastRoute] = useState(route);
  if (lastRoute !== route) {
    setLastRoute(route);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeMain = (r: string) => route === r || route.startsWith(r + "/");

  return (
    <>
      <div className="sticky top-0 z-50">
        <TopBar />
        <header
          className={cn(
            "border-b transition-all duration-500",
            scrolled
              ? "glass border-navy-100/70 shadow-[0_8px_30px_-12px_rgba(10,27,51,0.18)]"
              : "border-transparent bg-white"
          )}
        >
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
            <button
              onClick={() => navigate("#/")}
              aria-label="Kgariya Attorneys — home"
              className="shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
              <Logo />
            </button>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
              <div className="group relative">
                <button
                  className={cn(
                    "flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors",
                    route.startsWith("#/practice")
                      ? "text-gold-700"
                      : "text-navy-800 hover:text-navy-950"
                  )}
                >
                  Practice Areas
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:-translate-y-0 translate-y-1">
                  <PracticeMenu />
                </div>
              </div>
              {MAIN_NAV.map((item) => (
                <button
                  key={item.route}
                  onClick={() => navigate(item.route)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] font-semibold transition-colors",
                    activeMain(item.route)
                      ? "text-gold-700"
                      : "text-navy-800 hover:text-navy-950"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <Button
                onClick={() => useSite.getState().openDialog("booking")}
                className="hidden h-10 rounded-full bg-gold-500 px-5 text-[13px] font-bold text-navy-950 shadow-gold transition-all duration-300 hover:bg-gold-400 hover:shadow-luxe md:inline-flex"
              >
                <CalendarCheck className="h-4 w-4" />
                Book a consultation
              </Button>
              <button
                onClick={() => useSite.getState().openDialog("search")}
                aria-label="Search the site"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy-800 transition-colors hover:bg-ivory xl:hidden"
              >
                <Search className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-gold-300 transition-transform hover:scale-105 xl:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile sheet */}
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
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-1.5 space-y-1 pb-1">
                    {PRACTICE_AREAS.map((p) => (
                      <button
                        key={p.slug}
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
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-2 space-y-0.5">
              {MAIN_NAV.map((item) => (
                <button
                  key={item.route}
                  onClick={() => navigate(item.route)}
                  className={cn(
                    "block w-full rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition-colors",
                    activeMain(item.route)
                      ? "bg-navy-950 text-gold-300"
                      : "text-navy-900 hover:bg-ivory"
                  )}
                >
                  {item.label}
                </button>
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
