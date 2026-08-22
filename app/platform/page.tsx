import type { Metadata } from "next";
import Link from "next/link";
import { ModuleDeep } from "@/components/platform/ModuleDeep";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { INTEGRATIONS, type Integration } from "@/content/integrations";
import { LAYERS, MODULES, type Module } from "@/content/modules";
import { PACKAGES } from "@/content/packages";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Two halves, one clinical record. Assessments, labs and Dr.T on the clinical side; bookings, CRM and the client portal on the operations side — with wearables, reporting, compliance and integrations running underneath.",
};

const HALVES: { id: Module["half"]; title: string; blurb: string }[] = [
  {
    id: "clinical",
    title: "Clinical Intelligence",
    blurb:
      "The record itself: what you ask, what you measure, and what the platform makes of it. Intake and examination forms, laboratory and genomic results, and a copilot that reads all of it and drafts for a clinician to approve.",
  },
  {
    id: "operations",
    title: "Clinic Operations",
    blurb:
      "The clinic around the record: the calendar that fills the rooms and the practitioners, the pipeline that keeps an enquiry from going cold, and the portal your clients live in between appointments.",
  },
];

const INTEGRATION_GROUPS: { category: Integration["category"]; label: string }[] =
  [
    { category: "wearables", label: "Wearables" },
    { category: "labs", label: "Laboratory" },
    { category: "comms", label: "Messaging" },
    { category: "payments", label: "Payments" },
    { category: "auth", label: "Identity" },
    { category: "infra", label: "Infrastructure" },
  ];

/**
 * Hairline colour for list dividers sitting on the green-deep ground. Written
 * out in full so Tailwind's scanner sees the literal class.
 */
const CREAM_RULE = "border-[rgba(242,239,230,.14)]";

/**
 * "Included in Clinical and Precision" / "Included in every package", composed
 * from the package list in `content/` rather than written out per module.
 */
function includedLabel(module: Module): string {
  const names = module.includedIn.map(
    (id) => PACKAGES.find((pkg) => pkg.id === id)?.name ?? id,
  );

  const base =
    names.length >= PACKAGES.length
      ? "Included in every package"
      : `Included in ${
          names.length > 1
            ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
            : names[0]
        }`;

  return module.includedNote ? `${base} · ${module.includedNote}` : base;
}

export default function PlatformPage() {
  return (
    <>
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div className="container-site">
          <Reveal>
            <Eyebrow tone="dark">The platform</Eyebrow>
            <h1 className="mt-8 max-w-[20ch] font-display text-[clamp(2.75rem,6.6vw,82px)] font-normal leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              Two halves. <em className="italic text-brass">One</em> clinical
              record.
            </h1>
            <p className="mt-10 max-w-[64ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              WIMS 360 splits into clinical intelligence and clinic operations,
              but not into two databases. Every module below writes to the same
              client, the same calendar and the same audit log — switch on the
              ones your clinic needs and leave the rest dark.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-[rgba(176,132,68,.28)] md:mt-20 md:grid-cols-2">
            {HALVES.map((half, index) => (
              <Reveal
                key={half.id}
                as="article"
                delay={index * 90}
                className={cn(
                  "bg-green-deep py-10 md:py-12",
                  index === 0 ? "md:pr-12" : "md:pl-12",
                )}
              >
                <h2 className="font-display text-[clamp(1.8rem,3.2vw,38px)] font-normal leading-[1.1] text-paper">
                  {half.title}
                </h2>
                <p className="mt-[18px] text-[15.5px] leading-[1.85] text-[rgba(242,239,230,.66)]">
                  {half.blurb}
                </p>

                <ul
                  className={cn("mt-9 list-none border-t", CREAM_RULE)}
                >
                  {MODULES.filter((module) => module.half === half.id).map(
                    (module) => (
                      <li
                        key={module.id}
                        className={cn("border-b", CREAM_RULE)}
                      >
                        <Link
                          href={`#${module.id}`}
                          className="group block py-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass"
                        >
                          <span className="block font-display text-[24px] leading-[1.2] text-paper transition-colors duration-300 group-hover:text-brass">
                            {module.name}
                          </span>
                          <span className="mt-1.5 block text-[13.5px] leading-[1.7] text-[rgba(242,239,230,.6)]">
                            {module.tagline}
                          </span>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {MODULES.map((module, index) => (
        <ModuleDeep
          key={module.id}
          module={module}
          included={includedLabel(module)}
          className={index % 2 === 0 ? "bg-surface" : "bg-bg"}
          footer={
            module.id === "ai" ? (
              <Button href="/ai" variant="ghost">
                Explore Dr.T AI in depth
              </Button>
            ) : null
          }
        />
      ))}

      <Section
        ground="dark"
        revealHeader
        headerClassName="max-w-[860px]"
        contentClassName="mt-16 md:mt-20"
        eyebrow="Underneath the six"
        title={
          <>
            Four layers every module{" "}
            <em className="italic text-brass">shares</em>.
          </>
        }
        intro="These are not add-ons with their own screens. They are the plumbing the six modules run on, which is why a wearable reading, a lab marker and a consent record all behave the same way."
      >
        <ul className="grid list-none grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {LAYERS.map((layer, index) => (
            <Reveal
              key={layer.name}
              as="li"
              delay={index * 90}
              className={cn(
                index > 0 && "lg:pl-9",
                index < LAYERS.length - 1 &&
                  "lg:border-r lg:border-[rgba(176,132,68,.28)] lg:pr-9",
              )}
            >
              <h3 className="font-display text-[clamp(1.6rem,2.4vw,30px)] font-normal leading-[1.12] text-paper">
                {layer.name}
              </h3>
              <p className="mt-[18px] text-[14.5px] leading-[1.8] text-[rgba(242,239,230,.62)]">
                {layer.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        ground="bg"
        revealHeader
        headerClassName="max-w-[860px]"
        contentClassName="mt-16 md:mt-20"
        eyebrow="Integrations"
        title={
          <>
            Connected to what you <em className="italic text-green">already</em>{" "}
            run.
          </>
        }
        intro="Supported connections today, grouped by what they do. Anything beyond this list goes through the documented API rather than a one-off script."
      >
        <div className="flex flex-col gap-14 md:gap-16">
          {INTEGRATION_GROUPS.map((group) => {
            const items = INTEGRATIONS.filter(
              (integration) => integration.category === group.category,
            );
            if (items.length === 0) {
              return null;
            }

            return (
              <Reveal key={group.category}>
                <h3 className="eyebrow">{group.label}</h3>
                {/*
                  Each cell carries its own hairline and overlaps its neighbour
                  by a pixel, so shared edges collapse to one line and a group
                  of one or two leaves clean parchment beside it — which a
                  `gap-px` background grid would fill with an empty cell.
                */}
                <ul className="mt-7 grid list-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((integration) => (
                    <li
                      key={integration.name}
                      className="-mb-px -mr-px border border-line p-8"
                    >
                      <p className="font-display text-[26px] leading-[1.15] text-ink">
                        {integration.name}
                      </p>
                      <p className="mt-3.5 text-sm leading-[1.8] text-muted">
                        {integration.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand ground="surface" />
    </>
  );
}
