"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRoute } from "@/lib/router";

const EASE = [0.22, 1, 0.36, 1] as const;
const COVER_DURATION = 0.52;
const COVER_HOLD = 0.76;
const REVEAL_DURATION = 0.72;

export function PageTransition() {
  const route = useRoute();
  const reduceMotion = useReducedMotion();
  const previousRoute = useRef(route);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"cover" | "hold" | "reveal">("cover");

  useEffect(() => {
    if (previousRoute.current === route) return;
    previousRoute.current = route;
    if (reduceMotion) return;

    setPhase("cover");
    setVisible(true);

    const holdTimer = window.setTimeout(() => setPhase("hold"), COVER_DURATION * 1000);
    const revealTimer = window.setTimeout(
      () => setPhase("reveal"),
      (COVER_DURATION + COVER_HOLD) * 1000
    );
    const closeTimer = window.setTimeout(
      () => setVisible(false),
      (COVER_DURATION + COVER_HOLD + REVEAL_DURATION + 0.12) * 1000
    );

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(closeTimer);
    };
  }, [route, reduceMotion]);

  if (reduceMotion) return null;

  const covered = phase !== "reveal";

  return visible ? (
    <motion.div
      key={route}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] isolate overflow-hidden bg-[#07162b]"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: covered ? 1 : 0 }}
      transition={{
        duration: phase === "reveal" ? REVEAL_DURATION : COVER_DURATION,
        ease: EASE,
      }}
      style={{
        transformOrigin: covered ? "left center" : "right center",
        willChange: "transform",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(198,165,92,0.16),transparent_36%),radial-gradient(ellipse_at_15%_85%,rgba(30,67,110,0.42),transparent_45%),linear-gradient(135deg,#07162b_0%,#0b203b_55%,#061225_100%)]" />
      <div className="texture-grid-dark absolute inset-0 opacity-55" />

      <motion.div
        className="absolute -left-40 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full border border-gold-300/10"
        animate={phase === "reveal" ? { opacity: 0, scale: 1.3 } : { opacity: [0.18, 0.34, 0.18], scale: [0.94, 1.04, 0.94] }}
        transition={{ duration: 4.4, repeat: phase === "reveal" ? 0 : Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-36 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full border border-white/[0.06]"
        animate={phase === "reveal" ? { opacity: 0, scale: 1.22 } : { opacity: [0.06, 0.16, 0.06], scale: [1, 1.08, 1] }}
        transition={{ duration: 5.2, repeat: phase === "reveal" ? 0 : Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-y-0 left-0 w-[34vw] min-w-[220px] -skew-x-[18deg] bg-gradient-to-r from-transparent via-gold-200/[0.09] to-transparent"
        initial={{ x: "-150%", opacity: 0 }}
        animate={phase === "reveal" ? { x: "330%", opacity: 0 } : { x: ["-150%", "360%"], opacity: [0, 0.7, 0] }}
        transition={phase === "reveal" ? { duration: 0.2 } : { duration: 2.8, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 top-[22%] h-px origin-left bg-gradient-to-r from-transparent via-gold-300/65 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: phase === "reveal" ? 0 : 1, opacity: phase === "reveal" ? 0 : 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: phase === "reveal" ? 0 : 0.24 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.92, filter: "blur(10px)" }}
        animate={{
          opacity: phase === "reveal" ? 0 : 1,
          y: phase === "reveal" ? -14 : 0,
          scale: phase === "reveal" ? 0.96 : 1,
          filter: phase === "reveal" ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: phase === "reveal" ? 0.32 : 0.62, ease: EASE, delay: phase === "cover" ? 0.14 : 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="relative flex h-[106px] w-[106px] items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-gold-300/45"
            animate={{ rotate: 360, scale: phase === "reveal" ? 1.16 : 1, opacity: phase === "reveal" ? 0 : 1 }}
            transition={{ rotate: { duration: 9, ease: "linear", repeat: Infinity }, scale: { duration: 0.6, ease: EASE }, opacity: { duration: 0.3 } }}
          />
          <motion.span
            className="absolute inset-[8px] rounded-full border border-dashed border-gold-200/25"
            animate={{ rotate: -360, opacity: phase === "reveal" ? 0 : 0.8 }}
            transition={{ rotate: { duration: 14, ease: "linear", repeat: Infinity }, opacity: { duration: 0.25 } }}
          />
          <motion.span
            className="absolute inset-[17px] rounded-full bg-gold-400/10 shadow-[0_0_55px_rgba(198,165,92,0.18)]"
            animate={{ scale: phase === "reveal" ? 1.2 : [0.94, 1.06, 0.94], opacity: phase === "reveal" ? 0 : 1 }}
            transition={{ duration: 2.8, repeat: phase === "reveal" ? 0 : Infinity, ease: "easeInOut" }}
          />
          <Image
            src="/images/kgariya-navbar-emblem.webp"
            alt=""
            width={64}
            height={64}
            priority
            className="relative z-10 h-[62px] w-[62px] object-contain drop-shadow-[0_0_22px_rgba(198,165,92,0.28)]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16, letterSpacing: "0.36em" }}
          animate={{ opacity: phase === "reveal" ? 0 : 1, y: 0, letterSpacing: "0.22em" }}
          transition={{ duration: 0.64, delay: 0.22, ease: EASE }}
          className="mt-7 text-center"
        >
          <p className="font-display text-[19px] font-semibold uppercase text-white sm:text-[21px]">
            Kgariya
          </p>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.42em] text-gold-300">
            Attorneys
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: phase === "reveal" ? 0 : 0.66, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36, ease: EASE }}
          className="mt-7 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/55"
        >
          Evidence over slogans
        </motion.p>

        <div className="mt-6 h-px w-44 overflow-hidden bg-white/10">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-gold-700 via-gold-300 to-white"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "reveal" ? 1 : 0.76 }}
            transition={{ duration: phase === "reveal" ? 0.3 : 1.45, ease: "easeInOut" }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "reveal" ? 0 : 0.42 }}
          transition={{ duration: 0.28 }}
          className="mt-3 text-[8px] font-medium uppercase tracking-[0.28em] text-white/45"
        >
          Preparing your next page
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-transparent via-gold-300 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: phase === "reveal" ? 0 : 1, opacity: phase === "reveal" ? 0 : 0.9 }}
        transition={{ duration: 0.9, ease: EASE, delay: phase === "reveal" ? 0 : 0.2 }}
      />
    </motion.div>
  ) : null;
}
