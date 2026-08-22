"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { MODULES, type ModuleId } from "@/content/modules";

/**
 * Short tab labels so the six tabs sit on one hairline row. The panel heading
 * still carries the module's full name.
 */
const TAB_LABEL: Record<ModuleId, string> = {
  assessments: "Assessments (Chex)",
  labs: "Labs & Genomics",
  ai: "Dr.T AI",
  bookings: "Bookings",
  crm: "CRM & Growth",
  portal: "Client Portal",
};

/** Dr.T has its own page; everything else deep-links into the platform page. */
const LEARN_MORE: Record<ModuleId, string> = {
  assessments: "/platform#assessments",
  labs: "/platform#labs",
  ai: "/ai",
  bookings: "/platform#bookings",
  crm: "/platform#crm",
  portal: "/platform#portal",
};

/** The one interactive component on the homepage. */
export function ModuleShowcase() {
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
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[860px]"
      contentClassName="mt-12 md:mt-16"
      eyebrow="The platform"
      title={
        <>
          Six modules, <em className="italic text-green">one</em> record
          underneath.
        </>
      }
      intro="Clinical on one side, operations on the other. Switch on what your clinic needs — every module writes to the same client, the same calendar and the same audit log."
    >
      <div
        role="tablist"
        aria-label="WIMS 360 modules"
        aria-orientation="horizontal"
        className="flex flex-wrap border-y border-line"
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
                "border-r border-line px-4 py-4 text-left font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-brass sm:px-[26px] sm:py-[22px]",
                selected
                  ? "bg-green-deep text-paper"
                  : "bg-transparent text-muted hover:text-green",
              )}
            >
              {TAB_LABEL[module.id]}
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
          className="mt-12 focus-visible:outline-none md:mt-16"
        >
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                {module.half === "clinical" ? "Clinical" : "Operations"}
              </p>
              <h3 className="mt-5 font-display text-[clamp(2rem,3.4vw,44px)] font-normal leading-[1.08] text-ink [text-wrap:pretty]">
                {module.name}
              </h3>
              <p className="mt-5 font-display text-[clamp(1.25rem,2vw,24px)] leading-[1.45] text-green">
                {module.tagline}
              </p>
              <p className="mt-6 text-base leading-[1.85] text-muted">
                {module.description}
              </p>

              <div className="mt-9">
                <Button href={LEARN_MORE[module.id]} variant="ghost">
                  Learn more
                </Button>
              </div>
            </div>

            <ul className="list-none border-t border-line">
              {module.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bullet}
                  className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 border-b border-line py-[22px] sm:grid-cols-[36px_minmax(0,1fr)]"
                >
                  <span className="pt-[5px] font-mono text-[10px] tracking-[0.14em] text-brass">
                    {String(bulletIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.8] text-muted">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </Section>
  );
}

export default ModuleShowcase;
