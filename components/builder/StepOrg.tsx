"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { PACKAGES, type PackageId } from "@/content/packages";
import {
  recommendedPackage,
  type BuilderState,
  type OrgType,
  type PractitionerBand,
  type SiteBand,
} from "@/lib/builder";
import { cn } from "@/lib/cn";

type Org = BuilderState["org"];

export const ORG_TYPES: { value: OrgType; label: string }[] = [
  { value: "wellness-clinic", label: "Wellness clinic" },
  { value: "functional-medicine", label: "Functional medicine" },
  { value: "lab", label: "Laboratory / diagnostics" },
  { value: "multi-center", label: "Multi-center group" },
  { value: "other", label: "Something else" },
];

export const SITE_BANDS: { value: SiteBand; label: string }[] = [
  { value: "1", label: "One site" },
  { value: "2-3", label: "2–3 sites" },
  { value: "4-10", label: "4–10 sites" },
  { value: "10+", label: "More than 10 sites" },
];

export const PRACTITIONER_BANDS: { value: PractitionerBand; label: string }[] = [
  { value: "1-5", label: "1–5 practitioners" },
  { value: "6-15", label: "6–15 practitioners" },
  { value: "16-50", label: "16–50 practitioners" },
  { value: "50+", label: "More than 50 practitioners" },
];

/** Display label for a stored org value, or null when the field is unanswered. */
export function orgTypeLabel(value: OrgType | null): string | null {
  return ORG_TYPES.find((option) => option.value === value)?.label ?? null;
}

export function siteBandLabel(value: SiteBand | null): string | null {
  return SITE_BANDS.find((option) => option.value === value)?.label ?? null;
}

export function practitionerBandLabel(
  value: PractitionerBand | null,
): string | null {
  return (
    PRACTITIONER_BANDS.find((option) => option.value === value)?.label ?? null
  );
}

function OptionCard({
  name,
  value,
  label,
  checked,
  onSelect,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border bg-surface px-4 py-3 text-sm transition-colors",
        checked
          ? "border-green bg-green-soft text-green-deep"
          : "border-line text-ink hover:border-green",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
          checked ? "border-green" : "border-line",
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            checked ? "bg-green" : "bg-transparent",
          )}
        />
      </span>
      <span className="leading-snug">{label}</span>
    </label>
  );
}

function Group({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
        {legend}
      </legend>
      {hint ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">{hint}</p>
      ) : null}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </fieldset>
  );
}

export type StepOrgProps = {
  org: Org;
  onChange: (patch: Partial<Org>) => void;
  /** Re-seeds the module selection from the advisory package. */
  onApplyPackage: (packageId: PackageId) => void;
};

/**
 * Step 1. Three radio-card groups describing the organization, plus an
 * optional free list of the tools the clinic runs today. Once all three
 * bands are answered an advisory banner names the package most teams in that
 * shape start from — advisory only, every module stays togglable in step 2.
 */
export function StepOrg({ org, onChange, onApplyPackage }: StepOrgProps) {
  const [toolDraft, setToolDraft] = useState("");

  const complete = Boolean(org.type && org.sites && org.practitioners);
  const suggestedId = recommendedPackage(org);
  const suggested = PACKAGES.find((pkg) => pkg.id === suggestedId);

  function addTool() {
    const value = toolDraft.trim();

    if (!value || org.currentTools.includes(value)) {
      setToolDraft("");
      return;
    }

    onChange({ currentTools: [...org.currentTools, value] });
    setToolDraft("");
  }

  function removeTool(tool: string) {
    onChange({
      currentTools: org.currentTools.filter((item) => item !== tool),
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <Group legend="What kind of organization is this?">
        {ORG_TYPES.map((option) => (
          <OptionCard
            key={option.value}
            name="org-type"
            value={option.value}
            label={option.label}
            checked={org.type === option.value}
            onSelect={() => onChange({ type: option.value })}
          />
        ))}
      </Group>

      <Group legend="How many sites do you run?">
        {SITE_BANDS.map((option) => (
          <OptionCard
            key={option.value}
            name="org-sites"
            value={option.value}
            label={option.label}
            checked={org.sites === option.value}
            onSelect={() => onChange({ sites: option.value })}
          />
        ))}
      </Group>

      <Group legend="How many practitioners need an account?">
        {PRACTITIONER_BANDS.map((option) => (
          <OptionCard
            key={option.value}
            name="org-practitioners"
            value={option.value}
            label={option.label}
            checked={org.practitioners === option.value}
            onSelect={() => onChange({ practitioners: option.value })}
          />
        ))}
      </Group>

      <fieldset>
        <legend className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
          Tools you use today (optional)
        </legend>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Whatever the clinic runs now — a practice management system, a
          spreadsheet, a booking tool, a lab portal. It tells us what a
          migration would have to carry.
        </p>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={toolDraft}
            onChange={(event) => setToolDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addTool();
              }
            }}
            placeholder="e.g. Google Sheets"
            aria-label="Add a tool you use today"
            className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:border-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green sm:max-w-xs"
          />
          <Button variant="outline" onClick={addTool}>
            Add tool
          </Button>
        </div>

        {org.currentTools.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {org.currentTools.map((tool) => (
              <li key={tool}>
                <span className="inline-flex items-center gap-2 rounded-full bg-green-soft px-3 py-1 text-sm text-green-deep">
                  {tool}
                  <button
                    type="button"
                    onClick={() => removeTool(tool)}
                    aria-label={`Remove ${tool}`}
                    className="rounded-full px-1 leading-none text-green transition-colors hover:text-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
                  >
                    &times;
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </fieldset>

      {complete && suggested ? (
        <div className="rounded-xl border border-green bg-green-soft p-5 md:p-6">
          <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green">
            Advisory
          </p>
          <p className="mt-2 text-base leading-relaxed text-green-deep">
            Based on this, most teams start from{" "}
            <strong className="font-semibold">{suggested.name}</strong>.{" "}
            {suggested.audience}. You can still switch any module on or off in
            the next step.
          </p>
          <div className="mt-4">
            <Button variant="primary" onClick={() => onApplyPackage(suggested.id)}>
              Apply {suggested.name} modules
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default StepOrg;
