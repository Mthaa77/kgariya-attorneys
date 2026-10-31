"use client";

/**
 * Carter Digitals preview banner — floating ownership + IP notice.
 * Collapsed: a compact navy/gold capsule (bottom-left) stating that the
 * website belongs to Carter Digitals. Expanded: a premium panel carrying
 * the full ownership + copyright notice under the Copyright Act 98 of 1978
 * (South Africa) — nobody may copy the site's designs or content.
 * Sits below dialogs (z-50+) and the cookie bar (z-70) so it never blocks
 * a consent screen or dialog; on small screens it floats above the cookie
 * bar zone until that is dismissed.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronUp, Scale, X } from "lucide-react";
import { SAFlag } from "@/components/site/sa-legal";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Hand-built "CD" monogram in a gold-rimmed diamond — the Carter Digitals mark. */
function CdMonogram({ size = 30 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="cd-monogram-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0e3c0" />
          <stop offset="52%" stopColor="#c6a55c" />
          <stop offset="100%" stopColor="#9a7a35" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        rx="5"
        transform="rotate(45 20 20)"
        fill="rgba(198,165,92,0.08)"
        stroke="url(#cd-monogram-gold)"
        strokeWidth="1.5"
      />
      <rect
        x="11.5"
        y="11.5"
        width="17"
        height="17"
        rx="3"
        transform="rotate(45 20 20)"
        stroke="url(#cd-monogram-gold)"
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <text
        x="20"
        y="24.6"
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="12.5"
        fontWeight="700"
        fill="url(#cd-monogram-gold)"
      >
        CD
      </text>
    </svg>
  );
}

export function PreviewBanner() {
  const [open, setOpen] = useState(false);

  /* Collapse the expanded notice on scroll — the panel must never sit over
     content while the visitor browses (same courtesy as the nav tray). */
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [open]);

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-[47] sm:bottom-6 sm:left-5">
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          /* ——— Collapsed capsule ——— */
          <motion.button
            key="pill"
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            aria-label="Carter Digitals — website owner and copyright notice"
            initial={{ opacity: 0, y: 26, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="pointer-events-auto group flex items-center gap-3 rounded-full border border-white/10 bg-navy-950/[0.97] py-2 pl-2.5 pr-4 shadow-luxe-lg ring-1 ring-gold-500/30 backdrop-blur-xl transition-colors hover:ring-gold-500/60"
          >
            <CdMonogram />
            <span className="h-5 w-px bg-white/15" />
            <span className="flex flex-col items-start leading-none">
              <span className="text-[9.5px] font-bold uppercase tracking-[0.24em] text-gold-300">
                Carter Digitals
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">
                <span className="animate-live-pulse h-1.5 w-1.5 rounded-full bg-gold-400" />
                Website owner · Protected
              </span>
            </span>
            <ChevronUp className="h-3.5 w-3.5 text-gold-400/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-gold-300" />
          </motion.button>
        ) : (
          /* ——— Expanded notice panel ——— */
          <motion.div
            key="panel"
            role="complementary"
            aria-label="Ownership and copyright notice — Carter Digitals"
            initial={{ opacity: 0, y: 26, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="pointer-events-auto relative w-[min(92vw,370px)] overflow-hidden rounded-[1.6rem] border border-white/10 bg-navy-950/[0.97] shadow-luxe-lg ring-1 ring-gold-500/30 backdrop-blur-xl"
          >
            {/* ambient gold glow + top hairline sweep */}
            <div className="animate-aurora pointer-events-none absolute -right-16 -top-20 h-44 w-52 rounded-full bg-gold-500/15 blur-[70px]" />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-gold-400 to-transparent"
            />

            <div className="relative p-6">
              {/* header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CdMonogram size={38} />
                  <div className="leading-tight">
                    <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold-300">
                      Carter Digitals
                    </p>
                    <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      Website owner · Design &amp; content
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Collapse the Carter Digitals banner"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-gold-500/50 hover:text-gold-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-5 h-px bg-gradient-to-r from-gold-500/50 via-white/10 to-transparent" />

              {/* IP notice */}
              <div className="mt-5 flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 ring-1 ring-gold-500/30">
                  <Scale className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-white">
                    © {new Date().getFullYear()} Carter Digitals — Website owner
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/55">
                    This website belongs to Carter Digitals. Its design, copy,
                    imagery, crest, graphics and source code are the property of
                    Carter Digitals and are protected under the{" "}
                    <span className="font-semibold text-gold-200">
                      Copyright Act 98 of 1978
                    </span>{" "}
                    of the Republic of South Africa.
                  </p>
                </div>
              </div>

              <p className="mt-4 rounded-2xl border border-gold-500/20 bg-gold-500/[0.07] px-4 py-3 text-[11.5px] leading-relaxed text-gold-200/90">
                <span className="font-bold text-gold-200">Copying is forbidden.</span>{" "}
                Nobody may copy, reproduce, adapt or redistribute any part of
                this site&apos;s designs or content — in whole or in part —
                without the prior written consent of Carter Digitals.
                Infringement may give rise to civil claims and criminal
                liability under South African law.
              </p>

              {/* footer row */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <Link
                  href="#/legal"
                  className="group/link inline-flex items-center gap-1.5 text-[11.5px] font-bold text-gold-300 transition-colors hover:text-gold-200"
                >
                  Terms &amp; IP notice
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
                <span className="flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  <SAFlag className="h-2 w-[17px] rounded-[1.5px]" />
                  Made in South Africa
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
