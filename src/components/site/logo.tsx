"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const wordmark = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kgariya_logo_a3ddc0c8_2K-J5qR3a8OajUozBHztcbfcNVZ6UPx94.jpg";

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
export function Logo({
  className,
  compact = false,
}: {
  dark?: boolean;
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex select-none items-center", className)}>
      <span className={cn("relative block overflow-hidden rounded-lg bg-[#f7f6f2] shadow-[0_2px_10px_rgba(0,0,0,0.12)] ring-1 ring-white/20 transition duration-500 ease-out group-hover:shadow-[0_6px_20px_rgba(198,165,92,0.2)]", compact ? "h-10 w-[130px]" : "h-12 w-[158px]")}>
        <Image
          src={wordmark}
          alt="Kgariya Attorneys"
          fill
          sizes="(max-width: 640px) 130px, 158px"
          className="scale-[1.2] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.24]"
          priority
        />
      </span>
    </span>
  );
}
