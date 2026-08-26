"use client";

import { INTEGRATION_SERVICES } from "@/content/integrations";
import { cn } from "@/lib/cn";

/**
 * Integrations are offered as SERVICES, never as suppliers. Only the services
 * a practice actually chooses appear in the builder.
 */
export const SELECTABLE_SERVICES = INTEGRATION_SERVICES.filter(
  (service) => service.builderSelectable,
);

function Box({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-none border transition-colors duration-300",
        checked ? "border-green bg-green" : "border-line bg-surface",
      )}
    >
      {checked ? (
        <svg
          viewBox="0 0 12 12"
          focusable="false"
          className="h-3 w-3 text-cream"
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
 * Step 3. Checkbox cards over the connected services a practice can switch
 * on, plus a free-text field for anything we don't list yet.
 */
export function StepIntegrations({
  selected,
  otherSystems,
  onToggle,
  onOtherSystemsChange,
}: StepIntegrationsProps) {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-[15px] leading-[1.8] text-muted">
        Pick the services WIMS 360 should connect to on day one. Nothing here is
        mandatory — a service you skip today can be switched on later without
        touching the record underneath, and more can be integrated.
      </p>

      <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {SELECTABLE_SERVICES.map((service) => {
          const checked = selected.includes(service.name);

          return (
            <li key={service.id}>
              <label
                className={cn(
                  "flex h-full cursor-pointer gap-4 rounded-none border bg-surface p-6 transition-colors duration-300",
                  checked ? "border-brass" : "border-line hover:border-brass",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(service.name)}
                  className="sr-only"
                />
                <Box checked={checked} />
                <span className="flex-1">
                  <span className="block font-display text-[22px] leading-[1.15] text-ink">
                    {service.name}
                  </span>
                  <span className="mt-2.5 block text-[14px] leading-[1.8] text-muted">
                    {service.description}
                  </span>
                  {service.examples ? (
                    <span className="mt-3 block font-semibold text-[12px] uppercase leading-[1.8] tracking-[0.06em] text-brass-deep">
                      {service.examples.join(" · ")}
                    </span>
                  ) : null}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div>
        <label
          htmlFor="builder-other-systems"
          className="font-semibold text-[12px] uppercase tracking-[0.06em] text-brass-deep"
        >
          Another service?
        </label>
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-muted">
          Name anything else that has to connect — a laboratory system, an
          accounting package, a device your clients already wear. We&apos;ll
          tell you honestly whether it is supported, buildable or out of scope.
        </p>
        <input
          id="builder-other-systems"
          type="text"
          value={otherSystems}
          onChange={(event) => onOtherSystemsChange(event.target.value)}
          placeholder="e.g. our own laboratory system"
          className="mt-4 w-full max-w-xl rounded-none border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors duration-300 placeholder:text-muted focus:border-green focus:outline-none"
        />
      </div>
    </div>
  );
}

export default StepIntegrations;
