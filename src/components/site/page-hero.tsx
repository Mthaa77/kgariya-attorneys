"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { navigate } from "@/lib/router";

/** Inner-page hero with image, breadcrumb and headline. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  breadcrumb,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  breadcrumb: { label: string; route?: string }[];
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/60 to-navy-950" />
        <div className="texture-grid-dark absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pb-24 sm:pt-40">
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-1.5 text-[12px] text-white/55"
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3 text-gold-500/60" />}
              {b.route ? (
                <button
                  onClick={() => navigate(b.route!)}
                  className="transition-colors hover:text-gold-300"
                >
                  {b.label}
                </button>
              ) : (
                <span className="font-semibold text-gold-300">{b.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300"
        >
          <span className="h-px w-8 bg-gold-500" />
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem] ${
            align === "center" ? "mx-auto text-center" : ""
          }`}
        >
          {title}
        </motion.h1>

        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg ${
              align === "center" ? "mx-auto text-center" : ""
            }`}
          >
            {lead}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
