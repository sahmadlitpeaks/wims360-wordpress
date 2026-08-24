import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export type CtaLink = {
  label: string;
  href: string;
};

export type CtaBandProps = {
  /** ReactNode so callers can embed the italic serif accent word. */
  title?: ReactNode;
  body?: ReactNode;
  primary?: CtaLink;
  /** Pass `null` to render a single call to action. */
  secondary?: CtaLink | null;
  /** Optional third link, used by the homepage's closing band. */
  tertiary?: CtaLink | null;
  /** Ground the band sits on, so it alternates with the section above it. */
  ground?: "bg" | "surface";
  className?: string;
};

const GROUNDS: Record<NonNullable<CtaBandProps["ground"]>, string> = {
  bg: "bg-bg",
  surface: "border-t border-line bg-surface",
};

export const DEFAULT_CTA_TITLE: ReactNode = (
  <>
    See WIMS 360 with your <em className="italic text-green">own</em> workflow.
  </>
);

export const DEFAULT_CTA_BODY =
  "A live walkthrough against your own way of working. Bring your current workflow, your clinical services and the way you manage clients today — we'll show you how WIMS 360 can connect the journey.";

export const DEFAULT_CTA_PRIMARY: CtaLink = {
  label: "Book a demo",
  href: "/contact",
};

export const DEFAULT_CTA_SECONDARY: CtaLink = {
  label: "View packages",
  href: "/packages",
};

/**
 * The closing "Next step" band from the Estate artboards: a light section with
 * a hairline top rule, the serif headline left and the copy plus CTAs right.
 * Ships the default demo copy, so pages can drop it in with zero props.
 */
export function CtaBand({
  title = DEFAULT_CTA_TITLE,
  body = DEFAULT_CTA_BODY,
  primary = DEFAULT_CTA_PRIMARY,
  secondary = DEFAULT_CTA_SECONDARY,
  tertiary = null,
  ground = "bg",
  className,
}: CtaBandProps) {
  return (
    <section className={cn("py-24 md:py-[150px]", GROUNDS[ground], className)}>
      <div className="container-site">
        <Reveal className="grid grid-cols-1 items-end gap-12 border-t border-line pt-12 md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-20">
          <div>
            <Eyebrow>Next step</Eyebrow>
            <h2 className="mt-7 font-display text-[clamp(2.6rem,6vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.015em] text-ink [text-wrap:pretty]">
              {title}
            </h2>
          </div>

          <div>
            {body ? (
              <p className="text-[17px] leading-[1.8] text-muted">{body}</p>
            ) : null}

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {primary ? (
                <Button href={primary.href} variant="dark" size="lg">
                  {primary.label}
                </Button>
              ) : null}
              {secondary ? (
                <Button href={secondary.href} variant="outline" size="lg">
                  {secondary.label}
                </Button>
              ) : null}
              {tertiary ? (
                <Button href={tertiary.href} variant="ghost">
                  {tertiary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CtaBand;
