"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  orgTypeLabel,
  practitionerBandLabel,
  siteBandLabel,
} from "@/components/builder/StepOrg";
import { MODULES } from "@/content/modules";
import { PACKAGES } from "@/content/packages";
import {
  CUSTOMIZATIONS,
  recommendedPackage,
  type BuilderState,
} from "@/lib/builder";

function plural(count: number, singular: string): string {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

function moduleNames(state: BuilderState): string[] {
  return state.modules
    .map((id) => MODULES.find((module) => module.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}

function customizationLabels(state: BuilderState): string[] {
  return state.customizations
    .map((id) => CUSTOMIZATIONS.find((item) => item.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}

function ChipList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="mt-2 text-[13.5px] leading-[1.7] text-muted">Nothing yet</p>;
  }

  return (
    <ul className="mt-2.5 flex list-none flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-none border border-line bg-green-soft px-2.5 py-1 text-[12px] leading-5 text-green-deep"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function RailBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-brass-deep">
        {label}
      </p>
      {children}
    </div>
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 2400);

    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    setFailed(false);

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setFailed(true);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={copy}
        className="w-full rounded-none border border-line bg-surface px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-brass hover:text-green focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
      >
        {copied ? "Link copied" : "Copy shareable link"}
      </button>
      <p className="mt-3 text-[12px] leading-[1.7] text-muted">
        {failed
          ? "Couldn't copy automatically — copy the address bar instead."
          : "The address bar carries your whole configuration. Share it with a colleague and they open exactly this."}
      </p>
    </div>
  );
}

function RailContents({
  state,
  startPackageName,
}: {
  state: BuilderState;
  startPackageName: string | null;
}) {
  const orgComplete = Boolean(
    state.org.type && state.org.sites && state.org.practitioners,
  );
  const suggested = orgComplete
    ? PACKAGES.find((pkg) => pkg.id === recommendedPackage(state.org))
    : undefined;

  const orgBits = [
    orgTypeLabel(state.org.type),
    siteBandLabel(state.org.sites),
    practitionerBandLabel(state.org.practitioners),
  ].filter((bit): bit is string => Boolean(bit));

  return (
    <div className="flex flex-col gap-5">
      <RailBlock label="Starting from">
        <p className="mt-1.5 text-sm leading-relaxed text-ink">
          {startPackageName ?? "A custom selection"}
        </p>
        {suggested ? (
          <p className="mt-1.5 text-[12px] leading-[1.7] text-muted">
            Suggested for your shape of clinic: {suggested.name}
          </p>
        ) : null}
      </RailBlock>

      <RailBlock label="Your organization">
        {orgBits.length > 0 ? (
          <p className="mt-2 text-[14.5px] leading-[1.7] text-ink">
            {orgBits.join(" · ")}
          </p>
        ) : (
          <p className="mt-2 text-[14.5px] leading-[1.7] text-muted">
            Not answered yet
          </p>
        )}
      </RailBlock>

      <RailBlock label={plural(state.modules.length, "module")}>
        <ChipList items={moduleNames(state)} />
      </RailBlock>

      <RailBlock label={plural(state.integrations.length, "integration")}>
        <ChipList items={state.integrations} />
      </RailBlock>

      <RailBlock label={plural(state.customizations.length, "customization")}>
        <ChipList items={customizationLabels(state)} />
      </RailBlock>

      <CopyLinkButton />
    </div>
  );
}

export type SummaryRailProps = {
  state: BuilderState;
  /** Name of the package the wizard was seeded from, when it was seeded from one. */
  startPackageName: string | null;
};

/**
 * The running configuration. A sticky rail beside the wizard on large
 * screens; a fixed bottom bar with an expanding sheet on small ones.
 */
export function SummaryRail({ state, startPackageName }: SummaryRailProps) {
  const [open, setOpen] = useState(false);

  const counts = `${plural(state.modules.length, "module")} · ${plural(
    state.integrations.length,
    "integration",
  )}`;

  return (
    <>
      <aside
        aria-label="Your configuration"
        className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
      >
        <div className="rounded-none border border-line bg-surface p-7">
          <p className="font-display text-[24px] font-normal leading-[1.15] text-ink">
            Your configuration
          </p>
          <div className="mt-6">
            <RailContents state={state} startPackageName={startPackageName} />
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div
          id="builder-summary-sheet"
          hidden={!open}
          className="max-h-[60vh] overflow-y-auto border-t border-line bg-surface px-6 py-6"
        >
          <RailContents state={state} startPackageName={startPackageName} />
        </div>

        <div className="border-t border-line bg-surface px-6 py-3">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="builder-summary-sheet"
            onClick={() => setOpen((value) => !value)}
            className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-brass-deep">
                Your configuration
              </span>
              <span className="block truncate text-sm text-ink">{counts}</span>
            </span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-green">
              {open ? "Hide" : "Show"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default SummaryRail;
