"use client";

/**
 * SA legal ecosystem — premium law iconography & South African trust signals.
 * Courts marquee, regulation board, statutory framework, credential wall,
 * per-practice forums and the national flag accent.
 */

import { Gavel, Landmark, Scale, BookLock, BookOpenCheck, ChevronRight } from "lucide-react";
import {
  COURTS_FORUMS,
  PRACTICE_FORUMS,
  SA_ACTS,
  SA_REGULATION,
  CREDENTIALS,
} from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";

/* ——————————— South African flag (flat, geometric) ——————————— */

export function SAFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      role="img"
      aria-label="Flag of the Republic of South Africa"
    >
      <rect width="30" height="20" fill="#de3831" />
      <rect width="30" height="10" y="10" fill="#002395" />
      <path
        d="M0 0 L14 10 L0 20"
        fill="none"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinejoin="miter"
      />
      <path
        d="M0 0 L14 10 L0 20"
        fill="none"
        stroke="#007a4d"
        strokeWidth="5"
        strokeLinejoin="miter"
      />
      <polygon points="0,2.6 9.4,10 0,17.4" fill="#ffb612" />
      <polygon points="0,4.6 7.2,10 0,15.4" fill="#000000" />
    </svg>
  );
}

/** Flag + jurisdiction chip — used in the footer and legal surfaces. */
export function SAFlagChip({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${
        dark ? "border-white/15 bg-white/5" : "border-navy-200 bg-white"
      }`}
    >
      <SAFlag className="h-3 w-[26px] rounded-[2px] shadow-sm" />
      <span
        className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
          dark ? "text-white/80" : "text-navy-900"
        }`}
      >
        Republic of South Africa
      </span>
    </span>
  );
}

/* ——————————— Courts & forums marquee ——————————— */

function CourtItem({ dark }: { dark: boolean }) {
  return (
    <>
      {(COURTS_FORUMS as readonly { name: string; note: string }[]).map((c) => (
        <span
          key={c.name}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
        >
          <Scale
            className={`h-3.5 w-3.5 shrink-0 ${dark ? "text-gold-400/80" : "text-gold-600"}`}
            strokeWidth={1.75}
          />
          <span
            className={`text-[13px] font-bold ${
              dark ? "text-white/85" : "text-navy-900"
            }`}
          >
            {c.name}
          </span>
          <span
            className={`text-[11px] font-medium ${
              dark ? "text-white/40" : "text-muted-foreground"
            }`}
          >
            {c.note}
          </span>
          <span
            className={`ml-4 h-1 w-1 rounded-full ${
              dark ? "bg-gold-500/50" : "bg-gold-500/60"
            }`}
          />
        </span>
      ))}
    </>
  );
}

/** Infinite marquee of South African courts, tribunals and registries. */
export function CourtsMarquee({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${
        dark ? "border-y border-white/10" : "border-y border-navy-100/80"
      } ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r ${
          dark ? "from-navy-950" : "from-ivory"
        } to-transparent`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l ${
          dark ? "from-navy-950" : "from-ivory"
        } to-transparent`}
      />
      <div className="marquee-pause py-4">
        <div className="animate-marquee flex w-max items-center gap-8 pr-8">
          <CourtItem dark={dark} />
          <CourtItem dark={dark} />
        </div>
      </div>
    </div>
  );
}

/* ——————————— Regulation, admission & standing board ——————————— */

