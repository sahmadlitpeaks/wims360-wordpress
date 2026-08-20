"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { MODULES, type ModuleId } from "@/content/modules";

/** Dr.T has its own page; everything else deep-links into the platform page. */
const LEARN_MORE: Record<ModuleId, string> = {
  assessments: "/platform#assessments",
  labs: "/platform#labs",
  ai: "/ai",
  bookings: "/platform#bookings",
  crm: "/platform#crm",
  portal: "/platform#portal",
};

export type ModuleShowcaseProps = {
  /**
   * Product mocks keyed by module. Passed in from the server page so the mocks
   * stay server components instead of being pulled into the client bundle.
   */
  panels: Record<ModuleId, ReactNode>;
};

/** The one interactive component on the homepage. */
export function ModuleShowcase({ panels }: ModuleShowcaseProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const next = (index + MODULES.length) % MODULES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(MODULES.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <Section
      id="modules"
      eyebrow="The platform"
      title={
        <>
          Six modules, <span className="font-serif italic">one</span> record
          underneath.
        </>
      }
      intro="Clinical on one side, operations on the other. Switch on what your clinic needs — every module writes to the same client, the same calendar and the same audit log."
    >
      <div
        role="tablist"
        aria-label="WIMS 360 modules"
        aria-orientation="horizontal"
        className="flex flex-wrap gap-2"
      >
        {MODULES.map((module, index) => {
          const selected = index === active;
          return (
            <button
              key={module.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`module-tab-${module.id}`}
              aria-controls={`module-panel-${module.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-sm font-medium leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                selected
                  ? "border-green-deep bg-green-deep text-white"
                  : "border-line bg-surface text-muted hover:border-green hover:text-green",
              )}
            >
              {module.name}
            </button>
          );
        })}
      </div>

      {MODULES.map((module, index) => (
        <div
          key={module.id}
          role="tabpanel"
          id={`module-panel-${module.id}`}
          aria-labelledby={`module-tab-${module.id}`}
          tabIndex={0}
          hidden={index !== active}
          className="mt-8 rounded-xl border border-line bg-surface p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green md:p-8"
        >
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-12">
            <div>
              <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green">
                {module.half === "clinical" ? "Clinical" : "Operations"}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-ink">
                {module.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink">
                {module.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {module.description}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {module.bullets.slice(0, 3).map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Button href={LEARN_MORE[module.id]} variant="ghost">
                  Learn more
                </Button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[420px] lg:mx-0">
              {panels[module.id]}
            </div>
          </div>
        </div>
      ))}
    </Section>
  );
}

export default ModuleShowcase;
