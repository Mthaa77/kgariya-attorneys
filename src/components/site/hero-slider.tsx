"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { COUNTERS } from "@/lib/site-data";
import { Counter } from "./counter";
import { Magnetic, WordReveal } from "./interactions";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const SLIDES = [
  {
    image: "/images/hero-litigation.png",
    eyebrow: "Commercial Litigation & Arbitration",
    title: "High-stakes disputes,",
    titleAccent: "fought with strategy.",
    text: "High Court litigation and AFSA arbitration for corporates, banks and public bodies — strategy before summons, reporting at every stage.",
    primary: { label: "Book a consultation", action: "booking" },
    secondary: { label: "Our practice areas", route: "#practice" },
  },
  {
    image: "/images/hero-development.png",
    eyebrow: "Real Estate Development Packaging",
    title: "From bare land",
    titleAccent: "to capital close.",
    text: "End-to-end legal packaging for townships, rezoning, NHBRC, SHRA schemes and bank/DFI finance applications — built to underwrite.",
    primary: { label: "Book a consultation", action: "booking" },
    secondary: {
      label: "Explore development packaging",
      route: "#/practice/real-estate-development",
    },
  },
  {
    image: "/images/hero-finance.png",
    eyebrow: "Banking & Development Finance",
    title: "Facilities and security,",
    titleAccent: "documented to hold.",
    text: "Facility agreements, multi-tiered security packages and workouts — panel-ready for lenders, negotiated fairly for borrowers.",
    primary: { label: "Book a consultation", action: "booking" },
    secondary: { label: "Banking & finance practice", route: "#/practice/banking-finance" },
  },
];

const DURATION = 7000;

