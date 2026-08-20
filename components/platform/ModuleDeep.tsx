import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Module } from "@/content/modules";

/** Eyebrow copy for each half of the platform. The `.eyebrow` class uppercases. */
const HALF_LABEL: Record<Module["half"], string> = {
  clinical: "Clinical intelligence",
  operations: "Clinic operations",
};

export type ModuleDeepProps = {
  module: Module;
  /** The product mock for this module, rendered beside the copy. */
  mock: ReactNode;
  /** Puts the mock on the left at `lg`. The page alternates this per section. */
  reversed?: boolean;
  /** Optional trailing block under the bullets (e.g. the Dr.T AI link). */
  footer?: ReactNode;
  /** Section ground — the page alternates `bg-surface` and the page `bg`. */
  className?: string;
};

/**
 * One deep-dive section per module: half eyebrow, name, tagline, description,
 * every bullet, and the mock. The `id` is the anchor target linked from the
 * homepage module showcase and the solutions pages, so it carries
 * `scroll-mt-24` to clear the sticky header.
 *
 * Both columns are top-aligned: several mocks (the Chex catalog especially)
 * are much taller than their copy, and centering would strand the text in the
 * middle of a column of whitespace.
 */
export function ModuleDeep({
  module,
  mock,
  reversed = false,
  footer,
  className,
}: ModuleDeepProps) {
  return (
    <section
      id={module.id}
      aria-labelledby={`${module.id}-title`}
      className={cn("scroll-mt-24 py-20 md:py-28", className)}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={cn(reversed && "lg:order-2")}>
            <Eyebrow>{HALF_LABEL[module.half]}</Eyebrow>
            <h2
              id={`${module.id}-title`}
              className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl"
            >
              {module.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
              {module.tagline}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {module.description}
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {module.bullets.map((bullet) => (
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

            {footer ? <div className="mt-8">{footer}</div> : null}
          </div>

          <div
            className={cn(
              "mx-auto w-full max-w-[460px] lg:mx-0 lg:max-w-none",
              reversed && "lg:order-1",
            )}
          >
            {mock}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModuleDeep;
