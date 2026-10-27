"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ————————————————————————————————————————————————
   Magnetic — cursor-following micro offset wrapper.
   Wrap any button/link to give it a premium magnetic pull.
———————————————————————————————————————————————— */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ————————————————————————————————————————————————
   TiltCard — subtle 3D perspective tilt with glare.
———————————————————————————————————————————————— */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 65%)`;

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * max * 2);
          rx.set(-(py - 0.5) * max * 2);
          gx.set(px * 100);
          gy.set(py * 100);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
          gx.set(50);
          gy.set(50);
        }}
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 hover:opacity-100"
        />
      </motion.div>
    </div>
  );
}

/* ————————————————————————————————————————————————
   SpotlightCard — navy/gold spotlight that tracks the cursor.
   Pass `dark` for dark sections.
———————————————————————————————————————————————— */
export function SpotlightCard({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const bg = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, ${
    dark ? "rgba(198,165,92,0.14)" : "rgba(198,165,92,0.16)"
  }, transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      className={cn("group group/spot relative", className)}
    >
      <motion.div
        aria-hidden
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* ————————————————————————————————————————————————
   Parallax — scroll-linked vertical drift + optional
   opacity/scale fade driven by the element's viewport position.
———————————————————————————————————————————————— */
export function Parallax({
  children,
  className,
  distance = 60,
  fade = false,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const smoothY = useSpring(y, { stiffness: 90, damping: 24, mass: 0.5 });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [fade ? 0.4 : 1, 1, 1, fade ? 0.4 : 1]);

  return (
    <motion.div ref={ref} style={{ y: smoothY, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/* ————————————————————————————————————————————————
   ScrollProgress — hairline gold bar pinned to the very top
   of the viewport, driven by page scroll.
———————————————————————————————————————————————— */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn(
        "fixed left-0 top-0 z-[70] h-[2.5px] w-full origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300",
        className
      )}
    />
  );
}

/* ————————————————————————————————————————————————
   BackToTop — floating gold orb, appears after deep scroll.
———————————————————————————————————————————————— */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 700));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-7 right-7 z-[65] flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-gold-300 shadow-luxe-lg ring-1 ring-gold-500/40 transition-all duration-300 hover:-translate-y-1 hover:bg-gold-500 hover:text-navy-950"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ————————————————————————————————————————————————
   WordReveal — per-word masked rise for display headlines.
———————————————————————————————————————————————— */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  accentFrom,
  accentClassName = "gold-text italic",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** index of the first word to render in the accent style */
  accentFrom?: number;
  accentClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className={cn("inline-block will-change-transform", accentFrom !== undefined && i >= accentFrom && accentClassName)}
            initial={{ y: "112%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.75, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ————————————————————————————————————————————————
   ImageReveal — cinematic image entrance (clip-path wipe).
———————————————————————————————————————————————— */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(12% 8% 12% 8% round 32px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <Image src={src} alt={alt} fill className={cn("object-cover", imgClassName)} sizes="50vw" />
    </motion.div>
  );
}
