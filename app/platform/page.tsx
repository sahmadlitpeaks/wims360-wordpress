import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ModuleGrid } from "@/components/platform/ModuleGrid";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  INTEGRATIONS_CLOSING,
  INTEGRATION_SERVICES,
} from "@/content/integrations";
import {
  BASELINE_MODULES,
  SELECTABLE_MODULES,
  modulesByPillar,
} from "@/content/modules";
import { PILLARS, type PillarId } from "@/content/pillars";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "One client. One connected journey. Investigations, healing, live health data and communication in one platform — with Dr.T intelligence across the journey and a platform baseline of roles, security, documents, reporting, multi-centre and integrations in every package.",
};

/** The four pillar grounds, alternating parchment and white. */
const PILLAR_GROUND: Record<PillarId, "surface" | "bg"> = {
  investigations: "surface",
  healing: "bg",
  live: "surface",
  communication: "bg",
};

/**
 * The approved section headline for each pillar, with the single italic
 * accent word the Estate system allows.
 */
const PILLAR_HEADLINE: Record<PillarId, ReactNode> = {
  investigations: (
    <>
      One place for the information that builds the client&rsquo;s{" "}
      <em className="italic text-green">story</em>.
    </>
  ),
  healing: (
    <>
      From findings to a personalised healing{" "}
      <em className="italic text-green">journey</em>.
    </>
  ),
  live: (
    <>
      See what happens <em className="italic text-green">between</em>{" "}
      appointments.
    </>
  ),
  communication: (
    <>
      Stay connected before, during and after every{" "}
      <em className="italic text-green">appointment</em>.
    </>
  ),
};

/** In-page navigation from the hero — the same anchors the homepage links to. */
const JUMP_LINKS: { href: string; label: string }[] = [
  { href: "#investigations", label: "01 Investigations" },
  { href: "#healing", label: "02 Healing" },
  { href: "#live", label: "03 Live" },
  { href: "#communication", label: "04 Communication" },
  { href: "#intelligence", label: "Intelligence" },
  { href: "#platform-baseline", label: "Baseline" },
  { href: "#integrations", label: "Integrations" },
];

const INTELLIGENCE_MODULES = modulesByPillar("intelligence");

