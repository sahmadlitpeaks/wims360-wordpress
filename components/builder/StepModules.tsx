"use client";

import { useState } from "react";
import { BASELINE_MODULES, type Module, type ModuleId } from "@/content/modules";
import { PACKAGES, type PackageId } from "@/content/packages";
import { builderGroups, type BuilderGroup } from "@/lib/builder";
import { cn } from "@/lib/cn";

const GROUPS: BuilderGroup[] = builderGroups();

/**
 * The tier a module normally arrives with, shown as a subtle hint so a
 * practice can see where a capability usually sits without leaving the step.
 */
const TIER_HINT: Record<PackageId, string> = {
  essentials: "In every package",
  clinical: "From Clinical",
  precision: "Precision",
};

function tierHint(module: Module): string | null {
  const entry = PACKAGES.find((pkg) => module.includedIn.includes(pkg.id));

  return entry ? TIER_HINT[entry.id] : null;
}

export type ModuleNote = {
  moduleId: ModuleId;
  text: string;
};

function Switch({ on }: { on: boolean }) {
  return (
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
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "h-3 w-3 shrink-0 text-brass transition-transform duration-300",
        open && "rotate-180",
      )}
    >
      <path
        d="M2.5 4.25 6 7.75l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type StepModulesProps = {
  selected: ModuleId[];
  note: ModuleNote | null;
  onToggle: (id: ModuleId) => void;
  onDismissNote: () => void;
  /** Switches every module in one pillar on, or clears the pillar. */
  onSetGroup: (ids: ModuleId[], enabled: boolean) => void;
};

/**
 * Step 2. The 33 selectable modules, grouped by pillar and collapsible so the
 * catalog reads as five short sections rather than one wall of switches. A
 * group opens by default when the seeded package already includes something
 * from it. When a toggle cascades — Dr.T AI needs Assessment Forms, and
 * dropping Assessment Forms drops Dr.T AI — the explanation appears inline on
 * the row that was toggled.
 */
export function StepModules({
  selected,
  note,
  onToggle,
  onDismissNote,
  onSetGroup,
}: StepModulesProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      GROUPS.map((group) => [
        group.id,
        group.modules.some((module) => selected.includes(module.id)),
      ]),
    ),
  );

  const selectedSet = new Set(selected);

  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-[15px] leading-[1.8] text-muted">
        Switch on the capabilities your practice needs today. Everything here
        sits over the same client record, so a module you add later is a
        configuration change rather than a migration.
      </p>

      <div className="rounded-none border border-line bg-green-soft px-6 py-5">
        <p className="font-semibold text-[12px] uppercase tracking-[0.06em] text-brass-deep">
          Included in every package
        </p>
        <ul className="mt-3 flex list-none flex-wrap gap-x-2 gap-y-1.5">
          {BASELINE_MODULES.map((module, index) => (
            <li
              key={module.id}
              className="text-[14px] leading-[1.7] text-green-deep"
            >
              {module.name}
              {index < BASELINE_MODULES.length - 1 ? (
                <span aria-hidden="true" className="pl-2 text-brass">
                  ·
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13.5px] leading-[1.7] text-muted">
          The platform baseline is not optional and is never billed as a module
          you can decline.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {GROUPS.map((group) => {
          const ids = group.modules.map((module) => module.id);
          const count = ids.filter((id) => selectedSet.has(id)).length;
          const allOn = count === ids.length;
          const isOpen = open[group.id] ?? false;
          const panelId = `builder-group-${group.id}`;

          return (
            <section
              key={group.id}
              className={cn(
                "rounded-none border bg-surface transition-colors duration-300",
                count > 0 ? "border-brass" : "border-line",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 px-6 py-5 md:px-7">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpen((current) => ({
                      ...current,
                      [group.id]: !isOpen,
                    }))
                  }
                  className="group flex min-w-0 flex-1 items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                >
                  <span className="mt-1 font-display text-[22px] leading-none text-brass">
                    {group.number}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-[26px] leading-[1.15] text-ink transition-colors duration-300 group-hover:text-green">
                        {group.name}
                      </span>
                      <span className="font-semibold text-[12px] uppercase tracking-[0.06em] text-brass-deep">
                        {count} of {ids.length} on
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-[1.75] text-muted">
                      {group.promise}
                    </span>
                  </span>
                  <Chevron open={isOpen} />
                </button>

                <button
                  type="button"
                  onClick={() => onSetGroup(ids, !allOn)}
                  className="shrink-0 rounded-none border border-line px-3.5 py-2 font-semibold text-[12px] uppercase tracking-[0.06em] text-muted transition-colors duration-300 hover:border-brass hover:text-green focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                >
                  {allOn ? `Clear ${group.name}` : `Select all ${group.name}`}
                </button>
              </div>

              <div id={panelId} hidden={!isOpen}>
                <ul className="list-none border-t border-line">
                  {group.modules.map((module) => {
                    const on = selectedSet.has(module.id);
                    const showNote = note?.moduleId === module.id;
                    const hint = tierHint(module);

                    return (
                      <li
                        key={module.id}
                        className="border-b border-line last:border-b-0"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 px-6 py-5 md:px-7">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <h3 className="font-display text-[21px] font-semibold leading-[1.2] text-ink">
                                {module.name}
                              </h3>
                              {hint ? (
                                <span className="font-semibold text-[12px] uppercase tracking-[0.06em] text-muted">
                                  {hint}
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-2 max-w-[68ch] text-[14px] leading-[1.75] text-muted">
                              {module.tagline}
                            </p>
                          </div>

                          <button
                            type="button"
                            aria-pressed={on}
                            aria-label={`${module.name} module`}
                            onClick={() => onToggle(module.id)}
                            className="flex shrink-0 items-center gap-3 rounded-none border border-line px-3.5 py-2.5 transition-colors duration-300 hover:border-brass focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                          >
                            <Switch on={on} />
                            <span className="font-semibold text-[12px] uppercase tracking-[0.06em] text-muted">
                              {on ? "On" : "Off"}
                            </span>
                          </button>
                        </div>

                        {showNote ? (
                          <div className="mx-6 mb-5 flex items-start gap-3 rounded-none border border-line bg-green-soft px-4 py-3.5 md:mx-7">
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
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default StepModules;
