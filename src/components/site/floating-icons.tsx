"use client";

/**
 * Floating law icons — ambient floating icon chips spread across the homepage.
 * Small hand-built South African law glyphs (scales, gavel, constitution book,
 * shield, courthouse columns, key, justice seal, signing pen) inside glass
 * navy/gold tiles that drift on a calm float loop. Chips pin to section
 * corners (visible on every breakpoint, including mobile — they live inside
 * the section padding bands so they never cover content) and to the wide
 * desktop gutters on ≥1440px screens. Entrance is a soft spring pop; the
 * float loop is disabled under prefers-reduced-motion via globals.css.
 */

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export type LawGlyphName =
  | "scale"
  | "gavel"
  | "book"
  | "shield"
  | "columns"
  | "key"
  | "seal"
  | "pen";

/** Hand-built 24px law glyphs — same line weight as the site's icon set. */
export function LawGlyph({
  name,
  className,
}: {
  name: LawGlyphName;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("h-[18px] w-[18px]", className),
    "aria-hidden": true,
  };

  switch (name) {
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 3.5v16.5M8.5 20.5h7M4.5 7h15" />
          <path d="M6.5 7 4.1 12.3a2.8 2.8 0 0 0 4.8 0L6.5 7ZM17.5 7l-2.4 5.3a2.8 2.8 0 0 0 4.8 0L17.5 7Z" />
        </svg>
      );
    case "gavel":
      return (
        <svg {...common}>
          <rect
            x="12.4"
            y="2.8"
            width="8.8"
            height="5.4"
            rx="1"
            transform="rotate(45 16.8 5.5)"
          />
          <path d="M13.2 9.3 5 17.5a1.85 1.85 0 0 0 2.6 2.6l8.2-8.2M14.5 21.5h7" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M12 6.1C10 4.8 7.2 4.2 4 4.2v14c3.2 0 6 .6 8 1.9 2-1.3 4.8-1.9 8-1.9v-14c-3.2 0-6 .6-8 1.9Z" />
          <path d="M12 6.1v14" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3.2 19 6v5.1c0 4.4-2.9 7.4-7 8.9-4.1-1.5-7-4.5-7-8.9V6l7-2.8Z" />
          <path d="m9.1 11.7 2 2 3.8-3.9" />
        </svg>
      );
    case "columns":
      return (
        <svg {...common}>
          <path d="M3.5 21h17M3.5 12.5h17M12 3l8.5 6.5h-17L12 3Z" />
          <path d="M7.5 21v-8.5M12 21v-8.5M16.5 21v-8.5" />
        </svg>
      );
    case "key":
      return (
        <svg {...common}>
          <circle cx="7.8" cy="7.8" r="3.6" />
          <path d="M10.4 10.4 20.5 20.5M17.3 17.3l2.3-2.3M13.8 13.8l1.8-1.8" />
        </svg>
      );
    case "seal":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.4" />
          <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="m4.5 19.5 3.2-.7L19.4 7.1a1.9 1.9 0 0 0-2.7-2.7L5 15.9l-.5 3.6Z" />
          <path d="m14.5 6.6 2.7 2.7" />
        </svg>
      );
  }
}

type FloatingChip = {
  g: LawGlyphName;
  /** Absolute position classes inside the host section (relative). */
  className?: string;
  /** Stagger for the entrance pop; also offsets the float loop. */
  delay?: number;
};

/**
 * Renders a cluster of floating law-icon chips inside a `relative` section.
 * variant "dark" → glass navy tile + gold glyph (navy sections);
 * variant "light" → ivory glass tile + gold-navy glyph (white sections).
 */
export function FloatingLawIcons({
  variant = "light",
  items,
  className,
}: {
  variant?: "light" | "dark";
  items: FloatingChip[];
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
    >
      {items.map((chip, i) => (
        <motion.span
          key={`${chip.g}-${i}`}
          initial={
            reduced
              ? { opacity: 0.9 }
              : { opacity: 0, scale: 0.45, y: 18, rotate: -10 }
          }
          whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.85,
            delay: 0.15 + (chip.delay ?? i * 0.15),
            ease: EASE,
          }}
          className={cn("absolute", chip.className)}
        >
          <span
            className={cn(
              "animate-floaty flex h-11 w-11 items-center justify-center rounded-2xl backdrop-blur-md",
              variant === "dark"
                ? "border border-white/12 bg-white/[0.06] text-gold-300 shadow-luxe ring-1 ring-gold-500/25"
                : "border border-navy-100 bg-white/90 text-gold-700 shadow-luxe ring-1 ring-gold-500/30"
            )}
            style={{
              animationDelay: `${i * -1.7}s`,
              animationDuration: `${6.4 + i * 0.8}s`,
            }}
          >
            <LawGlyph name={chip.g} />
          </span>
        </motion.span>
      ))}
    </div>
  );
}
