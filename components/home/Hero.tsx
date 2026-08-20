import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { DashboardMock } from "@/components/mocks/DashboardMock";

const COMPLIANCE_CHIPS = [
  "HIPAA-aligned audit logging",
  "GDPR-ready",
  "2FA on PHI access",
];

/**
 * Opening statement of the site: the positioning line, the two calls to action
 * and the live clinician dashboard. One of the two "wow" moments on the page,
 * so it gets the widest mock and the most air.
 */
export function Hero() {
  return (
    <section className="border-b border-line pb-16 pt-12 md:pb-24 md:pt-16">
      <div className="container-site">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] leading-5 text-muted">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green motion-safe:animate-pulse"
              />
              In production across 14 clinical roles
            </p>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              The operating system for{" "}
              <span className="font-serif italic">integrative</span> wellness
              clinics.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              WIMS 360 unifies assessments, bookings, wearables, labs, genomics,
              and consent-gated AI into one clinical record — so your team
              spends time on care, not on stitching systems together.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                Book a demo
              </Button>
              <Button href="/packages" variant="outline" size="lg">
                View packages
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-2.5">
              {COMPLIANCE_CHIPS.map((label) => (
                <li key={label}>
                  <Chip tone="neutral">{label}</Chip>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
            <DashboardMock />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
