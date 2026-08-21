import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import { PACKAGES, type PackageId } from "@/content/packages";
import { MODULES } from "@/content/modules";
import { cn } from "@/lib/cn";

/** The package we point most clinics at first. */
const POPULAR_ID: PackageId = "clinical";

function Tick() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      className="mt-1 h-3 w-3 shrink-0"
    >
      <path
        d="M2 6.4 4.6 9 10 3.2"
        fill="none"
        stroke="var(--green)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function moduleNames(ids: readonly string[]): string[] {
  return MODULES.filter((module) => ids.includes(module.id)).map(
    (module) => module.name,
  );
}

/**
 * The three shipped packages plus a dashed "Custom" card. Every card carries
 * its own pair of calls to action so a visitor can either start a conversation
 * or open the configurator pre-seeded with that package.
 */
export function PackageCards() {
  return (
    <Section
      id="packages"
      eyebrow="The three packages"
      title={
        <>
          Three shapes of clinic,{" "}
          <span className="font-serif italic">one</span> record underneath.
        </>
      }
      intro="Each package is a set of modules switched on over the same platform base — the same client record, the same audit log, the same compliance layer. Move up a package and nothing migrates; the modules simply light up."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PACKAGES.map((pkg) => {
          const popular = pkg.id === POPULAR_ID;

          return (
            <Card
              key={pkg.id}
              as="article"
              className={cn(
                "flex flex-col p-6 md:p-6",
                popular && "border-green ring-1 ring-green",
              )}
            >
              <div className="flex min-h-[1.75rem] items-start">
                {popular ? <Chip tone="green">Most popular</Chip> : null}
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                {pkg.name}
              </h3>
              <p className="mt-2 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em] text-green">
                {pkg.audience}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {pkg.summary}
              </p>

              <p className="mt-5 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
                What&apos;s included
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Tick />
                    <span className="text-sm leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-line pt-5 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
                Modules switched on
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                {moduleNames(pkg.moduleIds).join(" · ")}
              </p>

              <div className="mt-auto flex flex-col gap-3 pt-7">
                <Button href={`/contact?package=${pkg.id}`} variant="primary">
                  Talk to us
                </Button>
                <Button href={`/build?start=${pkg.id}`} variant="outline">
                  Customize this package
                </Button>
              </div>
            </Card>
          );
        })}

        <article className="flex flex-col rounded-xl border border-dashed border-[color-mix(in_srgb,var(--green)_45%,transparent)] bg-green-soft p-6">
          <div className="flex min-h-[1.75rem] items-start">
            <Chip tone="neutral">Custom</Chip>
          </div>

          <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-green-deep">
            Build your own
          </h3>
          <p className="mt-2 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em] text-green">
            For clinics that don&apos;t fit a package
          </p>
          <p className="mt-4 text-sm leading-relaxed text-green-deep">
            Pick the modules, the integrations and the customisations your
            clinic actually runs, and send us the configuration. We scope
            against exactly that — nothing you didn&apos;t choose, nothing
            switched on that you never asked for.
          </p>

          <p className="mt-5 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green-deep">
            You choose
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {[
              "Any combination of the six modules",
              "Integrations — wearables, labs, messaging, identity",
              "Custom Chex forms and branded report templates",
              "Role scopes and multi-center structure",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <Tick />
                <span className="text-sm leading-relaxed text-green-deep">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <Button href="/build" variant="primary" className="w-full">
              Open the configurator
            </Button>
          </div>
        </article>
      </div>
    </Section>
  );
}

export default PackageCards;
