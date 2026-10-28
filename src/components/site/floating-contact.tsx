"use client";

import { Mail, MessageCircle } from "lucide-react";
import { FIRM } from "@/lib/site-data";

export function FloatingContact() {
  return (
    <aside className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7" aria-label="Quick contact options">
      <a
        href="https://wa.me/27127860920?text=Hello%20Kgariya%20Attorneys%2C%20I%27d%20like%20to%20make%20an%20enquiry."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Kgariya Attorneys on WhatsApp"
        className="group flex items-center gap-3 rounded-full border border-white/20 bg-[#173d32] p-2 text-white shadow-[0_14px_34px_-10px_rgba(7,55,42,0.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1d5a47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="hidden pl-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 sm:block">WhatsApp</span>
        <span className="flex size-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105">
          <MessageCircle className="size-5" strokeWidth={1.8} />
        </span>
      </a>
      <a
        href={`mailto:${FIRM.email}`}
        aria-label={`Email Kgariya Attorneys at ${FIRM.email}`}
        className="group flex items-center gap-3 rounded-full border border-gold-300/60 bg-navy-950 p-2 text-white shadow-luxe-lg transition-all duration-300 hover:-translate-y-1 hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="hidden pl-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-200 sm:block">Email us</span>
        <span className="flex size-11 items-center justify-center rounded-full bg-gold-500 text-navy-950 ring-1 ring-gold-200/60 transition-transform duration-300 group-hover:scale-105">
          <Mail className="size-5" strokeWidth={1.8} />
        </span>
      </a>
    </aside>
  );
}
