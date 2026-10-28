"use client";

import { X } from "lucide-react";
import { useState } from "react";

type PrototypeBannerProps = {
  floating?: boolean;
};

export function PrototypeBanner({ floating = true }: PrototypeBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      className={
        floating
          ? "fixed inset-x-4 bottom-4 z-[70] mx-auto flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-gold-300/40 bg-gold-500 px-4 py-3 text-navy-950 shadow-[0_18px_50px_rgba(8,25,48,0.28)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:right-auto sm:w-[min(100%-3rem,31rem)]"
          : "flex w-full items-center justify-between gap-4 rounded-xl border border-gold-300/30 bg-gold-500/10 px-4 py-3 text-gold-200"
      }
      aria-label="Prototype notice"
    >
      <div className="flex items-center gap-3">
        <span className="size-2 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
        <p className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] sm:text-[11px]">
          Prototype demo website by Carter Digitals
        </p>
      </div>
      {floating && (
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-navy-950/20 transition-colors hover:bg-navy-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950/60"
          aria-label="Close prototype notice"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </aside>
  );
}
