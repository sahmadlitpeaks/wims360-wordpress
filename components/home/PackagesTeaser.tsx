import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { PACKAGES } from "@/content/packages";

const PREVIEW_COUNT = 4;

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

export function PackagesTeaser() {
  return (
    <Section
      eyebrow="Packages"
      title={
        <>
          Start where your clinic{" "}
          <span className="font-serif italic">actually</span> is.
        </>
      }
      intro="Three shipped packages, or a configuration of your own. Every package sits on the same record and the same compliance layer — the difference is which modules are switched on."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PACKAGES.map((pkg) => (
          <Card key={pkg.id} as="article" className="flex flex-col p-6 md:p-6">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
              {pkg.name}
            </h3>
            <p className="mt-2 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em] text-green">
              {pkg.audience}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {pkg.summary}
            </p>

            <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
              {pkg.includes.slice(0, PREVIEW_COUNT).map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Tick />
                  <span className="text-sm leading-relaxed text-muted">
                    {item}
                  </span>
                </li>
              ))}
              <li className="pl-[1.375rem] text-sm leading-relaxed text-muted">
                and {pkg.includes.length - PREVIEW_COUNT} more
              </li>
            </ul>

            <div className="mt-auto pt-6">
              <Button href="/packages" variant="ghost">
                See what&apos;s included
              </Button>
            </div>
          </Card>
        ))}

        <article className="flex flex-col rounded-xl border border-dashed border-[color-mix(in_srgb,var(--green)_40%,transparent)] bg-green-soft p-6">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-green-deep">
            Build your own
          </h3>
          <p className="mt-2 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em] text-green">
            For clinics that don&apos;t fit a tier
          </p>
          <p className="mt-4 text-sm leading-relaxed text-green-deep">
            Pick the modules, the integrations and the roles your clinic
            actually runs, and the configurator assembles the scope as you go.
            Send it to us and we quote against exactly that — nothing you
            didn&apos;t choose.
          </p>
          <div className="mt-auto pt-6">
            <Button href="/build" variant="ghost">
              Open the configurator
            </Button>
          </div>
        </article>
      </div>
    </Section>
  );
}

export default PackagesTeaser;
