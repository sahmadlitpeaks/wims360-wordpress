import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared interior primitives for the product mocks.
 *
 * These are deliberately private to `components/mocks/*` — they exist so all
 * eight mocks share one visual language (hairline borders, 11–13px UI text,
 * mono micro-labels, status dots) rather than drifting apart.
 */

export type MockFrameProps = {
  /** Describes the whole scene for assistive tech. */
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Chrome-free product surface: white ground on the warm page, hairline border,
 * clipped corners. Sized to fill its parent card.
 */
export function MockFrame({ label, children, className }: MockFrameProps) {
  return (
    <figure
      aria-label={label}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-line bg-surface text-ink",
        className,
      )}
    >
      {children}
    </figure>
  );
}

export type MockHeaderProps = {
  children: ReactNode;
  className?: string;
};

/** Top strip of a mock: title on the left, status/meta on the right. */
export function MockHeader({ children, className }: MockHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-line px-4 py-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type MonoLabelProps = {
  children: ReactNode;
  tone?: "muted" | "green" | "amber";
  className?: string;
};

const MONO_TONES: Record<NonNullable<MonoLabelProps["tone"]>, string> = {
  muted: "text-muted",
  green: "text-green",
  amber: "text-amber",
};

/** Inline uppercase mono micro-label — the `.eyebrow` idiom at UI scale. */
export function MonoLabel({
  children,
  tone = "muted",
  className,
}: MonoLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-[0.625rem] uppercase leading-4 tracking-[0.14em]",
        MONO_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export type DotProps = {
  tone?: "green" | "amber" | "muted";
  /** Adds the single sanctioned pulse, behind `motion-safe:`. */
  pulse?: boolean;
  className?: string;
};

const DOT_TONES: Record<NonNullable<DotProps["tone"]>, string> = {
  green: "bg-green",
  amber: "bg-amber",
  muted: "bg-[color-mix(in_srgb,var(--ink)_28%,transparent)]",
};

/** 6px status dot used across tiles, ladder rows and device rows. */
export function Dot({ tone = "green", pulse, className }: DotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
        DOT_TONES[tone],
        pulse && "motion-safe:animate-pulse",
        className,
      )}
    />
  );
}

export type MockChipProps = {
  children: ReactNode;
  tone?: "neutral" | "green" | "amber";
  className?: string;
};

const CHIP_TONES: Record<NonNullable<MockChipProps["tone"]>, string> = {
  neutral: "border-line bg-surface text-muted",
  green: "border-[color-mix(in_srgb,var(--green)_22%,transparent)] bg-green-soft text-green-deep",
  amber:
    "border-[color-mix(in_srgb,var(--amber)_26%,transparent)] bg-[color-mix(in_srgb,var(--amber)_10%,var(--surface))] text-amber",
};

/**
 * Sentence-case UI chip. Distinct from `components/ui/Chip`, which is an
 * uppercase mono marketing pill — inside a product mock, real UI casing reads
 * more like software.
 */
export function MockChip({
  children,
  tone = "neutral",
  className,
}: MockChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] leading-4",
        CHIP_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Number styling for any figure in a mock: mono, tabular, tight. */
export const FIGURE_CLASS = "font-mono tabular-nums tracking-tight";
