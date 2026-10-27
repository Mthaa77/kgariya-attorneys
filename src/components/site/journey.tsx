"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { JOURNEY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/** Interactive 4-step engagement journey with animated progress rail. */
export function JourneyStepper({ dark = false }: { dark?: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("grid gap-10 lg:grid-cols-[380px_1fr]", dark && "text-white")}>
      {/* Steps rail */}
      <div className="relative">
        <div
          className={cn(
            "absolute bottom-6 left-[27px] top-6 w-0.5 rounded-full",
            dark ? "bg-white/10" : "bg-navy-100"
          )}
        />
        <motion.div
          className="absolute left-[27px] top-6 w-0.5 rounded-full bg-gradient-to-b from-gold-500 to-gold-300"
          animate={{ height: `${(active / (JOURNEY.length - 1)) * 100}%` }}
          style={{ maxHeight: "calc(100% - 48px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <ol className="relative space-y-2">
          {JOURNEY.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li key={s.step}>
                <button
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-colors hover:bg-white/5"
                >
                  <span
                    className={cn(
                      "relative z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all duration-300",
                      isActive
                        ? "scale-110 border-gold-500 bg-gold-500 text-navy-950 shadow-gold"
                        : isDone
                          ? "border-gold-500 bg-navy-950 text-gold-400"
                          : dark
                            ? "border-white/25 bg-navy-950 text-white/60"
                            : "border-navy-200 bg-white text-muted-foreground"
                    )}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : s.step}
                  </span>
                  <span
                    className={cn(
                      "text-[14px] font-semibold leading-snug transition-colors",
                      isActive
                        ? "text-gold-600"
                        : dark
                          ? "text-white/70"
                          : "text-navy-800 group-hover:text-navy-950"
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Detail card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border p-8 sm:p-10",
          dark ? "border-white/10 bg-white/5" : "border-navy-100 bg-white shadow-luxe"
        )}
      >
        <span
          className={cn(
            "pointer-events-none absolute -right-6 -top-10 font-display text-[160px] font-bold leading-none",
            dark ? "text-white/5" : "text-navy-950/5"
          )}
        >
          {JOURNEY[active].step}
        </span>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className={cn(
              "text-[11px] font-bold uppercase tracking-[0.24em]",
              "text-gold-600"
            )}
          >
            Step {JOURNEY[active].step} of 4
          </p>
          <h3
            className={cn(
              "mt-3 max-w-lg font-display text-2xl font-semibold leading-snug",
              dark ? "text-white" : "text-navy-900"
            )}
          >
            {JOURNEY[active].title}
          </h3>
          <p
            className={cn(
              "mt-4 max-w-xl text-[14.5px] leading-relaxed",
              dark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {JOURNEY[active].text}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {JOURNEY[active].chips.map((c) => (
              <span
                key={c}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[11.5px] font-bold",
                  dark
                    ? "bg-gold-500/15 text-gold-300"
                    : "bg-gold-200/50 text-gold-700"
                )}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
