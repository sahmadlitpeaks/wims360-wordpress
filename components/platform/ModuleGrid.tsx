import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { Module } from "@/content/modules";

export type ModuleGridProps = {
  modules: Module[];
  /** Dark grounds get cream type and brass hairlines. */
  tone?: "light" | "dark";
  /**
   * Module ids that must NOT become anchors here, because a section elsewhere
   * on the page already owns that id (e.g. `integrations`).
   */
  omitAnchors?: readonly string[];
  className?: string;
};

/**
 * The editorial hairline grid used for every module on the platform page.
 * Each cell carries its own border and overlaps its neighbour by a pixel, so
 * shared edges collapse to a single hairline and a ragged final row leaves
 * clean ground beside it — which a `gap-px` background grid would fill with an
 * empty coloured cell.
 *
 * Every card is an anchor target (`#<module id>`), so the solutions pages and
 * the homepage can link straight to a named module.
 */
export function ModuleGrid({
  modules,
  tone = "light",
  omitAnchors,
  className,
}: ModuleGridProps) {
  const dark = tone === "dark";

  return (
    <ul
      className={cn(
        "grid list-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {modules.map((module, index) => (
        <li
          key={module.id}
          id={omitAnchors?.includes(module.id) ? undefined : module.id}
          className={cn(
            "-mb-px -mr-px scroll-mt-24 border",
            dark ? "border-[rgba(176,132,68,.28)]" : "border-line",
          )}
        >
          <Reveal
            delay={Math.min(index % 3, 4) * 90}
            className="flex h-full flex-col p-7 md:p-8"
          >
            <h3
              className={cn(
                "font-display text-[23px] font-normal leading-[1.2]",
                dark ? "text-paper" : "text-ink",
              )}
            >
              {module.name}
            </h3>
            <p
              className={cn(
                "mt-3 font-display text-[16.5px] leading-[1.45]",
                dark ? "text-brass" : "text-green",
              )}
            >
              {module.tagline}
            </p>
            <p
              className={cn(
                "mt-4 text-[14px] leading-[1.8]",
                dark ? "text-[rgba(242,239,230,.66)]" : "text-muted",
              )}
            >
              {module.description}
            </p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export default ModuleGrid;
