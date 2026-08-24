"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StepCustomize } from "@/components/builder/StepCustomize";
import { StepIntegrations } from "@/components/builder/StepIntegrations";
import { StepModules, type ModuleNote } from "@/components/builder/StepModules";
import { StepOrg } from "@/components/builder/StepOrg";
import {
  ConfigurationSummary,
  StepReview,
  type ContactDetails,
} from "@/components/builder/StepReview";
import { SummaryRail } from "@/components/builder/SummaryRail";
import {
  STEP_LABELS,
  Stepper,
  type StepNumber,
} from "@/components/builder/Stepper";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ModuleId } from "@/content/modules";
import { PACKAGES, type PackageId } from "@/content/packages";
import {
  decodeState,
  dependencyNote,
  encodeState,
  initialState,
  packageModuleIds,
  sanitizeState,
  toLeadConfiguration,
  toggleModule,
  type BuilderState,
} from "@/lib/builder";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export type BuilderWizardProps = {
  /** Package the visitor arrived from, via `/build?start=<id>`. */
  startPackage?: PackageId;
  /** Raw `?c=` payload from a shared link. */
  encoded: string | null;
};

/**
 * The five-step configurator. Owns `BuilderState`, mirrors it into the URL
 * on every change so the address bar is always shareable, and posts the
 * finished configuration to `/api/lead`.
 */
export function BuilderWizard({ startPackage, encoded }: BuilderWizardProps) {
  const [state, setState] = useState<BuilderState>(() =>
    sanitizeState(decodeState(encoded) ?? initialState(startPackage)),
  );
  const [note, setNote] = useState<ModuleNote | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { submit, status: leadStatus } = useLeadSubmit();
  const submitting = leadStatus === "sending";
  const error =
    leadStatus === "error"
      ? "We couldn't send your configuration just now. Please try again, or email info@wims360.com and we'll pick it up from there."
      : null;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.history.replaceState(null, "", `?c=${encodeState(state)}`);
  }, [state]);

  const startPackageName =
    PACKAGES.find((pkg) => pkg.id === startPackage)?.name ?? null;

  function goTo(step: StepNumber) {
    setNote(null);
    setState((current) => ({ ...current, step }));

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleToggleModule(id: ModuleId) {
    const willBeEnabled = !state.modules.includes(id);
    const text = dependencyNote(id, willBeEnabled);

    setNote(text ? { moduleId: id, text } : null);
    setState((current) => toggleModule(current, id));
  }

  /**
   * Group-level convenience on step 2. Folded through `toggleModule` rather
   * than set directly, so switching a whole pillar on or off still honours
   * the Dr.T AI / Assessment Forms dependency.
   */
  function handleSetGroup(ids: ModuleId[], enabled: boolean) {
    setNote(null);
    setState((current) =>
      ids.reduce(
        (draft, id) =>
          draft.modules.includes(id) === enabled
            ? draft
            : toggleModule(draft, id),
        current,
      ),
    );
  }

  function handleApplyPackage(packageId: PackageId) {
    setState((current) => ({
      ...current,
      modules: packageModuleIds(packageId),
    }));
  }

  async function handleSubmit(contact: ContactDetails) {
    const result = await submit({
      source: "builder",
      contact,
      configuration: toLeadConfiguration(state),
    });

    if (result !== "ok") {
      return;
    }

    setSubmitted(true);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl border-t border-line pt-10 md:pt-12">
        <Eyebrow>Configuration sent</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,52px)] font-normal leading-[1.06] text-ink [text-wrap:pretty]">
          Thank you — this is what we&apos;ll scope against.
        </h2>
        <p className="mt-7 text-[16.5px] leading-[1.85] text-muted">
          Our team reviews your configuration and comes back within one
          business day.
        </p>

        <div className="mt-10 border border-line bg-surface p-8 md:p-10">
          <ConfigurationSummary state={state} />
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href="/contact" variant="dark" size="lg">
            Book a demo now
          </Button>
          <Button href="/packages" variant="outline" size="lg">
            Back to packages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 lg:pb-0">
      <Stepper current={state.step} onGoTo={goTo} />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
            Step {state.step} of 5 — {STEP_LABELS[state.step]}
          </p>

          <div className="mt-8">
            {state.step === 1 ? (
              <StepOrg
                org={state.org}
                onChange={(patch) =>
                  setState((current) => ({
                    ...current,
                    org: { ...current.org, ...patch },
                  }))
                }
                onApplyPackage={handleApplyPackage}
              />
            ) : null}

            {state.step === 2 ? (
              <StepModules
                selected={state.modules}
                note={note}
                onToggle={handleToggleModule}
                onDismissNote={() => setNote(null)}
                onSetGroup={handleSetGroup}
              />
            ) : null}

            {state.step === 3 ? (
              <StepIntegrations
                selected={state.integrations}
                otherSystems={state.otherSystems}
                onToggle={(name) =>
                  setState((current) => ({
                    ...current,
                    integrations: toggleInList(current.integrations, name),
                  }))
                }
                onOtherSystemsChange={(value) =>
                  setState((current) => ({ ...current, otherSystems: value }))
                }
              />
            ) : null}

            {state.step === 4 ? (
              <StepCustomize
                selected={state.customizations}
                notes={state.notes}
                onToggle={(id) =>
                  setState((current) => ({
                    ...current,
                    customizations: toggleInList(current.customizations, id),
                  }))
                }
                onNotesChange={(value) =>
                  setState((current) => ({ ...current, notes: value }))
                }
              />
            ) : null}

            {state.step === 5 ? (
              <StepReview
                state={state}
                submitting={submitting}
                error={error}
                onSubmit={handleSubmit}
              />
            ) : null}
          </div>

          {state.step < 5 ? (
            <div className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-9 sm:flex-row sm:items-center">
              {state.step > 1 ? (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => goTo((state.step - 1) as StepNumber)}
                >
                  Back
                </Button>
              ) : null}
              <Button
                variant="dark"
                size="lg"
                onClick={() => goTo((state.step + 1) as StepNumber)}
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="mt-12 border-t border-line pt-9">
              <Button
                variant="outline"
                size="lg"
                onClick={() => goTo(4)}
                disabled={submitting}
              >
                Back
              </Button>
            </div>
          )}

          <p className="mt-9 text-[14.5px] leading-[1.8] text-muted">
            Not sure?{" "}
            <Link
              href="/contact"
              className="border-b border-line text-green transition-colors duration-300 hover:border-brass hover:text-green-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Book a demo
            </Link>{" "}
            and we&apos;ll configure it together.
          </p>
        </div>

        <SummaryRail state={state} startPackageName={startPackageName} />
      </div>
    </div>
  );
}

export default BuilderWizard;
