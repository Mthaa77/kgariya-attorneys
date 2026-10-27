import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/* Shared helpers: honeypot + coarse in-memory rate limiting. */

const hits = new Map<string, number[]>();

export function rateLimit(ip: string, max = 6, windowMs = 60_000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    hits.set(ip, arr);
    return false;
  }
  arr.push(now);
  hits.set(ip, arr);
  return true;
}

export function spammy(body: Record<string, unknown>): boolean {
  // Honeypot field must stay empty; bots fill it.
  return typeof body.website === "string" && body.website.trim().length > 0;
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local"
  );
}

export function ok(data: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: true, ...data });
}

export function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export function handleError(e: unknown) {
  console.error("[api]", e);
  return bad("Something went wrong on our side. Please try again, or call us.", 500);
}

/* Schemas */

export const enquirySchema = z.object({
  kind: z.enum(["enquiry", "callback", "joining", "career"]).default("enquiry"),
  practiceArea: z.string().max(120).optional().nullable(),
  name: z.string().trim().min(2, "Please provide your name").max(120),
  email: z.string().trim().email("Please provide a valid email address").max(160),
  phone: z.string().trim().max(40).optional().nullable(),
  company: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().min(5, "Please tell us briefly what you need").max(4000),
  consent: z.literal(true, {
    message: "Consent is required under POPIA before we can respond.",
  }),
});

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please provide your name").max(120),
  email: z.string().trim().email("Please provide a valid email address").max(160),
  phone: z.string().trim().max(40).optional().nullable(),
  mode: z.enum(["video", "phone", "in-person"]),
  date: z.string().trim().min(4).max(40),
  slot: z.string().trim().max(40).optional().nullable(),
  practiceArea: z.string().trim().max(120).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
  consent: z.literal(true, {
    message: "Consent is required under POPIA before we can respond.",
  }),
});

export const subscribeSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address").max(160),
});
