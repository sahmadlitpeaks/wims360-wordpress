import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ChipTone = "green" | "neutral" | "amber";

export type ChipProps = {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
};

const TONES: Record<ChipTone, string> = {
  green: "border border-[color-mix(in_srgb,var(--green)_30%,transparent)] bg-green-soft text-green-deep",
  neutral: "border border-line bg-surface text-muted",
  amber:
    "border border-[color-mix(in_srgb,var(--brass)_40%,transparent)] bg-[color-mix(in_srgb,var(--brass)_10%,var(--surface))] text-brass-deep",
};

/** Small rectangular label used for tags, statuses and "+N more" affordances. */
export function Chip({ children, tone = "neutral", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-none px-2.5 py-1 font-mono text-[10px] uppercase leading-5 tracking-[0.16em]",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Chip;
