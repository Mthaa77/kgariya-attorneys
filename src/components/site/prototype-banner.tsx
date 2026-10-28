"use client";

import { ArrowUpRight, MessageCircle, X } from "lucide-react";
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
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-gold-400 shadow-inner" aria-hidden="true">
          <MessageCircle className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-navy-950/60">
            Digital preview
          </p>
          <p className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] sm:text-[11px]">
            Prototype demo by{" "}
            <a
              href="https://wa.me/27724026893"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline decoration-navy-950/30 underline-offset-2 transition-colors hover:text-navy-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950/60"
            >
              Carter Digitals
              <ArrowUpRight className="size-3" aria-hidden="true" />
              <span className="sr-only">on WhatsApp</span>
            </a>
          </p>
        </div>
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
