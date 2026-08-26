"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  orgTypeLabel,
  practitionerBandLabel,
  siteBandLabel,
} from "@/components/builder/StepOrg";
import { Button } from "@/components/ui/Button";
import { BASELINE_MODULES } from "@/content/modules";
import {
  builderGroups,
  CUSTOMIZATIONS,
  selectedSelectableCount,
  type BuilderState,
} from "@/lib/builder";

export type ContactDetails = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Estate form control: sharp corners, hairline border, green on focus. */
const CONTROL_CLASS =
  "mt-3 w-full rounded-none border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors duration-300 placeholder:text-muted focus:border-green focus:outline-none";

const LABEL_CLASS =
  "block font-semibold text-[12px] uppercase tracking-[0.06em] text-brass-deep";

/** The selectable modules that are on, grouped by pillar for the review. */
function selectedByGroup(
  state: BuilderState,
): { name: string; modules: string[] }[] {
  const selected = new Set(state.modules);

  return builderGroups()
    .map((group) => ({
      name: group.name,
      modules: group.modules
        .filter((module) => selected.has(module.id))
        .map((module) => module.name),
    }))
    .filter((group) => group.modules.length > 0);
}

function customizationLabels(state: BuilderState): string[] {
  return state.customizations
    .map((id) => CUSTOMIZATIONS.find((item) => item.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-5">
      <p className="font-semibold text-[12px] uppercase tracking-[0.06em] text-brass-deep">
        {label}
      </p>
      <div className="mt-2.5 text-[14.5px] leading-[1.75] text-ink">
        {children}
      </div>
    </div>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <span className="text-muted">{children}</span>;
}

/**
 * Read-only restatement of the configuration. Used on the review step and
 * again on the success screen so the visitor sees exactly what was sent.
 */
export function ConfigurationSummary({ state }: { state: BuilderState }) {
  const orgBits = [
    orgTypeLabel(state.org.type),
    siteBandLabel(state.org.sites),
    practitionerBandLabel(state.org.practitioners),
  ].filter((bit): bit is string => Boolean(bit));

  const groups = selectedByGroup(state);
  const customizations = customizationLabels(state);

  return (
    <div className="flex flex-col gap-5">
      <Block label="Your organization">
        {orgBits.length > 0 ? (
          orgBits.join(" · ")
        ) : (
          <Empty>Not specified</Empty>
        )}
        {state.org.currentTools.length > 0 ? (
          <p className="mt-1.5 text-muted">
            Currently using: {state.org.currentTools.join(", ")}
          </p>
        ) : null}
      </Block>

      <Block
        label={`Modules switched on (${selectedSelectableCount(state)})`}
      >
        {groups.length > 0 ? (
          <ul className="flex list-none flex-col gap-3">
            {groups.map((group) => (
              <li key={group.name}>
                <span className="font-semibold text-[12px] uppercase tracking-[0.06em] text-brass">
                  {group.name}
                </span>
                <span className="mt-1 block">{group.modules.join(" · ")}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Platform baseline only</Empty>
        )}
        <p className="mt-3 text-muted">
          Included in every package:{" "}
          {BASELINE_MODULES.map((module) => module.name).join(" · ")}
        </p>
      </Block>

      <Block label="Connected services">
        {state.integrations.length > 0 ? (
          state.integrations.join(" · ")
        ) : (
          <Empty>None selected</Empty>
        )}
        {state.otherSystems.trim() ? (
          <p className="mt-1.5 text-muted">
            Also asked about: {state.otherSystems.trim()}
          </p>
        ) : null}
      </Block>

      <Block label="Customization">
        {customizations.length > 0 ? (
          <ul className="flex flex-col gap-1.5">
            {customizations.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        ) : (
          <Empty>None selected</Empty>
        )}
      </Block>

      {state.notes.trim() ? (
        <Block label="Your notes">
          <p className="whitespace-pre-wrap">{state.notes.trim()}</p>
        </Block>
      ) : null}
    </div>
  );
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
        <p id={errorId} className="mt-2.5 text-[13.5px] leading-[1.5] text-brass-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type StepReviewProps = {
  state: BuilderState;
  submitting: boolean;
  /** Server- or network-level failure message; field errors stay local. */
  error: string | null;
  onSubmit: (contact: ContactDetails) => void;
};

/**
 * Step 5. Restates the configuration, then collects the contact details the
 * lead endpoint needs. Required fields mirror the server-side lead schema:
 * a name of at least two characters and a well-formed email address.
 */
export function StepReview({
  state,
  submitting,
  error,
  onSubmit,
}: StepReviewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      organization: organization.trim() || undefined,
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-display text-[clamp(1.75rem,3.35vw,37px)] font-semibold leading-[1.08] text-ink">
          Your WIMS 360
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-muted">
          This is the configuration we&apos;ll scope against. Send it with your
          details and a written proposal — modules, practitioner seats, centres
          and onboarding — comes back within one business day.
        </p>

        <div className="mt-8 border border-line bg-surface p-7 md:p-9">
          <ConfigurationSummary state={state} />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="max-w-xl">
        <h3 className="font-display text-[26px] font-semibold leading-[1.15] text-ink">
          Where should the proposal go?
        </h3>

        <div className="mt-7 flex flex-col gap-7">
          <Field
            id="builder-name"
            label="Your name"
            value={name}
            onChange={setName}
            error={fieldErrors.name}
            autoComplete="name"
          />
          <Field
            id="builder-email"
            label="Work email"
            type="email"
            value={email}
            onChange={setEmail}
            error={fieldErrors.email}
            autoComplete="email"
          />
          <Field
            id="builder-phone"
            label="Phone"
            type="tel"
            value={phone}
            onChange={setPhone}
            optional
            autoComplete="tel"
          />
          <Field
            id="builder-organization"
            label="Organization"
            value={organization}
            onChange={setOrganization}
            optional
            autoComplete="organization"
          />
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-8 border border-brass-deep bg-[color-mix(in_srgb,var(--brass-deep)_8%,var(--surface))] px-5 py-4 text-[14.5px] leading-[1.75] text-brass-deep"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-10">
          <Button type="submit" variant="dark" size="lg" disabled={submitting}>
            {submitting ? "Sending…" : "Request a Configuration Review"}
          </Button>
        </div>

        <p className="mt-5 text-[14.5px] leading-[1.8] text-muted">
          No pricing is calculated here. We read the configuration, scope it
          and reply in writing within one business day.
        </p>
      </form>
    </div>
  );
}

export default StepReview;
