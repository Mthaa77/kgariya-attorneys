"use client";

/**
 * FloatingContact — the floating WhatsApp, email and phone quick-contact icons.
 * A bottom-right dock (mirroring the Carter Digitals banner on the left)
 * with three circular buttons: a WhatsApp orb, navy email orb and gold call orb
 * that carries a soft live pulse so visitors spot the tap-to-call action.
 * Hovering or keyboard-focusing a button slides out a premium label chip
 * with the firm's number / address. Buttons drift on a calm float loop
 * (a softer sibling of the law-icon floaty, disabled under
 * prefers-reduced-motion) and sit below dialogs (z-50+) and the cookie
 * bar (z-70), clear of the back-to-top orb and page content.
 *
 * Layering: motion.span owns the entrance spring → an inner span owns the
 * idle float CSS loop → the anchor owns hover/press scale, so the three
 * transforms never fight over the same element.
 */

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { FIRM } from "@/lib/site-data";

const WHATSAPP_NUMBER = "+27 76 619 5179";
const WHATSAPP_URL = "https://wa.me/27766195179?text=Hello%20Kgariya%20Attorneys%2C%20I%20would%20like%20to%20make%20an%20enquiry.";

/** Slide-out label chip shown on hover / keyboard focus. */
function DockLabel({ title, sub }: { title: string; sub: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 rounded-2xl border border-white/10 bg-navy-950/[0.97] py-2 pl-3.5 pr-4 text-left opacity-0 shadow-luxe-lg ring-1 ring-gold-500/30 backdrop-blur-xl transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
    >
      <span className="block whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
        {title}
      </span>
      <span className="mt-0.5 block whitespace-nowrap text-[10.5px] font-semibold tracking-wide text-white/55">
        {sub}
      </span>
    </span>
  );
}

export function FloatingContact() {
  const reduced = useReducedMotion();

  const entrance = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, scale: 0.5, x: 26 },
          animate: { opacity: 1, scale: 1, x: 0 },
          transition: {
            type: "spring" as const,
            stiffness: 210,
            damping: 19,
            delay,
          },
        };

  return (
    <div
      role="group"
      aria-label="Quick contact — WhatsApp, call or email the firm"
      className="fixed bottom-24 right-4 z-[46] flex flex-col items-end gap-3 sm:bottom-[5.75rem] sm:right-7"
    >
      {/* ——— WhatsApp orb (primary quick contact) ——— */}
      <motion.span {...entrance(0.6)}>
        <span className="animate-floaty-soft block" style={{ animationDelay: "-1.8s" }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={"Chat with Kgariya Attorneys on WhatsApp at " + WHATSAPP_NUMBER}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.28)] ring-1 ring-[#25D366]/60 transition-all duration-300 hover:scale-105 hover:bg-[#1fbd5b] hover:shadow-[0_12px_34px_rgba(37,211,102,0.38)] focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <DockLabel title="Chat on WhatsApp" sub={WHATSAPP_NUMBER} />
            <MessageCircle className="h-[19px] w-[19px]" strokeWidth={2.1} />
          </a>
        </span>
      </motion.span>

      {/* ——— Email orb ——— */}
      <motion.span {...entrance(0.9)}>
        <span className="animate-floaty-soft block">
          <a
            href={`mailto:${FIRM.email}?subject=Enquiry%20via%20kgariyainc.co.za`}
            aria-label={`Email the firm at ${FIRM.email}`}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-navy-950/[0.96] text-gold-300 shadow-luxe ring-1 ring-gold-500/30 backdrop-blur-xl transition-colors duration-300 hover:bg-navy-900 hover:ring-gold-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <DockLabel title="Email the firm" sub={FIRM.email} />
            <Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </a>
        </span>
      </motion.span>

      {/* ——— Call orb (primary) ——— */}
      <motion.span {...entrance(0.75)}>
        <span className="animate-floaty-soft block" style={{ animationDelay: "-3.6s" }}>
          <a
            href={FIRM.phoneHref}
            aria-label={`Call the firm at ${FIRM.phone}`}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-navy-950 shadow-luxe-lg ring-1 ring-gold-500/60 transition-transform duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {/* soft live pulse halo */}
            <span
              aria-hidden
              className="animate-gold-pulse absolute inset-0 rounded-full"
            />
            <DockLabel title="Call the firm" sub={FIRM.phone} />
            <Phone className="relative h-[18px] w-[18px]" strokeWidth={1.9} />
          </a>
        </span>
      </motion.span>
    </div>
  );
}
