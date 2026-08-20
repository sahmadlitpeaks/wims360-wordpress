import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

export type SectionProps = {
  id?: string;
  eyebrow?: string;
  /** ReactNode so pages can embed the italic serif accent word. */
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  /** Extra classes on the `<section>` element. */
  className?: string;
  /** Extra classes on the inner `.container-site` wrapper. */
  containerClassName?: string;
  /** Extra classes on the heading block (e.g. `text-center mx-auto`). */
  headerClassName?: string;
};

/**
 * Standard page section: container, vertical rhythm and an optional
 * eyebrow / headline / intro block above the children.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  containerClassName,
  headerClassName,
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || intro);

  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className={cn("container-site", containerClassName)}>
        {hasHeader ? (
          <div className={cn("max-w-2xl", headerClassName)}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {title ? (
              <h2
                className={cn(
                  "font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl",
                  eyebrow && "mt-3",
                )}
              >
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {intro}
              </p>
            ) : null}
          </div>
        ) : null}

        {children ? (
          <div className={cn(hasHeader && "mt-12 md:mt-16")}>{children}</div>
        ) : null}
      </div>
    </section>
  );
}

export default Section;
