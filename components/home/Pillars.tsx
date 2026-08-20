import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

const TIMELINE = ["Intake", "Labs", "Exam", "Plan", "Review"];
const VENDORS = ["Terra", "Ultrahuman", "LIMS API", "Partner-lab portal"];
const ROLE_CHIPS = [
  "Doctor",
  "Nurse",
  "Lab Coordinator",
  "Compliance Officer",
  "Partner Lab",
];

const MICRO_CHIP =
  "inline-flex items-center rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[0.6875rem] leading-4 tracking-tight text-muted";

/** Five stops on one line — the record is a sequence, not a folder. */
function TimelineStrip() {
  return (
    <div aria-hidden="true" className="flex items-center">
      {TIMELINE.map((stop, index) => (
        <div key={stop} className="flex min-w-0 flex-1 items-center">
          <div className="flex min-w-0 flex-col items-start gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-green" />
            <span className="truncate font-mono text-[0.625rem] uppercase leading-4 tracking-[0.1em] text-muted">
              {stop}
            </span>
          </div>
          {index < TIMELINE.length - 1 ? (
            <span className="mx-1 mb-4 h-px flex-1 bg-line" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ChipRow({ items }: { items: string[] }) {
  return (
    <ul aria-hidden="true" className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className={MICRO_CHIP}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A draft that has not been saved — the whole AI posture in one small box. */
function InsightCard() {
  return (
    <div
      aria-hidden="true"
      className="rounded-lg border border-[color-mix(in_srgb,var(--green)_20%,transparent)] bg-green-soft px-3.5 py-3"
    >
      <p className="font-mono text-[0.625rem] uppercase leading-4 tracking-[0.14em] text-green">
        Draft insight
      </p>
      <p className="mt-1.5 text-[0.8125rem] leading-5 text-green-deep">
        Stress layer carrying the case — cited from 3 sources.
      </p>
      <p className="mt-1.5 text-[0.6875rem] leading-4 text-green-deep">
        Awaiting clinician approval · nothing saved yet
      </p>
    </div>
  );
}

const PILLARS: { title: string; body: string; visual: ReactNode }[] = [
  {
    title: "One unified clinical record",
    body: "Intake answers, examination results, lab markers, wearable signals, genomics and the care plan are the same record viewed from different angles. Nothing is retyped, and a report is a view of the data rather than a copy of it.",
    visual: <TimelineStrip />,
  },
  {
    title: "Multi-vendor wearables and labs",
    body: "Wearables arrive through Terra and Ultrahuman; lab work moves through partner-lab upload or a bidirectional LIMS integration. Your vendors stay yours — WIMS 360 normalises what they send into 115 functional markers.",
    visual: <ChipRow items={VENDORS} />,
  },
  {
    title: "Consent-gated AI",
    body: "Dr.T Copilot reads the record, cites what it used and drafts an output. A clinician confirms before anything is saved. It is off by default, enabled per customer after a signed BAA or DPA, and only for clients whose AI consent is active.",
    visual: <InsightCard />,
  },
  {
    title: "Role-based workflows",
    body: "Fourteen roles, each a permission set rather than a job title. A partner lab uploads results and sees nothing else; a compliance officer sees the audit log and no clinical detail. Every access is recorded with actor and timestamp.",
    visual: <ChipRow items={ROLE_CHIPS} />,
  },
];

export function Pillars() {
  return (
    <Section
      eyebrow="Why WIMS 360"
      title={
        <>
          Built on four{" "}
          <span className="font-serif italic">load-bearing</span> ideas.
        </>
      }
      intro="Everything else in the platform is a consequence of these four decisions."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {PILLARS.map((pillar) => (
          <Card key={pillar.title} as="article" className="flex flex-col">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
              {pillar.title}
            </h3>
            <p className="mt-3 pb-6 text-sm leading-relaxed text-muted">
              {pillar.body}
            </p>
            <div className="mt-auto border-t border-line pt-5">
              {pillar.visual}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default Pillars;
