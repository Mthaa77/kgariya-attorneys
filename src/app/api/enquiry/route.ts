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
    const routed =
      data.practiceArea && data.practiceArea !== "general"
        ? `your enquiry has been routed to the ${data.practiceArea} practice lead`
        : "your enquiry has been routed to the relevant practice lead";
    return ok({ id: saved.id, routed });
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
