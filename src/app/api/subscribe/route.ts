import { db } from "@/lib/db";
import {
  bad,
  clientIp,
  handleError,
  ok,
  rateLimit,
  spammy,
  subscribeSchema,
} from "@/lib/api-helpers";

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!rateLimit(ip, 10)) return bad("Too many attempts. Please try again shortly.");
    const body = await req.json();
    if (spammy(body)) return ok();
    const data = subscribeSchema.parse(body);
    await db.subscriber.upsert({
      where: { email: data.email },
      update: {},
      create: { email: data.email },
    });
    return ok();
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