const CARD_ICONS = ["scale", "briefcase", "landmark"] as const;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const go = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => go(index + 1), DURATION);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, go]);

  // Scroll-linked parallax: image drifts, copy lifts away and fades
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const stackY = useTransform(scrollYProgress, [0, 1], [0, -130]);

  const slide = SLIDES[index];

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[700px] max-h-[1000px] w-full overflow-hidden bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Highlights"
    >
      {/* ——— Parallax backgrounds ——— */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 overflow-hidden">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              className="animate-kenburns object-cover"
              sizes="100vw"
            />
          </motion.div>
          <div className="hero-vignette absolute inset-0" />
          <div className="texture-grid-dark absolute inset-0 opacity-30" />
          {/* cinematic light sweep per slide */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div
              key={`sweep-${index}`}
              className="animate-light-sweep absolute -top-1/4 h-[150%] w-[38%] bg-gradient-to-r from-transparent via-gold-300/10 to-transparent"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating gold accents */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold-500/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-56 w-56 rounded-full bg-gold-400/10 blur-[90px]" />

      {/* ——— Content ——— */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pb-32 pt-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Copy */}
          <motion.div style={{ y: copyY, opacity: copyOpacity }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                  className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300"
                >
                  <span className="h-px w-10 bg-gold-500" />
                  {slide.eyebrow}
                </motion.p>

                <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.3rem]">
                  <WordReveal text={slide.title} delay={0.18} className="block" />
                  <WordReveal
                    text={slide.titleAccent}
                    delay={0.18 + slide.title.split(" ").length * 0.055 + 0.05}
                    accentClassName="gold-text-shine italic"
                    className="block"
                  />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                  className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-white/80 sm:text-lg"
                >
                  {slide.text}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
                  className="mt-10 flex flex-wrap items-center gap-3.5"
                >
                  <Magnetic strength={0.22}>
                    <Button
                      size="lg"
                      variant="gold"
                      className="btn-sheen h-13 rounded-full px-8 text-[14.5px]"
                      onClick={() => useSite.getState().openDialog("booking")}
                    >
                      {slide.primary.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Magnetic>
                  <Magnetic strength={0.16}>
                    <Button
                      size="lg"
                      variant="outline-light"
                      className="h-13 rounded-full px-8 text-[14.5px]"
                      onClick={() =>
                        slide.secondary.route === "#practice"
                          ? document
                              .getElementById("practice-areas")
                              ?.scrollIntoView({ behavior: "smooth" })
                          : navigate(slide.secondary.route)
                      }
                    >
                      {slide.secondary.label}
                    </Button>
                  </Magnetic>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Floating proof stack */}
          <motion.div
            style={{ y: stackY }}
            className="hidden flex-col items-end gap-4 lg:flex"
            aria-label="Firm indicators"
          >
            {COUNTERS.slice(0, 3).map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: 46 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.85 + i * 0.14, ease: EASE }}
                className={cn(
                  "animate-floaty w-[320px] rounded-2xl border border-white/12 bg-navy-950/45 p-5 shadow-luxe-lg backdrop-blur-xl transition-colors duration-500 hover:border-gold-500/45",
                  i === 1 && "mr-8",
                  i === 2 && "mr-2"
                )}
                style={{ animationDelay: `${i * 1.4}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/15 text-gold-300">
                    <CardGlyph name={CARD_ICONS[i]} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[1.7rem] font-semibold leading-none tracking-tight text-white">
                      <Counter value={c.value} suffix={c.suffix} />
                    </p>
                    <p className="mt-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-white/70">
                      {c.label}
                    </p>
                  </div>
                </div>
                <p className="mt-3 border-t border-white/10 pt-2.5 text-[11px] leading-relaxed text-white/55">
                  {c.note}
                </p>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mr-2 text-[10.5px] italic text-white/40"
            >
              Practice indicators — re-verified against LPC marketing rules before publication.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ——— Bottom control deck ——— */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        {/* Slide progress deck */}
        <div className="mx-auto flex max-w-7xl items-end justify-between px-6 pb-8">
          {/* Left: positioning chip */}
          <div className="hidden items-center gap-3 lg:flex">
            <span className="rounded-full border border-white/20 bg-navy-950/40 px-4 py-2 font-display text-[13px] italic text-gold-200 backdrop-blur-md">
              Evidence over slogans.
            </span>
          </div>

          {/* Center: scroll cue */}
          <button
            onClick={() =>
              document.getElementById("practice-areas")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to content"
            className="group mx-auto flex flex-col items-center gap-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/30 p-1.5 backdrop-blur-sm transition-colors group-hover:border-gold-400/70">
              <span className="h-2 w-1 rounded-full bg-gold-300 animate-scroll-cue" />
            </span>
            <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-white/50 transition-colors group-hover:text-gold-300">
              Scroll
            </span>
          </button>

          {/* Right: progress dots + controls */}
          <div className="flex items-center gap-3">
            <div className="mr-1 hidden items-center gap-2 sm:flex">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                  className="group relative flex h-6 items-center"
                >
                  <span className="relative h-[3px] w-12 overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/35">
                    {i === index && !paused && (
                      <motion.span
                        key={`prog-${index}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: DURATION / 1000, ease: "linear" }}
                        className="absolute inset-y-0 left-0 bg-gold-400"
                      />
                    )}
                    {i === index && paused && (
                      <span className="absolute inset-0 bg-gold-400/70" />
                    )}
                    {i !== index && (
                      <span
                        className={cn(
                          "absolute inset-y-0 left-0",
                          i < index ? "w-full bg-gold-500/50" : "w-0"
                        )}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 backdrop-blur-md transition-all hover:border-gold-400 hover:text-gold-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 backdrop-blur-md transition-all hover:border-gold-400 hover:text-gold-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slides" : "Pause slides"}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all",
                paused
                  ? "border-gold-400 text-gold-300"
                  : "border-white/25 text-white/80 hover:border-gold-400 hover:text-gold-300"
              )}
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Small inline glyph chooser to avoid a heavy icon map import */
function CardGlyph({ name }: { name: (typeof CARD_ICONS)[number] }) {
  if (name === "scale") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
        <path d="M12 3v18M4 7h16M6 7l-3 6a3.5 3.5 0 0 0 6 0L6 7Zm12 0-3 6a3.5 3.5 0 0 0 6 0l-3-6ZM8 21h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "briefcase") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
