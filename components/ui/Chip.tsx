import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ChipTone = "green" | "neutral" | "amber";

export type ChipProps = {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
};

const TONES: Record<ChipTone, string> = {
  green: "bg-green-soft text-green-deep",
  neutral: "border border-line bg-surface text-muted",
  amber:
    "bg-[color-mix(in_srgb,var(--amber)_12%,var(--surface))] text-amber",
};

/** Small pill label used for tags, statuses and "+N more" affordances. */
export function Chip({ children, tone = "neutral", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em]",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Chip;
