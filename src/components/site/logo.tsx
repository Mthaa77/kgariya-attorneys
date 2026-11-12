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

/** Brand mark: the full supplied logo everywhere, with a dedicated horizontal crop for the navbar. */
export function Logo({
  dark = false,
  className,
  size = "md",
  navbar = false,
}: {
  dark?: boolean;
  className?: string;
  size?: "md" | "lg";
  navbar?: boolean;
}) {
  const frameSize = navbar
    ? "h-[40px] w-[99px] sm:h-[46px] sm:w-[114px]"
    : size === "lg"
      ? "h-[190px] w-[190px] sm:h-[220px] sm:w-[220px]"
      : "h-[148px] w-[148px] sm:h-[170px] sm:w-[170px]";

  return (
    <span
      data-logo-surface={dark ? "dark" : "light"}
      className={cn(
        "inline-flex min-w-0 shrink-0 items-center justify-center overflow-hidden",
        navbar
          ? "rounded-md"
          : "rounded-2xl border border-black/[0.04] bg-[#f5f4ef] shadow-[0_8px_28px_rgba(7,18,33,0.10)]",
        frameSize,
        className
      )}
    >
      <Image
        src={navbar ? "/images/kgariya-navbar-logo.webp" : "/images/kgariya-full-logo.webp"}
        alt="Kgariya Attorneys"
        width={navbar ? 400 : 400}
        height={navbar ? 162 : 400}
        sizes={
          navbar
            ? "(max-width: 640px) 99px, 114px"
            : size === "lg"
              ? "(max-width: 640px) 190px, 220px"
              : "(max-width: 640px) 148px, 170px"
        }
        unoptimized
        className="h-full w-full object-contain"
      />
    </span>
  );
}
