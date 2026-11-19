"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRoute } from "@/lib/router";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageTransition() {
  const route = useRoute();
  const reduceMotion = useReducedMotion();
  const previousRoute = useRef(route);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"cover" | "reveal">("cover");

  useEffect(() => {
    if (previousRoute.current === route) return;
    previousRoute.current = route;
    if (reduceMotion) return;

    setPhase("cover");
    setVisible(true);

    const revealTimer = window.setTimeout(() => setPhase("reveal"), 360);
    const closeTimer = window.setTimeout(() => setVisible(false), 820);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(closeTimer);
    };
  }, [route, reduceMotion]);

  if (reduceMotion) return null;

  return visible ? (
    <motion.div
      key={route}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden bg-navy-950"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: phase === "cover" ? 1 : 0 }}
      transition={{
        duration: phase === "cover" ? 0.36 : 0.44,
        ease: EASE,
      }}
      style={{
        transformOrigin: phase === "cover" ? "left center" : "right center",
        willChange: "transform",
      }}
    >
      <div className="texture-grid-dark absolute inset-0 opacity-55" />
      <div className="absolute -left-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-gold-500/10 blur-[110px]" />
      <div className="absolute -right-20 bottom-[-12rem] h-[30rem] w-[30rem] rounded-full bg-white/[0.045] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: phase === "cover" ? 1 : 0, y: phase === "cover" ? 0 : -8 }}
        transition={{ duration: 0.26, ease: EASE, delay: phase === "cover" ? 0.12 : 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 shadow-luxe backdrop-blur-xl">
          <Image
            src="/images/kgariya-navbar-emblem.webp"
            alt=""
            width={42}
            height={42}
            priority
            className="h-[42px] w-[42px] object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[14px] font-bold uppercase tracking-[0.19em] text-white">
              Kgariya
            </span>
            <span className="mt-1.5 text-[8px] font-extrabold uppercase tracking-[0.34em] text-gold-300">
              Attorneys
            </span>
          </span>
        </div>
        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.32em] text-white/45">
          Opening your page
        </p>
        <div className="mt-4 h-px w-32 overflow-hidden bg-white/10">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-transparent via-gold-300 to-gold-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "cover" ? 1 : 0 }}
            transition={{ duration: 0.72, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  ) : null;
}