export default function PlatformPage() {
  return (
    <>
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div className="container-site">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.72fr)] lg:gap-20">
            <Reveal>
              <Eyebrow tone="dark">The platform</Eyebrow>
              <h1 className="mt-8 max-w-[18ch] font-display text-[clamp(2.75rem,6.6vw,82px)] font-normal leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
                One client. One connected{" "}
                <em className="italic text-brass">journey</em>.
              </h1>
              <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
                WIMS 360 brings investigations, healing, live health data,
                communication and intelligent AI together in one connected
                platform. From the first client history and clinical assessment
                to laboratory results, genetics, wearable data, personalised
                healing plans and continuous engagement — everything comes
                together around one complete client story.
              </p>
              <p className="mt-7 max-w-[62ch] text-[15.5px] leading-[1.85] text-[rgba(242,239,230,.58)]">
                Four pillars organise the platform. Intelligence runs across all
                four. A platform baseline of roles, security, documents,
                reporting, multi-centre and connectivity is included in every
                package. {SELECTABLE_MODULES.length} further modules can be
                switched on as a practice needs them.
              </p>

              <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button href="/contact" variant="primary" size="lg" onDark>
                  Book a demo
                </Button>
                <Button href="/build" variant="outlineLight" size="lg" onDark>
                  Build your configuration
                </Button>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <ImageSlot
                caption="Practice portrait — practitioner reviewing a client record"
                overlay="top"
                className="min-h-[320px] md:min-h-[420px]"
              />
              <nav
                aria-label="Platform sections"
                className="mt-10 border-t border-[rgba(242,239,230,.14)] pt-8"
              >
                <ul className="flex list-none flex-wrap gap-x-7 gap-y-3.5">
                  {JUMP_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(242,239,230,.6)] transition-colors duration-300 hover:text-brass focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-green-deep"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          </div>
        </div>
      </section>

      {PILLARS.map((pillar) => {
        const modules = modulesByPillar(pillar.id);

        return (
          <div key={pillar.id}>
            <Section
              id={pillar.id}
              ground={PILLAR_GROUND[pillar.id]}
              className="scroll-mt-24"
              revealHeader
              headerClassName="max-w-[900px]"
              contentClassName="mt-14 md:mt-16"
              eyebrow={`${pillar.number} — ${pillar.name}`}
              title={PILLAR_HEADLINE[pillar.id]}
              intro={pillar.headline}
            >
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-20">
                <Reveal>
                  {pillar.body.map((paragraph, index) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className={`text-[15.5px] leading-[1.85] text-muted md:text-base ${
                        index > 0 ? "mt-6" : ""
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </Reveal>

                <Reveal delay={90} className="lg:pt-1.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
                    {pillar.promise}
                  </p>
                  <ul className="mt-6 flex list-none flex-wrap gap-2">
                    {pillar.capabilities.map((capability) => (
                      <li key={capability}>
                        <Chip tone="green">{capability}</Chip>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 font-mono text-[10px] uppercase leading-[1.9] tracking-[0.18em] text-muted">
                    {modules.length} modules in this pillar
                  </p>
                </Reveal>
              </div>

              <ModuleGrid modules={modules} className="mt-14 md:mt-16" />
            </Section>

            {pillar.id === "healing" ? (
              <section className="bg-green-deep py-16 md:py-24">
                <div className="container-site">
                  <Reveal>
                    <ImageSlot
                      caption="Consultation — practitioner and client reviewing a healing plan together"
                      overlay="top"
                      className="min-h-[280px] md:min-h-[400px]"
                    />
                  </Reveal>
                </div>
              </section>
            ) : null}
          </div>
        );
      })}

      <Section
        id="intelligence"
        ground="dark"
        className="scroll-mt-24"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-14 md:mt-16"
        eyebrow="Intelligence"
        title={
          <>
            AI that sees the whole story —{" "}
            <em className="italic text-brass">not just one report</em>.
          </>
        }
        intro="Intelligence runs across the entire journey rather than sitting beside it. Dr.T works for the care team; the Wellness Companion works for the client, and does deliberately less."
      >
        <Reveal className="max-w-[70ch]">
          <p className="text-[15.5px] leading-[1.85] text-[rgba(242,239,230,.7)] md:text-base">
            Dr.T works across the information available within the client&rsquo;s
            record. It can analyse in seconds, compare findings across the
            history, and surface relationships and patterns a single document
            would not show. Dr.T does not replace the practitioner. It helps the
            practitioner see more of the story, faster.
          </p>
          <p className="mt-6 font-mono text-[10.5px] uppercase leading-[1.9] tracking-[0.18em] text-brass">
            Intelligent assistance. Human oversight.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.8] text-[rgba(242,239,230,.6)]">
            Every AI-generated clinical action remains subject to the appropriate
            permissions, consent and professional review.
          </p>
        </Reveal>

        <ModuleGrid
          modules={INTELLIGENCE_MODULES}
          tone="dark"
          className="mt-12 md:mt-14"
        />

        <div className="mt-12">
          <Button href="/ai" variant="outlineLight" size="lg" onDark>
            Explore Dr.T AI in depth
          </Button>
        </div>
      </Section>

      <Section
        id="platform-baseline"
        ground="bg"
        className="scroll-mt-24"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-14 md:mt-16"
        eyebrow="Platform baseline"
        title={
          <>
            Six things that are in{" "}
            <em className="italic text-green">every</em> package.
          </>
        }
        intro="These are not modules a practice chooses between. They are the ground every other module stands on, which is why a wearable reading, a laboratory marker and a consent record all behave the same way."
      >
        <ModuleGrid modules={BASELINE_MODULES} omitAnchors={["integrations"]} />

        <Reveal className="mt-12 border-t border-line pt-8">
          <p className="max-w-[70ch] text-[15px] leading-[1.85] text-muted">
            Roles and permissions, security, consent and audit, documents and
            records, dashboards and reporting, multi-centre operation and
            connectivity ship with Essentials, Clinical and Precision alike.
            HIPAA-aligned and GDPR-ready by design.
          </p>
        </Reveal>
      </Section>

      <Section
        id="integrations"
        ground="surface"
        className="scroll-mt-24"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-14 md:mt-16"
        eyebrow="Integrations"
        title={
          <>
            Connect the services your practice{" "}
            <em className="italic text-green">already</em> uses.
          </>
        }
        intro="Connections are described by the service they provide rather than the supplier behind them, so a practice can keep the tools it already runs and change one without changing the platform."
      >
        <ul className="grid list-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATION_SERVICES.map((service, index) => (
            <Reveal
              key={service.id}
              as="li"
              delay={Math.min(index % 3, 4) * 90}
              className="-mb-px -mr-px flex flex-col border border-line p-7 md:p-8"
            >
              <h3 className="font-display text-[24px] font-normal leading-[1.18] text-ink">
                {service.name}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8] text-muted">
                {service.description}
              </p>
              {service.examples ? (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-brass-deep">
                    Supported today
                  </p>
                  <ul className="mt-3.5 flex list-none flex-wrap gap-2">
                    {service.examples.map((example) => (
                      <li key={example}>
                        <Chip tone="neutral">{example}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 border-t border-line pt-12">
          <p className="max-w-[20ch] font-display text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.012em] text-ink [text-wrap:pretty]">
            One platform. Your{" "}
            <em className="italic text-green">ecosystem</em>.
          </p>
          <p className="mt-7 max-w-[62ch] text-[15.5px] leading-[1.85] text-muted">
            Wearables and connected health, laboratory systems, SMS, email,
            WhatsApp, email marketing, single sign-on and payments connect as
            services — and {INTEGRATIONS_CLOSING}
          </p>

          <div className="mt-10">
            <Button href="/contact" variant="ghost">
              Ask about a specific connection
            </Button>
          </div>
        </Reveal>
      </Section>

      <CtaBand ground="bg" />
    </>
  );
}
