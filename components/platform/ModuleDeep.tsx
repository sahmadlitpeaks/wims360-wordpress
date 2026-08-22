import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import type { Module } from "@/content/modules";

/** Which half of the platform the module belongs to, as the artboard labels it. */
const HALF_LABEL: Record<Module["half"], string> = {
  clinical: "Clinical",
  operations: "Operations",
};

export type ModuleDeepProps = {
  module: Module;
  /** e.g. "Included in Clinical and Precision" — composed by the page from content. */
  included: string;
  /** Optional trailing block under the included line (the Dr.T AI ghost link). */
  footer?: ReactNode;
  /** Section ground — the page alternates `bg-surface` and the page `bg`. */
  className?: string;
};

/**
 * One deep-dive section per module: the half eyebrow, name, tagline and
 * description on the left, and every bullet as a numbered hairline row on the
 * right. The `id` is the anchor target linked from the homepage module
 * showcase and the solutions pages, so it carries `scroll-mt-24` to clear the
 * 76px sticky header.
 */
export function ModuleDeep({
  module,
  included,
  footer,
  className,
}: ModuleDeepProps) {
  return (
    <section
      id={module.id}
      aria-labelledby={`${module.id}-title`}
      className={cn(
        "scroll-mt-24 border-t border-line py-24 md:py-[140px]",
        className,
      )}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
              {HALF_LABEL[module.half]}
            </p>
            <h2
              id={`${module.id}-title`}
              className="mt-6 font-display text-[clamp(2.1rem,4.4vw,52px)] font-normal leading-[1.04] tracking-[-0.012em] text-ink [text-wrap:pretty]"
            >
              {module.name}
            </h2>
            <p className="mt-6 font-display text-[clamp(1.35rem,2.4vw,26px)] leading-[1.4] text-green">
              {module.tagline}
            </p>
            <p className="mt-[26px] text-base leading-[1.85] text-muted">
              {module.description}
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.2em] text-muted">
              {included}
            </p>

            {footer ? <div className="mt-8">{footer}</div> : null}
          </Reveal>

          <Reveal as="ul" delay={90} className="list-none border-t border-line">
            {module.bullets.map((bullet, index) => (
              <li
                key={bullet}
                className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 border-b border-line py-[22px] sm:grid-cols-[36px_minmax(0,1fr)]"
              >
                <span className="pt-[5px] font-mono text-[10px] tracking-[0.14em] text-brass">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-[1.8] text-muted">
                  {bullet}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ModuleDeep;
