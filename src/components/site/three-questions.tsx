"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Compass, RotateCcw, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/store";
import { navigate } from "@/lib/router";
import { getPractice } from "@/lib/site-data";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

const Q1 = [
  { id: "dispute", label: "A commercial dispute or claim", hint: "Court, arbitration, enforcement" },
  { id: "development", label: "A development project or land use", hint: "Townships, rezoning, SHRA, capital close" },
  { id: "mining", label: "A mining-adjacent matter", hint: "Surface rights, SLPs, mineral rights" },
  { id: "agri", label: "Farm or agricultural finance", hint: "Land Bank, farm bonds, movables" },
  { id: "finance", label: "Banking, finance or security", hint: "Facilities, workouts, restructuring" },
  { id: "property", label: "A transfer, bond or sectional title", hint: "Conveyancing and registration" },
] as const;

const Q1_MAP: Record<string, string> = {
  dispute: "commercial-litigation",
  development: "real-estate-development",
  mining: "mining-resources",
  agri: "agricultural-finance",
  finance: "banking-finance",
  property: "conveyancing-property",
};

const Q2 = [
  "A company or business",
  "A bank or lender",
  "A developer or landowner",
  "Public sector / SOE",
  "A private individual",
  "A retiring practitioner",
] as const;

const Q3 = [
  { id: "urgent", label: "Urgent — days matter", hint: "Deadlines, interdicts, notices" },
  { id: "weeks", label: "Within weeks", hint: "Active transaction or dispute" },
  { id: "planning", label: "Planning ahead", hint: "Structuring, advisory, panels" },
] as const;

export function ThreeQuestions() {
  const { dialog, closeDialog } = useSite();
  const open = dialog === "questions";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="overflow-hidden rounded-3xl border-navy-100 p-0 sm:max-w-lg">
        {/* Mounts fresh on every open — flow state resets naturally */}
        {open && <FlowInner />}
      </DialogContent>
    </Dialog>
  );
}

function FlowInner() {
  const { closeDialog } = useSite();
  const [step, setStep] = useState(0);
  const [a1, setA1] = useState<string | null>(null);
  const [a2, setA2] = useState<string | null>(null);
  const [a3, setA3] = useState<string | null>(null);

  const practiceSlug = a1 ? Q1_MAP[a1] : null;
  const practice = practiceSlug ? getPractice(practiceSlug) : null;

  const urgencyLine =
    a3 === "urgent"
      ? "Given the urgency, we recommend calling us directly today — urgent applications and interdicts run on short timelines."
      : a3 === "weeks"
        ? "We will schedule a scoping consultation quickly so strategy is set before positions harden."
        : "A structured consultation will map the options and costs before any commitments are made.";

  return (
    <>
      <DialogHeader className="rounded-t-3xl bg-navy-950 px-7 pb-6 pt-7 text-left">
          <DialogTitle className="flex items-center gap-3 font-display text-xl font-semibold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/15">
              <Compass className="h-4.5 w-4.5 text-gold-400" />
            </span>
            Three questions to the right practice
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-[13px] text-white/65">
            A 30-second routing flow. Your answers stay on this device until you
            choose to send an enquiry.
          </DialogDescription>
        </DialogHeader>

        <div className="relative px-7 py-7">
          {/* progress */}
          <div className="absolute left-7 right-7 top-0 h-1 overflow-hidden rounded-full bg-navy-50">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300"
              animate={{ width: `${((step + 1) / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                  Question 1 of 3
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">
                  What is it about?
                </h3>
                <div className="mt-5 space-y-2">
                  {Q1.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => {
                        setA1(o.id);
                        setStep(1);
                      }}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-2xl border px-4.5 py-3.5 text-left transition-all",
                        a1 === o.id
                          ? "border-gold-500 bg-gold-200/40"
                          : "border-navy-100 hover:border-gold-400/60 hover:bg-ivory"
                      )}
                    >
                      <span>
                        <span className="block text-[14px] font-semibold text-navy-900">
                          {o.label}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-muted-foreground">
                          {o.hint}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                  Question 2 of 3
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">
                  Who are you?
                </h3>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {Q2.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setA2(o);
                        setStep(2);
                      }}
                      className={cn(
                        "rounded-2xl border px-4 py-3.5 text-left text-[13.5px] font-semibold transition-all",
                        a2 === o
                          ? "border-gold-500 bg-gold-200/40 text-navy-950"
                          : "border-navy-100 text-navy-900 hover:border-gold-400/60 hover:bg-ivory"
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="q3"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                  Question 3 of 3
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">
                  What is the timeline?
                </h3>
                <div className="mt-5 space-y-2">
                  {Q3.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => {
                        setA3(o.id);
                        setStep(3);
                      }}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-2xl border px-4.5 py-3.5 text-left transition-all",
                        a3 === o.id
                          ? "border-gold-500 bg-gold-200/40"
                          : "border-navy-100 hover:border-gold-400/60 hover:bg-ivory"
                      )}
                    >
                      <span>
                        <span className="block text-[14px] font-semibold text-navy-900">
                          {o.label}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-muted-foreground">
                          {o.hint}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && practice && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your recommended practice
                </p>
                <div
                  className="mt-4 flex items-center gap-4 rounded-2xl p-4 text-white shadow-luxe"
                  style={{ backgroundColor: practice.accent }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Icon name={practice.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {practice.number} · Recommended
                    </p>
                    <p className="font-display text-lg font-semibold">{practice.name}</p>
                  </div>
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                  {urgencyLine}
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <Button
                    className="h-11 rounded-xl bg-gold-500 font-bold text-navy-950 shadow-gold hover:bg-gold-400"
                    onClick={() => {
                      closeDialog();
                      navigate("#/contact");
                    }}
                  >
                    Send an enquiry
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 rounded-xl border-navy-200 font-bold text-navy-900"
                    onClick={() => {
                      closeDialog();
                      navigate(`#/practice/${practice.slug}`);
                    }}
                  >
                    View the practice
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* footer controls */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:text-navy-900 disabled:opacity-40"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <button
              onClick={() => {
                setStep(0);
                setA1(null);
                setA2(null);
                setA3(null);
              }}
              className="flex items-center gap-1.5 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:text-navy-900"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Start over
            </button>
          </div>
        </div>
    </>
  );
}
