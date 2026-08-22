"use client";

import { CUSTOMIZATIONS } from "@/lib/builder";
import { cn } from "@/lib/cn";

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
      <p className="max-w-2xl text-[15px] leading-[1.8] text-muted">
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
                  "flex h-full cursor-pointer gap-4 rounded-none border bg-surface p-6 transition-colors duration-300",
                  checked ? "border-brass" : "border-line hover:border-brass",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(customization.id)}
                  className="sr-only"
                />
                <Box checked={checked} />
                <span className="flex-1 text-[14.5px] leading-[1.8] text-ink">
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
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep"
        >
          Anything else we should know?
        </label>
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-muted">
          A protocol you run, a timeline you have to hit, a regulator you
          answer to, a system you are leaving. It all shapes the scope.
        </p>
        <textarea
          id="builder-notes"
          rows={5}
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Tell us about your clinic, your timeline or anything specific you need."
          className="mt-4 w-full max-w-2xl resize-y rounded-none border border-line bg-surface px-4 py-3.5 text-sm leading-[1.8] text-ink transition-colors duration-300 placeholder:text-muted focus:border-green focus:outline-none"
        />
      </div>
    </div>
  );
}

export default StepCustomize;
