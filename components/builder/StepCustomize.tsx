"use client";

import { CUSTOMIZATIONS } from "@/lib/builder";
import { cn } from "@/lib/cn";

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

export type StepCustomizeProps = {
  selected: string[];
  notes: string;
  onToggle: (id: string) => void;
  onNotesChange: (value: string) => void;
};

/**
 * Step 4. The add-on work that sits alongside the standard packages, plus a
 * free-text note for anything the checkboxes don't cover.
 */
export function StepCustomize({
  selected,
  notes,
  onToggle,
  onNotesChange,
}: StepCustomizeProps) {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-sm leading-relaxed text-muted">
        Most clinics need something shaped to them. Tick whatever applies —
        each item is scoped as onboarding work in the proposal, not billed as a
        surprise later.
      </p>

      <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {CUSTOMIZATIONS.map((customization) => {
          const checked = selected.includes(customization.id);

          return (
            <li key={customization.id}>
              <label
                className={cn(
                  "flex h-full cursor-pointer gap-3 rounded-xl border bg-surface p-5 transition-colors",
                  checked ? "border-green" : "border-line hover:border-green",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(customization.id)}
                  className="sr-only"
                />
                <Box checked={checked} />
                <span className="flex-1 text-sm leading-relaxed text-ink">
                  {customization.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div>
        <label
          htmlFor="builder-notes"
          className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted"
        >
          Anything else we should know?
        </label>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          A protocol you run, a timeline you have to hit, a regulator you
          answer to, a system you are leaving. It all shapes the scope.
        </p>
        <textarea
          id="builder-notes"
          rows={5}
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Tell us about your clinic, your timeline or anything specific you need."
          className="mt-3 w-full max-w-2xl rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-muted focus-visible:border-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
        />
      </div>
    </div>
  );
}

export default StepCustomize;
