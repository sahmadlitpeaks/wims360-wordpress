"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PACKAGES, type PackageId } from "@/content/packages";
import type { Lead } from "@/lib/lead";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Estate form control: no box, one hairline under the field, green on focus. */
const CONTROL_CLASS =
  "mt-3.5 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-[18px] leading-[1.5] text-ink transition-colors duration-300 placeholder:text-muted focus:border-green focus:outline-none md:text-[20px]";

const LABEL_CLASS =
  "block font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep";

type OrgTypeValue =
  | "wellness-clinic"
  | "functional-integrative-medicine"
  | "lab-diagnostics"
  | "multi-center"
  | "other";

const ORG_TYPES: { value: OrgTypeValue; label: string }[] = [
  { value: "wellness-clinic", label: "Wellness clinic" },
  {
    value: "functional-integrative-medicine",
    label: "Functional & integrative medicine",
  },
  { value: "lab-diagnostics", label: "Lab or diagnostics provider" },
  { value: "multi-center", label: "Multi-center organization" },
  { value: "other", label: "Other" },
];

/** Package or security-pack context read from `?package=` on the contact page. */
export type DemoFormPackageContext = {
  source: Lead["source"];
  message: string;
};

/** Resolves `?package=` into the source + prefilled message the brief calls for. */
export function resolvePackageContext(
  packageId: string | null,
): DemoFormPackageContext | null {
  if (!packageId) {
    return null;
  }

  if (packageId === "security") {
    return { source: "security-pack", message: "Requesting the DPA/BAA pack." };
  }

  const pkg = PACKAGES.find((item) => item.id === packageId);

  if (!pkg) {
    return null;
  }

  return {
    source: "pricing",
    message: `Interested in the ${pkg.name} package.`,
  };
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  optional = false,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {optional ? " (optional)" : ""}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={CONTROL_CLASS}
      />
      {error ? (
        <p id={errorId} className="mt-3 text-[13.5px] leading-[1.5] text-brass-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type DemoFormProps = {
  /** `?package=` from the contact page's search params — a `PACKAGES` id or `'security'`. */
  packageId?: string | null;
};

/**
 * The contact page's lead form. Mirrors the server-side `leadSchema` for
 * inline validation, prefills its source and message from `packageId` (a
 * package id routes here as `source: 'pricing'`, `'security'` as
 * `source: 'security-pack'`, anything else as a plain `'demo'` enquiry), and
 * swaps to a success panel with demo-prep guidance once the lead is sent.
 */
export function DemoForm({ packageId = null }: DemoFormProps) {
  const packageContext = useMemo(
    () => resolvePackageContext(packageId ?? null),
    [packageId],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [orgType, setOrgType] = useState<OrgTypeValue | "">("");
  const [message, setMessage] = useState(packageContext?.message ?? "");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  const { submit, status } = useLeadSubmit();
  const submitting = status === "sending";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: { name?: string; email?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Please enter your name (at least two characters).";
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Please enter a valid work email address.";
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const orgTypeLabel = ORG_TYPES.find((option) => option.value === orgType)
      ?.label;

    const fullMessage = [
      message.trim() || null,
      orgTypeLabel ? `Organization type: ${orgTypeLabel}` : null,
    ]
      .filter((line): line is string => Boolean(line))
      .join("\n\n");

    await submit({
      source: packageContext?.source ?? "demo",
      contact: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        organization: organization.trim() || undefined,
      },
      message: fullMessage || undefined,
    });
  }

  if (status === "ok") {
    return (
      <div className="border-t border-line pt-10 md:pt-12">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brass-deep">
          Message sent
        </p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,52px)] font-normal leading-[1.06] text-ink [text-wrap:pretty]">
          Thanks — we&apos;ll reply within one business day.
        </h2>
        <p className="mt-7 max-w-[52ch] text-[16.5px] leading-[1.85] text-muted">
          Bring your lab vendor list, your current booking flow, and one real
          patient scenario — we&apos;ll show it running in WIMS.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-t border-line pt-10 md:pt-12"
    >
      <div className="flex flex-col gap-8">
        <Field
          id="demo-name"
          label="Your name"
          value={name}
          onChange={setName}
          error={fieldErrors.name}
          autoComplete="name"
        />
        <Field
          id="demo-email"
          label="Work email"
          type="email"
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
          autoComplete="email"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Field
            id="demo-phone"
            label="Phone"
            type="tel"
            value={phone}
            onChange={setPhone}
            optional
            autoComplete="tel"
          />
          <Field
            id="demo-organization"
            label="Organization"
            value={organization}
            onChange={setOrganization}
            optional
            autoComplete="organization"
          />
        </div>

        <div>
          <label htmlFor="demo-org-type" className={LABEL_CLASS}>
            Organization type (optional)
          </label>
          <select
            id="demo-org-type"
            value={orgType}
            onChange={(event) =>
              setOrgType(event.target.value as OrgTypeValue | "")
            }
            className={CONTROL_CLASS}
          >
            <option value="">Select one</option>
            {ORG_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="demo-message" className={LABEL_CLASS}>
            What should we show you? (optional)
          </label>
          <textarea
            id="demo-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            className={`${CONTROL_CLASS} resize-y`}
          />
        </div>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-10 border border-brass-deep bg-[color-mix(in_srgb,var(--brass-deep)_8%,var(--surface))] px-5 py-4 text-[14.5px] leading-[1.75] text-brass-deep"
        >
          We couldn&apos;t send your message just now. Please try again, or
          email info@wims360.com and we&apos;ll pick it up from there.
        </p>
      ) : null}

      <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
        <Button type="submit" variant="dark" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Book a demo"}
        </Button>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          We reply within one business day.
        </p>
      </div>
    </form>
  );
}

export default DemoForm;
