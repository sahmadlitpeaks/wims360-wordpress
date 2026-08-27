import { DashboardMock } from "@/components/mocks/DashboardMock";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const ASSURANCES = [
  "HIPAA-aligned",
  "GDPR-ready",
  "Role-based access",
  "Versioned consent",
];

/**
 * Opening statement of the site: the green-deep ground with its radial wash,
 * the positioning line in Instrument Serif, the two calls to action, and one
 * client record standing beside them.
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
        <div className="grid grid-cols-1 items-center gap-16 pb-20 pt-20 md:pt-[120px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-[72px] lg:pb-[128px]">
          <div>
            <Reveal as="h1" className="block">
              <span className="block font-display text-[clamp(1.95rem,4.4vw,44px)] font-semibold leading-[1.02] tracking-[-0.015em] text-paper [text-wrap:pretty]">
                The complete operating system for{" "}
                <em className="text-mint">longevity</em> &amp; wellness.
              </span>
            </Reveal>

            <Reveal
              delay={180}
              className="mt-9 flex max-w-[640px] items-start gap-7"
            >
              <span className="block">
                <p className="font-display text-[clamp(1.15rem,1.9vw,22px)] leading-[1.35] text-paper [text-wrap:pretty]">
                  Understand the whole person. Personalise the journey. Stay
                  connected.
                </p>
                <p className="mt-6 text-[17px] leading-[1.8] text-[rgba(242,239,230,.7)]">
                  Investigations, healing, live health data and communication in one
              connected platform — so every client has a single, complete story.
                </p>
              </span>
            </Reveal>

            <Reveal
              delay={270}
              className="mt-11 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Button href="/contact" variant="primary" size="lg" onDark>
                Book a demo
              </Button>
              <Button href="/platform" variant="outlineLight" size="lg" onDark>
                Explore WIMS 360
              </Button>
            </Reveal>

            <Reveal
              delay={360}
              className="mt-12 border-t border-[rgba(242,239,230,.12)] pt-8"
            >
              <p className="font-display text-[clamp(1.15rem,2.00vw,24px)] leading-[1.4] text-brass">
                One client. One connected journey. One platform.
              </p>
              <ul className="mt-6 flex list-none flex-wrap gap-x-8 gap-y-3">
                {ASSURANCES.map((note) => (
                  <li
                    key={note}
                    className="font-semibold text-[12px] uppercase tracking-[0.06em] text-[rgba(242,239,230,.5)]"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-5 -top-5 bottom-8 right-8 border border-[rgba(176,132,68,.28)] md:-left-8 md:-top-8 md:bottom-12 md:right-12"
            />
            <DashboardMock />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Hero;