/** Premium grid of South African regulation & admission signals. */
export function RegulationBoard({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {(SA_REGULATION as readonly {
        icon: string;
        label: string;
        sub: string;
        detail: string;
      }[]).map((r, i) => (
        <Reveal key={r.label} delay={i * 0.06} className="h-full">
          <div
            className={`group h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 ${
              dark
                ? "gradient-ring border border-white/10 bg-white/5 backdrop-blur-sm hover:border-gold-500/40 hover:bg-white/10"
                : "gradient-ring border border-navy-100 bg-white shadow-sm hover:shadow-luxe"
            }`}
          >
            <div className="flex items-start justify-between">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                  dark
                    ? "bg-gold-500/15 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950"
                    : "bg-navy-950 text-gold-400"
                }`}
              >
                <Icon name={r.icon} className="h-5.5 w-5.5" />
              </span>
              <span
                className={`font-display text-[28px] font-bold leading-none ${
                  dark
                    ? "text-white/10 transition-colors group-hover:text-gold-600/20"
                    : "text-navy-950/5 transition-colors group-hover:text-gold-600/15"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3
              className={`mt-5 font-display text-[16.5px] font-semibold leading-snug ${
                dark ? "text-white" : "text-navy-900"
              }`}
            >
              {r.label}
            </h3>
            <p
              className={`mt-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
                dark ? "text-gold-300" : "text-gold-600"
              }`}
            >
              {r.sub}
            </p>
            <p
              className={`mt-3 text-[13px] leading-relaxed ${
                dark ? "text-white/60" : "text-muted-foreground"
              }`}
            >
              {r.detail}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ——————————— Statutory framework strip ——————————— */

/** Compact chip wall of the statutes the practice works under. */
export function ActsStrip({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {(SA_ACTS as readonly { short: string; citation: string }[]).map((a) => (
        <span
          key={a.short}
          className={`group inline-flex items-center gap-2.5 rounded-full border px-4 py-2 transition-colors ${
            dark
              ? "border-white/10 bg-white/5 hover:border-gold-500/40"
              : "border-navy-100 bg-white hover:border-gold-500/60"
          }`}
        >
          <BookLock
            className={`h-3.5 w-3.5 shrink-0 ${
              dark ? "text-gold-400" : "text-gold-600"
            }`}
            strokeWidth={1.75}
          />
          <span
            className={`text-[12px] font-bold ${
              dark ? "text-white/85" : "text-navy-900"
            }`}
          >
            {a.short}
          </span>
          <span
            className={`text-[10.5px] ${
              dark ? "text-white/40" : "text-muted-foreground"
            }`}
          >
            {a.citation}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ——————————— Credential wall (admissions & standing) ——————————— */

/** Director-level admissions & professional standing chips. */
export function CredentialWall({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {(CREDENTIALS as readonly {
        icon: string;
        label: string;
        sub: string;
      }[]).map((c, i) => (
        <Reveal key={c.label} delay={i * 0.05}>
          <div
            className={`flex items-center gap-3.5 rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 ${
              dark
                ? "border border-white/10 bg-white/5 hover:border-gold-500/40 hover:bg-white/10"
                : "border border-navy-100 bg-white shadow-sm hover:shadow-luxe"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                dark ? "bg-gold-500/15 text-gold-400" : "bg-gold-500/15 text-gold-600"
              }`}
            >
              <Icon name={c.icon} className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0 leading-tight">
              <p
                className={`truncate text-[13.5px] font-bold ${
                  dark ? "text-white" : "text-navy-900"
                }`}
              >
                {c.label}
              </p>
              <p
                className={`mt-0.5 truncate text-[11.5px] ${
                  dark ? "text-white/50" : "text-muted-foreground"
                }`}
              >
                {c.sub}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ——————————— Per-practice courts, forums & regulators ——————————— */

/** Practice-page card listing the SA forums & regulators for a practice. */
export function PracticeForums({
  slug,
  accent,
  fallbackName,
}: {
  slug: string;
  accent: string;
  fallbackName?: string;
}) {
  const forums =
    PRACTICE_FORUMS[slug] ??
    (fallbackName
      ? [{ name: fallbackName, note: "Practice forum" }]
      : []);
  return (
    <Reveal delay={0.2}>
      <div className="overflow-hidden rounded-3xl border border-navy-100 shadow-luxe">
        <div
          className="flex items-center gap-3 px-7 py-5 text-white"
          style={{ backgroundColor: accent }}
        >
          <Gavel className="h-5 w-5" />
          <h3 className="font-display text-[17px] font-semibold">
            Courts, forums &amp; regulators
          </h3>
        </div>
        <ul className="divide-y divide-navy-100/70 bg-white px-7">
          {forums.map((f) => (
            <li
              key={f.name}
              className="flex items-center justify-between gap-4 py-3.5"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Landmark
                  className="h-4 w-4 shrink-0"
                  style={{ color: accent }}
                  strokeWidth={1.75}
                />
                <span className="min-w-0 text-[13.5px] font-semibold text-navy-900/90">
                  {f.name}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-muted-foreground">
                <BookOpenCheck className="h-3.5 w-3.5 text-gold-600" />
                {f.note}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-navy-100/70 bg-ivory px-7 py-3.5">
          <ChevronRight className="h-3.5 w-3.5 text-gold-600" />
          <p className="text-[11.5px] leading-relaxed text-muted-foreground">
            Appearances and filings across the South African superior courts,
            specialist tribunals and registries.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
