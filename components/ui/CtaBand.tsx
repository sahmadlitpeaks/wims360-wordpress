import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

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
  className?: string;
};

export const DEFAULT_CTA_TITLE: ReactNode = (
  <>
    See WIMS 360 with your <span className="font-serif italic">own</span>{" "}
    workflow.
  </>
);

export const DEFAULT_CTA_BODY =
  "A 20-minute live walkthrough. Bring your lab vendor list, your current booking flow, and one real patient scenario — we'll show it running in WIMS.";

export const DEFAULT_CTA_PRIMARY: CtaLink = {
  label: "Book a demo",
  href: "/contact",
};

export const DEFAULT_CTA_SECONDARY: CtaLink = {
  label: "View packages",
  href: "/packages",
};

const ON_DARK_BASE =
  "inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-deep";

/**
 * Deep-green closing panel used at the end of every page. Ships the default
 * demo copy, so pages can drop it in with zero props.
 */
export function CtaBand({
  title = DEFAULT_CTA_TITLE,
  body = DEFAULT_CTA_BODY,
  primary = DEFAULT_CTA_PRIMARY,
  secondary = DEFAULT_CTA_SECONDARY,
  className,
}: CtaBandProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container-site">
        <div className="rounded-xl bg-green-deep px-7 py-12 text-white md:px-14 md:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl">
              {title}
            </h2>
            {body ? (
              <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
                {body}
              </p>
            ) : null}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            {primary ? (
              <Link
                href={primary.href}
                className={cn(
                  ON_DARK_BASE,
                  "bg-white text-green-deep hover:bg-green-soft",
                )}
              >
                {primary.label}
              </Link>
            ) : null}
            {secondary ? (
              <Link
                href={secondary.href}
                className={cn(
                  ON_DARK_BASE,
                  "border border-white/30 text-white hover:border-white hover:bg-white/10",
                )}
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBand;
