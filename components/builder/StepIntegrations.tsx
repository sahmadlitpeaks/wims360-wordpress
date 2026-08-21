"use client";

import { INTEGRATIONS } from "@/content/integrations";
import { cn } from "@/lib/cn";

/** Only the integrations a clinic actually chooses appear in the builder. */
export const SELECTABLE_INTEGRATIONS = INTEGRATIONS.filter(
  (integration) => integration.builderSelectable,
);

const CATEGORY_LABELS: Record<string, string> = {
  wearables: "Wearables",
  labs: "Labs",
  comms: "Messaging",
  payments: "Payments",
  auth: "Identity",
  infra: "Infrastructure",
};

function Box({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
        checked ? "border-green bg-green" : "border-line bg-surface",
      )}
    >
      {checked ? (
        <svg
          viewBox="0 0 12 12"
          focusable="false"
          className="h-3 w-3 text-white"
        >
          <path
            d="M2 6.4 4.6 9 10 3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

export type StepIntegrationsProps = {
  selected: string[];
  otherSystems: string;
  onToggle: (name: string) => void;
  onOtherSystemsChange: (value: string) => void;
};

/**
 * Step 3. Checkbox cards over the builder-selectable integrations, plus a
 * free-text field for a system we don't list yet.
 */
export function StepIntegrations({
  selected,
  otherSystems,
  onToggle,
  onOtherSystemsChange,
}: StepIntegrationsProps) {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-sm leading-relaxed text-muted">
        Pick the systems WIMS 360 should talk to on day one. Nothing here is
        mandatory — an integration you skip today can be switched on later
        without touching the record underneath.
      </p>

      <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {SELECTABLE_INTEGRATIONS.map((integration) => {
          const checked = selected.includes(integration.name);

          return (
            <li key={integration.name}>
              <label
                className={cn(
                  "flex h-full cursor-pointer gap-3 rounded-xl border bg-surface p-5 transition-colors",
                  checked ? "border-green" : "border-line hover:border-green",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(integration.name)}
                  className="sr-only"
                />
                <Box checked={checked} />
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-base font-semibold leading-snug text-ink">
                      {integration.name}
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase leading-5 tracking-[0.12em] text-green">
                      {CATEGORY_LABELS[integration.category] ??
                        integration.category}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">
                    {integration.note}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div>
        <label
          htmlFor="builder-other-systems"
          className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted"
        >
          Another system?
        </label>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Name anything else that has to connect — a laboratory system, an
          accounting package, a device vendor. We&apos;ll tell you honestly
          whether it is supported, buildable or out of scope.
        </p>
        <input
          id="builder-other-systems"
          type="text"
          value={otherSystems}
          onChange={(event) => onOtherSystemsChange(event.target.value)}
          placeholder="e.g. our own laboratory system"
          className="mt-3 w-full max-w-xl rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:border-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
        />
      </div>
    </div>
  );
}

export default StepIntegrations;
