import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

const COMPLIANCE_NOTES = [
  "HIPAA-aligned audit logging",
  "GDPR-ready",
  "2FA on PHI access",
];

/**
 * Opening statement of the site: the green-deep ground with its radial wash,
 * the positioning line in Instrument Serif, the two calls to action, and the
 * clinic portrait bleeding off the right edge behind a left-falling gradient.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-green-deep text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 12% 0%,rgba(14,107,78,.38),transparent 62%)",
        }}
      />

      <div className="container-site relative">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-[72px]">
          <div className="pt-20 md:pt-[120px] lg:pb-[128px]">
            <Reveal className="flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="el-pulse inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-brass"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[rgba(242,239,230,.6)]">
                In production across 14 clinical roles
              </span>
            </Reveal>

            <Reveal as="h1" delay={90} className="mt-9 block">
              <span className="block font-display text-[clamp(2.75rem,6.6vw,82px)] font-normal leading-[1.0] tracking-[-0.015em] text-paper [text-wrap:pretty]">
                The operating system for{" "}
                <em className="italic text-brass">integrative</em> wellness
                clinics.
              </span>
            </Reveal>

            <Reveal
              delay={180}
              className="mt-11 flex max-w-[640px] items-start gap-7"
            >
              <span
                aria-hidden="true"
                className="el-rule mt-3.5 block h-px w-14 shrink-0 bg-[rgba(176,132,68,.7)]"
              />
              <p className="text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
                WIMS 360 unifies assessments, bookings, wearables, labs,
                genomics, and consent-gated AI into one clinical record — so
                your team spends time on care, not on stitching systems
                together.
              </p>
            </Reveal>

            <Reveal
              delay={270}
              className="mt-[52px] flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Button href="/contact" variant="primary" size="lg" onDark>
                Book a demo
              </Button>
              <Button href="/packages" variant="outlineLight" size="lg" onDark>
                View packages
              </Button>
            </Reveal>

            <Reveal
              as="ul"
              delay={360}
              className="mt-16 flex list-none flex-wrap gap-x-8 gap-y-3 border-t border-[rgba(242,239,230,.12)] pt-8"
            >
              {COMPLIANCE_NOTES.map((note) => (
                <li
                  key={note}
                  className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(242,239,230,.5)]"
                >
                  {note}
                </li>
              ))}
            </Reveal>
          </div>

          <div className="relative self-center pb-16 lg:h-[720px] lg:pb-0">
            <div className="relative h-[300px] sm:h-[380px] lg:absolute lg:inset-y-0 lg:left-0 lg:-right-10 lg:h-auto">
              <ImageSlot
                caption="Clinic portrait — practitioner with client, natural light"
                overlay="left"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
