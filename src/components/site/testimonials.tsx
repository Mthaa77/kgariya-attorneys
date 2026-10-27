"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Scale } from "lucide-react";
import { navigate } from "@/lib/router";
import { TESTIMONIALS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 6500;

/**
 * "Client voices" carousel — anonymised testimonials with
 * auto-advance, pause-on-hover and manual navigation.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), DURATION);
    return () => clearTimeout(t);
  }, [index, paused]);

  const go = (i: number) =>
    setIndex(((i % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);

  const t = TESTIMONIALS[index];

  return (
    <section
      aria-label="Client voices"
      className="bg-white py-24 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-700">
                Client voices
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-[2.75rem]">
              What institutions say when the{" "}
              <span className="gold-text italic">papers hold</span>.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 text-navy-800 transition-all duration-300 hover:border-gold-500 hover:text-gold-700"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 text-navy-800 transition-all duration-300 hover:border-gold-500 hover:text-gold-700"
            >
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-12 overflow-hidden rounded-[2.5rem] bg-navy-950 px-7 py-12 shadow-luxe-lg sm:px-14 sm:py-14"
        >
          {/* ambient gold + grid */}
          <div className="texture-grid-dark pointer-events-none absolute inset-0" />
          <div className="animate-aurora pointer-events-none absolute -right-24 -top-32 h-96 w-[420px] rounded-full bg-gold-500/15 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-80 rounded-full bg-gold-400/10 blur-[100px]" />

          <div className="relative">
            <Quote className="h-9 w-9 text-gold-500" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="mt-6"
              >
                <p className="max-w-4xl font-display text-xl italic leading-relaxed text-white sm:text-2xl lg:text-[1.7rem]">
                  “{t.quote}”
                </p>
                <footer className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/15 text-gold-300">
                    <Scale className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-bold text-white">{t.name}</span>
                    <span className="block text-[12.5px] text-white/60">{t.org}</span>
                  </span>
                  <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">
                    {t.practice}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="mt-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className="group relative flex h-6 items-center"
                  >
                    <span
                      className={cn(
                        "h-[3px] overflow-hidden rounded-full transition-all duration-500",
                        i === index ? "w-10 bg-white/20" : "w-4 bg-white/20 group-hover:bg-white/40"
                      )}
                    >
                      {i === index && !paused && (
                        <motion.span
                          key={`t-prog-${index}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: DURATION / 1000, ease: "linear" }}
                          className="block h-full bg-gold-400"
                        />
                      )}
                      {i === index && paused && (
                        <span className="block h-full w-full bg-gold-400/70" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => navigate("#/contact")}
                className="group inline-flex items-center gap-2 text-[13px] font-bold text-gold-300"
              >
                <span className="link-underline">Discuss your mandate</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>

        <p className="mt-5 text-center text-[11px] text-muted-foreground/70">
          Client identities are anonymised in line with Legal Practice Council marketing
          rules and our confidentiality undertakings.
        </p>
      </div>
    </section>
  );
}
