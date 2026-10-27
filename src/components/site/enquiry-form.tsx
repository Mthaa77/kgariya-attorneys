"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
import { PRACTICE_AREAS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { ConflictNotice } from "./conflict-notice";

type Kind = "enquiry" | "callback" | "joining" | "career";

export function EnquiryForm({
  kind = "enquiry",
  defaultPractice,
  lockPractice = false,
  compact = false,
  className,
  heading,
  onDone,
}: {
  kind?: Kind;
  defaultPractice?: string;
  lockPractice?: boolean;
  compact?: boolean;
  className?: string;
  heading?: string;
  onDone?: () => void;
}) {
  const [practice, setPractice] = useState(defaultPractice ?? "general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    if (defaultPractice) setPractice(defaultPractice);
  }, [defaultPractice]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          practiceArea: practice,
          name,
          email,
          phone: phone || null,
          company: company || null,
          message,
          consent,
          website: "", // honeypot
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast({
          title: "Could not send",
          description: json.error ?? "Please check the form and try again.",
          variant: "destructive",
        });
        return;
      }
      setDone(json.routed ?? "your enquiry has been routed to the relevant practice lead");
      toast({
        title: "Enquiry received",
        description: "Thank you — we will respond within one business day.",
      });
      onDone?.();
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

  if (done) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center",
          className
        )}
      >
        <CheckCircle2 className="h-12 w-12 text-emerald-600" strokeWidth={1.5} />
        <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">
          Enquiry received
        </h3>
        <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
          Thank you, {name.split(" ")[0]}. {done.charAt(0).toUpperCase() + done.slice(1)}.
          Expect a response within one business day. Remember: please hold all
          confidential documents until conflict screening is complete.
        </p>
        <Button
          variant="outline"
          className="mt-6 rounded-full border-navy-200"
          onClick={() => {
            setDone(null);
            setName("");
            setEmail("");
            setPhone("");
            setCompany("");
            setMessage("");
            setConsent(false);
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const messageLabel =
    kind === "joining"
      ? "Tell us about your practice (no confidential client information, please)"
      : kind === "career"
        ? "Briefly tell us about your experience and the role you are applying for"
        : "How can we help? (Do not include confidential case documents)";

  return (
    <form onSubmit={submit} className={cn("space-y-4", className)}>
      {heading && (
        <h3 className="font-display text-xl font-semibold text-navy-900">{heading}</h3>
      )}

      {kind === "enquiry" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-[12.5px] font-semibold text-navy-900">
              Route to practice area
            </Label>
            <Select
              value={practice}
              onValueChange={setPractice}
              disabled={lockPractice}
            >
              <SelectTrigger
                className={cn(
                  "h-11 rounded-xl border-navy-100 bg-white",
                  lockPractice && "opacity-90"
                )}
              >
                <SelectValue placeholder="Choose a practice area" />
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
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ef-name" className="text-[12.5px] font-semibold text-navy-900">
              Full name *
            </Label>
            <Input
              id="ef-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="h-11 rounded-xl border-navy-100 bg-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ef-company" className="text-[12.5px] font-semibold text-navy-900">
              Company / organisation
            </Label>
            <Input
              id="ef-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Optional"
              className="h-11 rounded-xl border-navy-100 bg-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ef-email" className="text-[12.5px] font-semibold text-navy-900">
              Email address *
            </Label>
            <Input
              id="ef-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.co.za"
              className="h-11 rounded-xl border-navy-100 bg-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ef-phone" className="text-[12.5px] font-semibold text-navy-900">
              Telephone
            </Label>
            <Input
              id="ef-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+27 ..."
              className="h-11 rounded-xl border-navy-100 bg-white"
            />
          </div>
        </div>
      )}

      {kind !== "enquiry" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ef2-name" className="text-[12.5px] font-semibold text-navy-900">
              Full name *
            </Label>
            <Input
              id="ef2-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl border-navy-100 bg-white"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ef2-email" className="text-[12.5px] font-semibold text-navy-900">
              Email address *
            </Label>
            <Input
              id="ef2-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl border-navy-100 bg-white"
              placeholder="name@example.co.za"
            />
          </div>
          <div className={kind === "callback" ? "space-y-1.5" : "space-y-1.5"}>
            <Label
              htmlFor="ef2-phone"
              className="text-[12.5px] font-semibold text-navy-900"
            >
              {kind === "callback" ? "Telephone * " : "Telephone"}
            </Label>
            <Input
              id="ef2-phone"
              type="tel"
              required={kind === "callback"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 rounded-xl border-navy-100 bg-white"
              placeholder="+27 ..."
            />
          </div>
          {kind === "career" && (
            <div className="space-y-1.5">
              <Label htmlFor="ef2-role" className="text-[12.5px] font-semibold text-navy-900">
                Role of interest
              </Label>
              <Input
                id="ef2-role"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="h-11 rounded-xl border-navy-100 bg-white"
                placeholder="e.g. Candidate Attorney"
              />
            </div>
          )}
          {kind === "joining" && (
            <div className="space-y-1.5">
              <Label htmlFor="ef2-firm" className="text-[12.5px] font-semibold text-navy-900">
                Practice / firm name
              </Label>
              <Input
                id="ef2-firm"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="h-11 rounded-xl border-navy-100 bg-white"
                placeholder="Your practice"
              />
            </div>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="ef-msg" className="text-[12.5px] font-semibold text-navy-900">
          {messageLabel} *
        </Label>
        <Textarea
          id="ef-msg"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={compact ? 4 : 5}
          className="resize-none rounded-xl border-navy-100 bg-white"
          placeholder="A short, non-confidential summary is enough at this stage."
        />
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value=""
        onChange={() => {}}
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex items-start gap-2.5 rounded-xl bg-ivory p-3.5">
        <Checkbox
          id="ef-consent"
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          className="mt-0.5 border-navy-300 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
        />
        <Label
          htmlFor="ef-consent"
          className="text-[12px] leading-relaxed text-navy-900/80"
        >
          I consent to Kgariya Attorneys Incorporated processing these details under
          its POPIA privacy notice, for the sole purpose of responding to this
          enquiry and conducting conflict screening. *
        </Label>
      </div>

      <Button
        type="submit"
        disabled={busy || !consent}
        className="h-12 w-full rounded-xl bg-navy-950 text-[14px] font-bold text-white transition-all hover:bg-navy-800 disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="h-4.5 w-4.5 animate-spin" />
        ) : (
          <Send className="h-4.5 w-4.5" />
        )}
        {kind === "callback"
          ? "Request my call back"
          : kind === "joining"
            ? "Start a confidential conversation"
            : kind === "career"
              ? "Submit application"
              : "Send enquiry"}
      </Button>

      <p className="text-[11.5px] leading-relaxed text-muted-foreground">
        Submissions are protected against spam and handled under POPIA. Forms are
        routed directly to the relevant practice inbox.
      </p>

      <ConflictNotice className="mt-1" />
    </form>
  );
}
