import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Background treatment for a section band. */
export type SectionGround = "bg" | "surface" | "dark";

export type SectionProps = {
  id?: string;
  eyebrow?: string;
  /** ReactNode so pages can embed the italic serif accent word. */
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  /** Ground colour. Light grounds get a hairline top rule. */
  ground?: SectionGround;
  /** Extra classes on the `<section>` element. */
  className?: string;
  /** Extra classes on the inner `.container-site` wrapper. */
  containerClassName?: string;
  /** Extra classes on the heading block (e.g. `text-center mx-auto`). */
  headerClassName?: string;
  /** Overrides the default top margin on the content block below the header. */
  contentClassName?: string;
  /** Fades the header block in on scroll, as the artboards do. */
  revealHeader?: boolean;
};

const GROUNDS: Record<SectionGround, string> = {
  bg: "border-t border-line bg-bg",
  surface: "border-t border-line bg-surface",
  dark: "bg-green-deep text-cream",
};

/**
 * Standard page section: container, Estate vertical rhythm and an optional
 * eyebrow / headline / intro block above the children.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  ground,
  className,
  containerClassName,
  headerClassName,
  contentClassName,
  revealHeader = false,
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || intro);
  const dark = ground === "dark";
  const HeaderTag = revealHeader ? Reveal : "div";

  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-[140px]",
        ground && GROUNDS[ground],
        className,
      )}
    >
      <div className={cn("container-site", containerClassName)}>
        {hasHeader ? (
          <HeaderTag className={cn("max-w-2xl", headerClassName)}>
            {eyebrow ? (
              <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>
            ) : null}
            {title ? (
              <h2
                className={cn(
                  "font-display text-[clamp(2.2rem,4.2vw,3.75rem)] font-normal leading-[1.06] tracking-[-0.012em] [text-wrap:pretty]",
                  dark ? "text-paper" : "text-ink",
                  eyebrow && "mt-7",
                )}
              >
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p
                className={cn(
                  "mt-7 text-[17px] leading-[1.8] md:text-lg md:leading-[1.75]",
                  dark ? "text-[rgba(242,239,230,.7)]" : "text-muted",
                )}
              >
                {intro}
              </p>
            ) : null}
          </HeaderTag>
        ) : null}

        {children ? (
          <div
            className={cn(
              hasHeader && (contentClassName ?? "mt-12 md:mt-16"),
              !hasHeader && contentClassName,
            )}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Section;
