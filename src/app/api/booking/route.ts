import { db } from "@/lib/db";
import {
  bad,
  bookingSchema,
  clientIp,
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
    if (spammy(body)) return ok();
    const data = bookingSchema.parse(body);
    const saved = await db.booking.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        mode: data.mode,
        date: data.date,
        slot: data.slot ?? null,
        practiceArea: data.practiceArea ?? null,
        notes: data.notes ?? null,
        consent: data.consent,
      },
    });
    return ok({ id: saved.id });
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
