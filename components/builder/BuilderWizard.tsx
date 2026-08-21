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
import { INTEGRATIONS } from "@/content/integrations";
import type { ModuleId } from "@/content/modules";
import { PACKAGES, type PackageId } from "@/content/packages";
import {
  CUSTOMIZATIONS,
  decodeState,
  dependencyNote,
  encodeState,
  initialState,
  packageModuleIds,
  toLeadConfiguration,
  toggleModule,
  type BuilderState,
} from "@/lib/builder";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

const SELECTABLE_INTEGRATION_NAMES = new Set(
  INTEGRATIONS.filter((integration) => integration.builderSelectable).map(
    (integration) => integration.name,
  ),
);

const CUSTOMIZATION_IDS = new Set(CUSTOMIZATIONS.map((item) => item.id));

/**
 * Drops entries a shared link may carry that this build no longer knows
 * about — an integration or customization that has since been renamed or
 * removed. `decodeState` validates shape; this validates vocabulary.
 */
function sanitize(state: BuilderState): BuilderState {
  return {
    ...state,
    integrations: state.integrations.filter((name) =>
      SELECTABLE_INTEGRATION_NAMES.has(name),
    ),
    customizations: state.customizations.filter((id) =>
      CUSTOMIZATION_IDS.has(id),
    ),
  };
}

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
    sanitize(decodeState(encoded) ?? initialState(startPackage)),
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
      <div className="mt-10 max-w-2xl md:mt-14">
        <Eyebrow>Configuration sent</Eyebrow>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">
          Thank you — this is what we&apos;ll scope against.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Our team reviews your configuration and comes back within one
          business day.
        </p>

        <div className="mt-8 rounded-xl border border-line bg-surface p-6 md:p-7">
          <ConfigurationSummary state={state} />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/contact" variant="primary" size="lg">
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
    <div className="mt-10 pb-32 md:mt-14 lg:pb-0">
      <Stepper current={state.step} onGoTo={goTo} />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        <div className="min-w-0">
          <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green">
            Step {state.step} of 5 — {STEP_LABELS[state.step]}
          </p>

          <div className="mt-6">
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
            <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center">
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
                variant="primary"
                size="lg"
                onClick={() => goTo((state.step + 1) as StepNumber)}
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="mt-10 border-t border-line pt-8">
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

          <p className="mt-8 text-sm leading-relaxed text-muted">
            Not sure?{" "}
            <Link
              href="/contact"
              className="text-green underline underline-offset-4 transition-colors hover:text-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
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
