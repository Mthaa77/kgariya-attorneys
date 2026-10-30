"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Diamond, Pause, Play } from "lucide-react";
import { TICKER_ITEMS, type TickerItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useSite } from "@/lib/store";

function TickerCell({ item }: { item: TickerItem }) {
  const Up = item.direction === "up";
  return (
    <button
      onClick={() => useSite.getState().openDialog("questions")}
      className="group flex shrink-0 items-center gap-3 rounded-full px-4 py-1.5 transition-colors duration-300 hover:bg-white/5"
      title="Discuss a similar mandate"
    >
      <span className="rounded-sm border border-gold-500/30 bg-gold-500/10 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-gold-300">
        {item.kind}
      </span>
      <span className="whitespace-nowrap text-[12.5px] font-semibold text-white/85 transition-colors group-hover:text-white">
        {item.title}
      </span>
      <span
        className={cn(
          "flex items-center gap-1 whitespace-nowrap text-[11.5px] font-bold",
          Up ? "text-gold-300" : "text-white/55"
        )}
      >
        {Up ? (
          <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5 text-white/40" />
        )}
        {item.value}
      </span>
      <Diamond className="h-2 w-2 fill-gold-500/60 text-gold-500/60" aria-hidden />
    </button>
  );
}

/**
 * Premium "Deal Desk" live ticker — a Bloomberg-style strip of
 * anonymised matter activity rendered as a seamless marquee.
 */
export function LiveTicker() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Latest matter activity"
      className="relative z-20 border-y border-gold-500/25 bg-navy-950 text-white shadow-[0_18px_40px_-24px_rgba(6,15,31,0.9)]"
    >
      {/* hairline gold glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="mx-auto flex h-[52px] max-w-[1600px] items-stretch">
        {/* Fixed LIVE label */}
        <div className="relative z-10 flex shrink-0 items-center gap-3 border-r border-white/10 bg-navy-950 px-4 sm:px-6">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-live-pulse" aria-hidden />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-white">
            Deal desk
          </span>
          <span className="hidden text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-400 md:inline">
            Live
          </span>
        </div>

        {/* Marquee */}
        <div className="marquee-pause relative flex-1 overflow-hidden">
          {/* edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-navy-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-navy-950 to-transparent" />
          <div
            className={cn(
              "flex h-full w-max items-center animate-marquee",
              paused && "[animation-play-state:paused]"
            )}
          >
            {[0, 1].map((dup) => (
              <div key={dup} aria-hidden={dup === 1} className="flex h-full items-center">
                {TICKER_ITEMS.map((item, i) => (
                  <TickerCell key={`${dup}-${i}`} item={item} />
                ))}
                <span className="shrink-0 px-6 text-[10.5px] italic text-white/35">
                  Anonymised matter activity — published in line with LPC marketing rules.
                  <Diamond className="ml-6 inline h-2 w-2 fill-gold-500/40 text-gold-500/40" aria-hidden />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pause control */}
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume ticker" : "Pause ticker"}
          className="z-10 flex w-12 shrink-0 items-center justify-center border-l border-white/10 text-white/60 transition-colors hover:text-gold-300"
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      </div>
    </section>
  );
}
