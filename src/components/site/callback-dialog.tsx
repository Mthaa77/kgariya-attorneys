"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function CallbackDialog() {
  const { dialog, closeDialog } = useSite();
  const open = dialog === "callback";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("morning");
  const [practice, setPractice] = useState("general");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) setDone(false);
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "callback",
          practiceArea: practice,
          name,
          email: "callback@request.local",
          phone,
          message: `Call back requested. Preferred time: ${time}. Practice: ${practice}.`,
          consent: true,
          website: "",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast({
          title: "Could not request",
          description: json.error ?? "Please try again or call us directly.",
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
      <DialogContent className="rounded-3xl border-navy-100 p-0 sm:max-w-md">
        <DialogHeader className="rounded-t-3xl bg-navy-950 px-7 pb-6 pt-7 text-left">
          <DialogTitle className="flex items-center gap-3 font-display text-xl font-semibold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/15">
              <PhoneCall className="h-4.5 w-4.5 text-gold-400" />
            </span>
            Request a call back
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-[13px] text-white/65">
            Leave your number — the relevant practice lead will call you back
            within one business day.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center px-8 py-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" strokeWidth={1.5} />
            <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">
              We will call you
            </h3>
            <p className="mt-2 text-[13.5px] text-muted-foreground">
              Thank you, {name.split(" ")[0]}. Expect our call within one business
              day ({time} preference noted).
            </p>
            <Button variant="gold" className="mt-6 rounded-full px-6" onClick={closeDialog}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 px-7 py-6">
            <div className="space-y-1.5">
              <Label className="text-[12.5px] font-semibold text-navy-900">Your name *</Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="h-11 rounded-xl border-navy-100"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12.5px] font-semibold text-navy-900">
                Telephone number *
              </Label>
              <Input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+27 ..."
                className="h-11 rounded-xl border-navy-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[12.5px] font-semibold text-navy-900">
                  Best time
                </Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="h-11 rounded-xl border-navy-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12.5px] font-semibold text-navy-900">
                  Practice area
                </Label>
                <Select value={practice} onValueChange={setPractice}>
                  <SelectTrigger className="h-11 rounded-xl border-navy-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="general">General</SelectItem>
                    {PRACTICE_AREAS.map((p) => (
                      <SelectItem key={p.slug} value={p.name}>
                        {p.shortName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              disabled={busy}
              className="h-11 w-full rounded-xl bg-gold-500 font-bold text-navy-950 shadow-gold hover:bg-gold-400"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PhoneCall className="h-4 w-4" />
              )}
              Request call back
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
