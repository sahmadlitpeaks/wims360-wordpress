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
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-10 shrink-0 items-center rounded-none p-0.5 transition-colors duration-300",
          on ? "bg-green" : "bg-line",
        )}
      >
        <span
          className={cn(
            "h-4 w-4 rounded-none bg-surface transition-transform duration-300",
            on && "translate-x-5",
          )}
        />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
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
      <div className="rounded-none border border-line bg-green-soft px-6 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
          Always included
        </p>
        <p className="mt-2.5 text-[14.5px] leading-[1.7] text-green-deep">
          {ALWAYS_INCLUDED.join(" · ")}
        </p>
      </div>

      <ul className="grid list-none grid-cols-1 gap-5 xl:grid-cols-2">
        {MODULES.map((module) => {
          const on = selected.includes(module.id);
          const showNote = note?.moduleId === module.id;

          return (
            <li
              key={module.id}
              className={cn(
                "flex flex-col rounded-none border bg-surface p-7 transition-colors duration-300",
                on ? "border-brass" : "border-line",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[26px] font-normal leading-[1.15] text-ink">
                    {module.name}
                  </h3>
                  <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-brass">
                    {module.half === "clinical" ? "Clinical" : "Operations"}
                  </p>
                </div>
                {on ? <Chip tone="green">On</Chip> : null}
              </div>

              <p className="mt-5 flex-1 text-[14.5px] leading-[1.8] text-muted">
                {module.tagline}.
              </p>

              <button
                type="button"
                aria-pressed={on}
                aria-label={`${module.name} module`}
                onClick={() => onToggle(module.id)}
                className="mt-6 flex items-center self-start rounded-none border border-line px-3.5 py-2.5 transition-colors duration-300 hover:border-brass focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              >
                <Switch on={on} label={on ? "Included" : "Not included"} />
              </button>

              {showNote ? (
                <div className="mt-5 flex items-start gap-3 rounded-none border border-line bg-green-soft px-4 py-3.5">
                  <p
                    role="status"
                    className="flex-1 text-[14px] leading-[1.75] text-green-deep"
                  >
                    {note.text}
                  </p>
                  <button
                    type="button"
                    onClick={onDismissNote}
                    aria-label="Dismiss note"
                    className="rounded-none px-1 leading-none text-green transition-colors duration-300 hover:text-brass-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass"
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
