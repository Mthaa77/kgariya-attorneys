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
/** Official brand lockup supplied by Kgariya Attorneys Incorporated. */
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
  const frameSize = compact
    ? "h-[48px] w-[44px]"
    : size === "lg"
      ? "h-[108px] w-[99px]"
      : "h-[70px] w-[64px]";

  return (
    <span className={cn("inline-flex shrink-0 select-none", className)}>
      <span
        className={cn(
          "relative block shrink-0 overflow-hidden rounded-[14px] border bg-[#e9e5df] transition-transform duration-300 hover:scale-[1.02]",
          dark
            ? "border-[#d7b970]/60 shadow-[0_9px_26px_rgba(0,0,0,0.28)]"
            : "border-[#c6a55c]/45 shadow-[0_7px_22px_rgba(10,27,51,0.16)]",
          frameSize
        )}
      >
        <Image
          src="/images/kgariya-official-logo.webp"
          alt="Kgariya Attorneys Incorporated official logo"
          width={320}
          height={347}
          sizes={compact ? "44px" : size === "lg" ? "99px" : "64px"}
          className="h-full w-full object-contain"
        />
      </span>
    </span>
  );
}
