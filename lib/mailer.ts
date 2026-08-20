import nodemailer from "nodemailer";
import type { Lead } from "@/lib/lead";

const DEFAULT_TO_EMAIL = "info@wims360.com";
const DEFAULT_FROM_EMAIL = "website@wims360.com";

/**
 * Builds the plain-text email subject for a lead notification.
 */
function buildSubject(lead: Lead): string {
  const organization = lead.contact.organization ?? "no org";
  return `[WIMS lead · ${lead.source}] ${lead.contact.name} — ${organization}`;
}

/**
 * Builds the plain-text email body for a lead notification: a contact
 * block, the free-text message (if any), then the pretty-printed builder
 * configuration payload (if any).
 */
function buildBody(lead: Lead): string {
  const lines: string[] = [
    `Source: ${lead.source}`,
    `Name: ${lead.contact.name}`,
    `Email: ${lead.contact.email}`,
  ];

  if (lead.contact.phone) {
    lines.push(`Phone: ${lead.contact.phone}`);
  }

  if (lead.contact.organization) {
    lines.push(`Organization: ${lead.contact.organization}`);
  }

  if (lead.message) {
    lines.push("", "Message:", lead.message);
  }

  if (lead.configuration !== undefined) {
    lines.push(
      "",
      "Configuration:",
      JSON.stringify(lead.configuration, null, 2),
    );
  }

  return lines.join("\n");
}

/**
 * Sends the lead as an email to LEAD_TO_EMAIL, choosing a delivery path
 * based on the environment configuration available:
 *   1. Resend (RESEND_API_KEY set) — POSTs to the Resend API.
 *   2. SMTP (SMTP_HOST set) — sends via a nodemailer transport.
 *   3. Dev fallback — logs the lead to the console.
 */
export async function sendLeadEmail(lead: Lead): Promise<void> {
  const to = process.env.LEAD_TO_EMAIL ?? DEFAULT_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const subject = buildSubject(lead);
  const text = buildBody(lead);

  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
    });

    if (!response.ok) {
      throw new Error(`Resend API responded with status ${response.status}`);
    }

    return;
  }

  if (process.env.SMTP_HOST) {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    });

    await transport.sendMail({ from, to, subject, text });
    return;
  }

  console.log("[lead]", JSON.stringify(lead, null, 2));
}
