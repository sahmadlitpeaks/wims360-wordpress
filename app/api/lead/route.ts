import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead";
import { sendLeadEmail } from "@/lib/mailer";

export async function POST(req: Request): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { body: ["Invalid JSON"] } },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  console.info(
    "[lead:received]",
    JSON.stringify({
      source: parsed.data.source,
      email: parsed.data.contact.email,
      name: parsed.data.contact.name,
      at: new Date().toISOString(),
    }),
  );

  try {
    await sendLeadEmail(parsed.data);
  } catch (error) {
    console.error("[lead] failed to send lead email", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
