"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/** Gold-gradient shield crest with K monogram — echoes the firm's brand mark. */
export function Crest({ className, dark = false }: { className?: string; dark?: boolean }) {
  const uid = dark ? "gd" : "gl";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e5d09b" />
          <stop offset="0.5" stopColor="#c6a55c" />
          <stop offset="1" stopColor={dark ? "#a9863d" : "#86682c"} />
        </linearGradient>
      </defs>
      <path
        d="M32 2.5 L56.5 11 V30 C56.5 45.5 46 56.5 32 62.5 C18 56.5 7.5 45.5 7.5 30 V11 Z"
        fill="#0a1b33"
        stroke={`url(#${uid})`}
        strokeWidth="2.6"
      />
      <path
        d="M32 8.5 L51 15.5 V30 C51 41.8 42.8 50.6 32 55.8 C21.2 50.6 13 41.8 13 30 V15.5 Z"
        fill="none"
        stroke={`url(#${uid})`}
        strokeWidth="1"
        opacity="0.55"
      />
      {/* Bold K monogram */}
      <path
        d="M26.5 20.5 V43.5"
        stroke={`url(#${uid})`}
        strokeWidth="4.6"
        strokeLinecap="square"
      />
      <path
        d="M38.5 20.5 L29 32.2 L39.5 43.5"
        stroke={`url(#${uid})`}
        strokeWidth="4.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      <rect x="23" y="48.5" width="18" height="1.6" fill={`url(#${uid})`} opacity="0.9" />
      <rect
        x="30.6"
        y="46.6"
        width="2.9"
        height="2.9"
        transform="rotate(45 32 48)"
        fill={`url(#${uid})`}
      />
    </svg>
  );
}

/** Full horizontal lockup: crest + wordmark. */
/** Official brand lockup supplied by Kgariya Attorneys. */
/** Official Kgariya Attorneys lockup: emblem plus legible firm name. */
export function Logo({
  dark = false,
  className,
  compact = false,
  size = "md",
}: {
  dark?: boolean;
  className?: string;
  compact?: boolean;
  size?: "md" | "lg";
}) {
  const markSize = compact
    ? "h-9 w-10"
    : size === "lg"
      ? "h-[72px] w-[78px]"
      : "h-[44px] w-[48px]";
  const nameSize = compact
    ? "text-[14px] sm:text-[15px]"
    : size === "lg"
      ? "text-[24px]"
      : "text-[17px] sm:text-[18px]";
  const subtitleSize = compact
    ? "text-[6.5px] sm:text-[7px] tracking-[0.1em]"
    : size === "lg"
      ? "text-[10px] tracking-[0.17em]"
      : "text-[7.5px] sm:text-[8px] tracking-[0.14em]";

  return (
    <span className={cn("inline-flex min-w-0 shrink-0 items-center gap-2.5 select-none sm:gap-3", className)}>
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#d6bd7c]/55 bg-[#f7f5f0] shadow-[0_5px_15px_rgba(0,0,0,0.22)]",
          markSize
        )}
      >
        <Image
          src="/images/kgariya-mark.webp"
          alt=""
          aria-hidden="true"
          width={384}
          height={358}
          sizes={compact ? "40px" : size === "lg" ? "78px" : "48px"}
          unoptimized
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex min-w-0 flex-col items-start justify-center gap-1 leading-none">
        <span
          className={cn(
            "font-display font-bold uppercase leading-none tracking-[0.12em]",
            nameSize,
            dark ? "text-white" : "text-navy-950"
          )}
        >
          KGARIYA
        </span>
        <span
          className={cn(
            "whitespace-nowrap font-sans font-bold uppercase leading-none",
            subtitleSize,
            dark ? "text-gold-300" : "text-gold-700"
          )}
        >
          ATTORNEYS
        </span>
      </span>
    </span>
  );
}
