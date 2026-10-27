"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/** Eyebrow + display heading + optional lead — the house section header. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 bg-gold-500" />
        <span
          className={cn(
            "text-[11px] font-bold uppercase tracking-[0.28em]",
            dark ? "text-gold-300" : "text-gold-700"
          )}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={cn(
          "mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] tracking-tight text-balance",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-5 text-base sm:text-lg leading-relaxed",
            dark ? "text-navy-100/85" : "text-muted-foreground"
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
