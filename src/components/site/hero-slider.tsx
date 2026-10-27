"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { cn } from "@/lib/utils";

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
    secondary: { label: "Explore development packaging", route: "#/practice/real-estate-development" },
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

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const slide = SLIDES[index];

  return (
    <section
      className="relative h-[92svh] min-h-[640px] max-h-[900px] w-full overflow-hidden bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Highlights"
    >
      {/* Backgrounds */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              className="animate-kenburns object-cover"
              sizes="100vw"
            />
          </div>
          <div className="hero-vignette absolute inset-0" />
          <div className="texture-grid-dark absolute inset-0 opacity-30" />
        </motion.div>
      </AnimatePresence>

      {/* Floating gold accents */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold-500/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-56 w-56 rounded-full bg-gold-400/10 blur-[90px]" />

      {/* Copy */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-24 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300"
            >
              <span className="h-px w-10 bg-gold-500" />
              {slide.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.4rem]"
            >
              {slide.title}
              <br />
              <span className="gold-text italic">{slide.titleAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-white/80 sm:text-lg"
            >
              {slide.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3.5"
            >
              <Button
                size="lg"
                variant="gold"
                className="h-13 rounded-full px-8 text-[14.5px]"
                onClick={() => useSite.getState().openDialog("booking")}
              >
                {slide.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
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
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 right-6 z-20 flex items-center gap-3 lg:right-10">
        <div className="mr-2 hidden items-center gap-2 sm:flex">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index ? "w-10 bg-gold-400" : "w-4 bg-white/30 hover:bg-white/50"
              )}
            />
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
          <Pause className="h-4 w-4" />
        </button>
      </div>

      {/* Positioning chip */}
      <div className="absolute bottom-8 left-6 z-20 hidden items-center gap-3 lg:left-10 lg:flex">
        <span className="rounded-full border border-white/20 bg-navy-950/40 px-4 py-2 font-display text-[13px] italic text-gold-200 backdrop-blur-md">
          Evidence over slogans.
        </span>
      </div>
    </section>
  );
}
