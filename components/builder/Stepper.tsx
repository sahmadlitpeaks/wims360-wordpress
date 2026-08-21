"use client";

import { cn } from "@/lib/cn";

export type StepNumber = 1 | 2 | 3 | 4 | 5;

export const STEP_LABELS: Record<StepNumber, string> = {
  1: "Your organization",
  2: "Modules",
  3: "Integrations",
  4: "Customization",
  5: "Review & request",
};

const STEP_NUMBERS: StepNumber[] = [1, 2, 3, 4, 5];

function Check() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      className="h-3 w-3"
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
  );
}

export type StepperProps = {
  current: StepNumber;
  /** Only fired for steps already completed — the stepper never jumps forward. */
  onGoTo: (step: StepNumber) => void;
};

/**
 * The five labelled steps of the builder. Completed steps are clickable and
 * carry a check; the current step is highlighted; later steps are inert until
 * the visitor gets there with Continue.
 */
export function Stepper({ current, onGoTo }: StepperProps) {
  return (
    <nav aria-label="Builder steps">
      <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-3">
        {STEP_NUMBERS.map((step) => {
          const isCurrent = step === current;
          const isComplete = step < current;

          return (
            <li key={step} className="flex items-center gap-2">
              <button
                type="button"
                disabled={!isComplete}
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => onGoTo(step)}
                className={cn(
                  "flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                  isCurrent && "border-green bg-green-soft text-green-deep",
                  isComplete &&
                    "border-line bg-surface text-ink hover:border-green hover:text-green",
                  !isCurrent && !isComplete && "border-line bg-surface text-muted",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[0.62rem] leading-none",
                    isCurrent && "bg-green-deep text-white",
                    isComplete && "bg-green text-white",
                    !isCurrent && !isComplete && "bg-green-soft text-green-deep",
                  )}
                >
                  {isComplete ? <Check /> : step}
                </span>
                <span className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em]">
                  {STEP_LABELS[step]}
                </span>
              </button>

              {step < 5 ? (
                <span
                  aria-hidden="true"
                  className="hidden h-px w-4 bg-line sm:block"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Stepper;
