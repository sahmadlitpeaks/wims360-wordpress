"use client";

import { Chip } from "@/components/ui/Chip";
import { MODULES, type ModuleId } from "@/content/modules";
import { cn } from "@/lib/cn";

/** The platform base every configuration carries, whatever else is switched on. */
const ALWAYS_INCLUDED = [
  "Client records",
  "Compliance layer",
  "Dashboards & reporting",
];

export type ModuleNote = {
  moduleId: ModuleId;
  text: string;
};

function Switch({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={cn(
          "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
          on ? "bg-green" : "bg-line",
        )}
      >
        <span
          className={cn(
            "h-5 w-5 rounded-full bg-surface shadow-sm transition-transform",
            on && "translate-x-5",
          )}
        />
      </span>
      <span className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em] text-muted">
        {label}
      </span>
    </span>
  );
}

export type StepModulesProps = {
  selected: ModuleId[];
  note: ModuleNote | null;
  onToggle: (id: ModuleId) => void;
  onDismissNote: () => void;
};

/**
 * Step 2. One card per module with an aria-pressed toggle. When a toggle
 * cascades — Dr.T AI needs Assessments, and dropping Assessments drops
 * Dr.T AI — the explanation appears inline on the card that was toggled.
 */
export function StepModules({
  selected,
  note,
  onToggle,
  onDismissNote,
}: StepModulesProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-line bg-green-soft px-5 py-4">
        <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green">
          Always included
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-green-deep">
          {ALWAYS_INCLUDED.join(" · ")}
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {MODULES.map((module) => {
          const on = selected.includes(module.id);
          const showNote = note?.moduleId === module.id;

          return (
            <li
              key={module.id}
              className={cn(
                "flex flex-col rounded-xl border bg-surface p-6",
                on ? "border-green" : "border-line",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                    {module.name}
                  </h3>
                  <p className="mt-1.5 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em] text-green">
                    {module.half === "clinical" ? "Clinical" : "Operations"}
                  </p>
                </div>
                {on ? <Chip tone="green">On</Chip> : null}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {module.tagline}.
              </p>

              <button
                type="button"
                aria-pressed={on}
                aria-label={`${module.name} module`}
                onClick={() => onToggle(module.id)}
                className="mt-5 flex items-center rounded-xl border border-line px-3 py-2 transition-colors hover:border-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Switch on={on} label={on ? "Included" : "Not included"} />
              </button>

              {showNote ? (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-green-soft px-4 py-3">
                  <p
                    role="status"
                    className="flex-1 text-sm leading-relaxed text-green-deep"
                  >
                    {note.text}
                  </p>
                  <button
                    type="button"
                    onClick={onDismissNote}
                    aria-label="Dismiss note"
                    className="rounded-full px-1 leading-none text-green transition-colors hover:text-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
                  >
                    &times;
                  </button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StepModules;
