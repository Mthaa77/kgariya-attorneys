"use client";

import { ShieldCheck, Scale, FileCheck, Award, Landmark } from "lucide-react";
import { BADGES } from "@/lib/site-data";

const ICONS = [Landmark, Award, ShieldCheck, FileCheck, Scale];

/** Compliance trust strip — LPC, B-BBEE, POPIA, PAIA, trust audit. */
export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div className="border-y border-navy-100/70 bg-ivory">
      <div
        className={`mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-6 sm:grid-cols-3 lg:grid-cols-5 ${
          compact ? "py-5" : "py-7"
        }`}
      >
        {BADGES.map((b, i) => {
          const I = ICONS[i % ICONS.length];
          return (
            <div key={b.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-white shadow-sm">
                <I className="h-4.5 w-4.5 text-gold-600" strokeWidth={1.75} />
              </span>
              <div className="leading-tight">
                <p className="text-[12.5px] font-bold text-navy-900">{b.label}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{b.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
