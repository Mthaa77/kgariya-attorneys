"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Monitor,
  Phone,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useSite } from "@/lib/store";
import { PRACTICE_AREAS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { ConflictNotice } from "./conflict-notice";

const MODES = [
  { id: "video", label: "Video conference", icon: Monitor },
  { id: "phone", label: "Telephone", icon: Phone },
  { id: "in-person", label: "In person — Pretoria", icon: Users },
] as const;

const SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30"];

function buildCalendar(view: Date) {
  const year = view.getFullYear();
  const month = view.getMonth();
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7; // Monday-first
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

function fmt(d: Date) {
  return d.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BookingDialog() {
  const { dialog, prefill, closeDialog } = useSite();
  const open = dialog === "booking";

  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);
  const [mode, setMode] = useState<string>("video");
  const [slot, setSlot] = useState<string>("");
  const [practice, setPractice] = useState(prefill ?? "general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setDone(false);
      if (prefill) setPractice(prefill);
    }
  }, [open, prefill]);

  const cells = buildCalendar(view);
  const monthLabel = view.toLocaleDateString("en-ZA", { month: "long", year: "numeric" });

  function shiftMonth(delta: number) {
    setView(new Date(view.getFullYear(), view.getMonth() + delta, 1));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !slot) {
      toast({
        title: "Choose a date and time",
        description: "Select a day on the calendar and a time slot first.",
        variant: "destructive",
      });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || null,
          mode,
          date: fmt(selected),
          slot,
          practiceArea: practice,
          notes: notes || null,
          consent,
          website: "",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast({
          title: "Could not book",
          description: json.error ?? "Please try again or call us.",
          variant: "destructive",
        });
        return;
      }
      setDone(true);
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-navy-100 p-0 sm:max-w-2xl">
        <DialogHeader className="rounded-t-3xl bg-navy-950 px-7 pb-6 pt-7 text-left">
          <DialogTitle className="flex items-center gap-3 font-display text-2xl font-semibold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15">
              <CalendarCheck className="h-5 w-5 text-gold-400" />
            </span>
            Book a consultation
          </DialogTitle>
          <DialogDescription className="mt-2 text-[13.5px] text-white/65">
            Choose a mode, date and time that suits you. We will confirm by email
            after conflict screening. Consultations are strictly confidential.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center px-8 py-12 text-center">
            <CheckCircle2 className="h-14 w-14 text-emerald-600" strokeWidth={1.4} />
            <h3 className="mt-5 font-display text-2xl font-semibold text-navy-900">
              Request received
            </h3>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              {selected && fmt(selected)} at {slot} — {mode === "video" ? "video conference" : mode === "phone" ? "telephone" : "in person, Pretoria"}. Our
              team will confirm the appointment by email once conflict screening is
              complete. Please do not send case documents beforehand.
            </p>
            <Button
              variant="gold"
              className="mt-7 rounded-full px-6"
              onClick={closeDialog}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5 px-7 py-6">
            {/* Mode */}
            <div>
              <Label className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy-800">
                1 · Consultation mode
              </Label>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-3.5 text-[12px] font-semibold transition-all",
                      mode === m.id
                        ? "border-gold-500 bg-gold-200/40 text-navy-950 shadow-gold"
                        : "border-navy-100 text-navy-700 hover:border-gold-400/60 hover:bg-ivory"
                    )}
                  >
                    <m.icon className="h-4.5 w-4.5 text-gold-700" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date + slot */}
            <div className="grid gap-5 sm:grid-cols-[1.2fr_1fr]">
              <div>
                <Label className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy-800">
                  2 · Choose a date
                </Label>
                <div className="mt-2.5 rounded-2xl border border-navy-100 p-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => shiftMonth(-1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-ivory"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-display text-[15px] font-semibold text-navy-900">
                      {monthLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => shiftMonth(1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-ivory"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-muted-foreground">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {cells.map((d, i) => {
                      if (!d) return <span key={i} />;
                      const disabled = d < today || d.getDay() === 0 || d.getDay() === 6;
                      const isSel =
                        selected && d.toDateString() === selected.toDateString();
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelected(d)}
                          className={cn(
                            "flex h-8 items-center justify-center rounded-lg text-[12.5px] font-semibold transition-all",
                            disabled && "text-navy-200",
                            !disabled && !isSel && "text-navy-900 hover:bg-gold-200/50",
                            isSel && "bg-navy-950 text-gold-300 shadow-md"
                          )}
                        >
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy-800">
                  3 · Time slot
                </Label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={cn(
                        "rounded-xl border py-2.5 text-[13px] font-bold transition-all",
                        slot === s
                          ? "border-gold-500 bg-gold-200/50 text-navy-950 shadow-gold"
                          : "border-navy-100 text-navy-800 hover:border-gold-400/60 hover:bg-ivory"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                  Times shown are SAST. Slots are requests — confirmed by email
                  following conflict screening.
                </p>
              </div>
            </div>

            {/* Details */}
            <div>
              <Label className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy-800">
                4 · Your details
              </Label>
              <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name *"
                  className="h-11 rounded-xl border-navy-100"
                />
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address *"
                  className="h-11 rounded-xl border-navy-100"
                />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telephone"
                  className="h-11 rounded-xl border-navy-100"
                />
                <Select value={practice} onValueChange={setPractice}>
                  <SelectTrigger className="h-11 rounded-xl border-navy-100">
                    <SelectValue placeholder="Practice area" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="general">General / not sure yet</SelectItem>
                    {PRACTICE_AREAS.map((p) => (
                      <SelectItem key={p.slug} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="What should the consultation cover? (non-confidential)"
                  className="resize-none rounded-xl border-navy-100 sm:col-span-2"
                />
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Checkbox
                id="bk-consent"
                checked={consent}
                onCheckedChange={(v) => setConsent(v === true)}
                className="mt-0.5 border-navy-300 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
              />
              <Label htmlFor="bk-consent" className="text-[12px] leading-relaxed text-navy-900/80">
                I consent to the processing of these details under POPIA for the
                purpose of arranging this consultation. *
              </Label>
            </div>

            <ConflictNotice className="py-3" />

            <Button
              type="submit"
              disabled={busy}
              className="h-12 w-full rounded-xl bg-gold-500 text-[14px] font-bold text-navy-950 shadow-gold hover:bg-gold-400"
            >
              {busy ? (
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
              ) : (
                <CalendarCheck className="h-4.5 w-4.5" />
              )}
              Request this consultation
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
