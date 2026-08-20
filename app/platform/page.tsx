import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BookingCalendar } from "@/components/mocks/BookingCalendar";
import { CompanionPhone } from "@/components/mocks/CompanionPhone";
import { CopilotChat } from "@/components/mocks/CopilotChat";
import { CrmFunnel } from "@/components/mocks/CrmFunnel";
import { ExamCatalog } from "@/components/mocks/ExamCatalog";
import { ReportCompare } from "@/components/mocks/ReportCompare";
import { ModuleDeep } from "@/components/platform/ModuleDeep";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { INTEGRATIONS, type Integration } from "@/content/integrations";
import { LAYERS, MODULES, type Module, type ModuleId } from "@/content/modules";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The six modules of WIMS 360 — assessments, labs and Dr.T on the clinical side; bookings, CRM and the client portal on the operations side — with wearables, reporting, compliance and integrations running underneath.",
};

/** Mocks stay server components, mapped to the module they illustrate. */
const MOCKS: Record<ModuleId, ReactNode> = {
  assessments: <ExamCatalog />,
  labs: <ReportCompare />,
  ai: <CopilotChat />,
  bookings: <BookingCalendar />,
  crm: <CrmFunnel />,
  portal: <CompanionPhone />,
};

const HALVES: {
  id: Module["half"];
  title: string;
  blurb: string;
}[] = [
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
 * Section grounds alternate down the page so the six deep-dives read as
 * separate chapters: intro on paper, assessments on white, and so on.
 */
function groundFor(index: number): string {
  return index % 2 === 0 ? "bg-surface" : "";
}

export default function PlatformPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="max-w-2xl">
            <Eyebrow>The platform</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
              Two halves. <span className="font-serif italic">One</span>{" "}
              clinical record.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              WIMS 360 splits into clinical intelligence and clinic operations,
              but not into two databases. Every module below writes to the same
              client, the same calendar and the same audit log — switch on the
              ones your clinic needs and leave the rest dark.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2">
            {HALVES.map((half) => (
              <Card key={half.id} as="article" className="flex flex-col">
                <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                  {half.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {half.blurb}
                </p>

                <ul className="mt-6 flex flex-col gap-px overflow-hidden rounded-xl border border-line bg-line">
                  {MODULES.filter((module) => module.half === half.id).map(
                    (module) => (
                      <li key={module.id} className="bg-surface">
                        <Link
                          href={`#${module.id}`}
                          className="group block px-5 py-4 transition-colors hover:bg-green-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green"
                        >
                          <span className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold leading-5 text-ink">
                              {module.name}
                            </span>
                            <span
                              aria-hidden="true"
                              className="text-sm text-green transition-transform duration-200 group-hover:translate-x-0.5"
                            >
                              &darr;
                            </span>
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">
                            {module.tagline}
                          </span>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {MODULES.map((module, index) => (
        <ModuleDeep
          key={module.id}
          module={module}
          mock={MOCKS[module.id]}
          reversed={index % 2 === 1}
          className={groundFor(index)}
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
        className="bg-surface"
        eyebrow="Underneath the six"
        title={
          <>
            Four layers every module{" "}
            <span className="font-serif italic">shares</span>.
          </>
        }
        intro="These are not add-ons with their own screens. They are the plumbing the six modules run on, which is why a wearable reading, a lab marker and a consent record all behave the same way."
      >
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {LAYERS.map((layer) => (
            <li
              key={layer.name}
              className="rounded-xl border border-line bg-bg p-6 md:p-7"
            >
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                {layer.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {layer.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Integrations"
        title={
          <>
            Connected to what you{" "}
            <span className="font-serif italic">already</span> run.
          </>
        }
        intro="Supported connections today, grouped by what they do. Anything beyond this list goes through the documented API rather than a one-off script."
      >
        <div className="flex flex-col gap-10">
          {INTEGRATION_GROUPS.map((group) => {
            const items = INTEGRATIONS.filter(
              (integration) => integration.category === group.category,
            );
            if (items.length === 0) {
              return null;
            }

            return (
              <div key={group.category}>
                <h3 className="font-mono text-[0.72rem] uppercase leading-5 tracking-[0.14em] text-muted">
                  {group.label}
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((integration) => (
                    <li
                      key={integration.name}
                      className="rounded-xl border border-line bg-surface px-5 py-4"
                    >
                      <p className="text-sm font-semibold leading-5 text-ink">
                        {integration.name}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {integration.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
