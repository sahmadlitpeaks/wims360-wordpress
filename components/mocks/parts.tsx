import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared pieces for the product mocks. Every mock is a prop-less server
 * component rendering a fixed scene — never a live data view — and every one
 * of them names a SERVICE rather than a supplier. Device ecosystems the client
 * owns (Apple Health, Samsung Health, Fitbit) may appear; nothing else may.
 */

/** The mono micro-label used for every field name inside a mock. */
export const MOCK_LABEL =
  "font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted";

const FRAME_SHADOW =
  "shadow-[0_40px_80px_-32px_rgba(20,30,26,.28),0_8px_20px_-10px_rgba(20,30,26,.12)]";

export type MockFrameProps = {
  /** Spoken description of the whole scene for assistive technology. */
  label: string;
  children: ReactNode;
  className?: string;
};

/** Sharp-cornered hairline card that every mock sits inside. */
export function MockFrame({ label, children, className }: MockFrameProps) {
  return (
    <figure
      aria-label={label}
      className={cn(
        "relative m-0 border border-line bg-surface",
        FRAME_SHADOW,
        className,
      )}
    >
      {children}
    </figure>
  );
}

/** The one client used across the whole site. */
export function ClientBadge({ note }: { note: string }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-deep font-mono text-[10px] text-cream"
      >
        SL
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-[17px] leading-[1.2] text-ink">
          Sarah L.
        </span>
        <span className={cn("block truncate", MOCK_LABEL)}>{note}</span>
      </span>
    </span>
  );
}

/** Pulsing dot plus a mono word, for "live" and "connected" states. */
export function StatusDot({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-[7px]">
      <span
        aria-hidden="true"
        className="el-pulse inline-block h-[5px] w-[5px] rounded-full bg-green"
      />
      <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-green">
        {children}
      </span>
    </span>
  );
}

export type ReviewFooterProps = {
  /** Mono label, e.g. "Dr.T Copilot · draft for review". */
  kicker: string;
  children: ReactNode;
  /** Approve / edit affordances. Omitted where the footer is only a note. */
  actions?: boolean;
  /** Extra line under the actions, e.g. the consent note. */
  note?: string;
};

/**
 * The green-deep footer that carries the platform's AI posture: a draft, the
 * practitioner who has to approve it, and the consent it depends on.
 */
export function ReviewFooter({
  kicker,
  children,
  actions = true,
  note,
}: ReviewFooterProps) {
  return (
    <figcaption className="border-t border-line bg-green-deep p-[22px]">
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block h-1 w-1 shrink-0 rounded-full bg-brass"
        />
        <span className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-brass">
          {kicker}
        </span>
      </span>
      <p className="mt-3 font-display text-[19px] leading-[1.45] text-cream">
        {children}
      </p>
      {actions ? (
        <span className="mt-[18px] flex flex-wrap gap-2.5">
          <span className="border border-brass bg-brass px-[18px] py-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-green-deep">
            Approve
          </span>
          <span className="border border-[rgba(242,239,230,.28)] px-[18px] py-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-[rgba(242,239,230,.8)]">
            Edit draft
          </span>
        </span>
      ) : null}
      {note ? (
        <p className="mt-4 font-mono text-[11.5px] uppercase leading-[1.8] tracking-[0.14em] text-[rgba(242,239,230,.5)]">
          {note}
        </p>
      ) : null}
    </figcaption>
  );
}

/**
 * A cited source inside a Dr.T draft. The pattern is the point: every claim
 * names where it came from — the service, never the supplier.
 */
export function Citation({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-[rgba(242,239,230,.24)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[rgba(242,239,230,.68)]">
      {children}
    </span>
  );
}
