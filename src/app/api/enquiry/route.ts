import { db } from "@/lib/db";
import {
  bad,
  clientIp,
  enquirySchema,
  handleError,
  ok,
  rateLimit,
  spammy,
} from "@/lib/api-helpers";

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!rateLimit(ip)) {
      return bad("Too many submissions. Please call us instead — we will pick up.");
    }
    const body = await req.json();
    if (spammy(body)) {
      // Honeypot tripped — pretend success so bots learn nothing.
      return ok();
    }
    const data = enquirySchema.parse(body);
    const saved = await db.enquiry.create({
      data: {
        kind: data.kind,
        practiceArea: data.practiceArea ?? null,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        message: data.message,
        consent: data.consent,
      },
    });
    const reviewNote =
      data.practiceArea && data.practiceArea !== "general"
        ? "we have recorded your enquiry under " + data.practiceArea + " for initial review"
        : "we have recorded your enquiry for initial review";
    return ok({ id: saved.id, reviewNote });
  } catch (e) {
    if (e instanceof Error && e.name === "ZodError") {
      const msg =
        (e as { issues?: { message: string }[] }).issues?.[0]?.message ??
        "Please check the form and try again.";
      return bad(msg);
    }
    return handleError(e);
  }
}
