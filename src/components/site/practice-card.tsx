"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navigate } from "@/lib/router";
import type { PracticeArea } from "@/lib/site-data";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

/** Numbered, colour-coded practice area card. */
export const PracticeCard = memo(function PracticeCard({
  area,
  index,
  variant = "full",
}: {
  area: PracticeArea;
  index?: number;
  variant?: "full" | "mini";
}) {
  if (variant === "mini") {
    return (
      <button
        onClick={() => navigate(`#/practice/${area.slug}`)}
        className="group flex w-full items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:shadow-luxe"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
          style={{ backgroundColor: area.accent }}
        >
          <Icon name={area.icon} className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-[10px] font-bold text-gold-600">{area.number}</span>
            <span className="min-w-0 truncate text-[14px] font-bold text-navy-900">
              {area.shortName}
            </span>
          </span>
          <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">
            {area.tagline}
          </span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={() => navigate(`#/practice/${area.slug}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index ?? 0) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block h-full overflow-hidden rounded-3xl text-left shadow-luxe transition-all duration-500 hover:-translate-y-2 hover:shadow-luxe-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden sm:h-64">
        <Image
          src={area.image}
          alt={area.name}
          fill
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-90"
          style={{
            background: `linear-gradient(160deg, ${area.accent}e6 0%, ${area.accent}b3 45%, transparent 100%)`,
          }}
        />
        <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white backdrop-blur-md">
          {area.number}
        </span>
        <span className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950">
          <Icon name={area.icon} className="h-5.5 w-5.5" />
        </span>
      </div>

      {/* Body */}
      <div className="bg-white p-6">
        <h3 className="font-display text-[19px] font-semibold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
          {area.name}
        </h3>
        <p className="mt-2 text-[13px] italic text-gold-700">{area.tagline}</p>
        <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
          {area.intro}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-navy-900">
          Explore the practice
          <ArrowUpRight className="h-4 w-4 text-gold-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* Gold bottom rail */}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300 transition-all duration-500 group-hover:w-full"
        )}
      />
    </motion.button>
  );
});
