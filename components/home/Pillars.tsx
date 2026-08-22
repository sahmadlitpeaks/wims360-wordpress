import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const TIMELINE = ["Intake", "Labs", "Exam", "Plan", "Review"];
const VENDORS = ["Terra", "Ultrahuman", "LIMS API", "Partner-lab portal"];
const ROLE_NAMES = [
  "Doctor",
  "Nurse",
  "Lab Coordinator",
  "Compliance Officer",
  "Partner Lab",
];

const FOOTER_RULE = "mt-9 border-t border-line pt-[26px]";
const MICRO = "font-mono text-[9.5px] uppercase tracking-[0.16em]";

/** Five stops on one line — the record is a sequence, not a folder. */
function TimelineMotif() {
  return (
    <div aria-hidden="true" className={`${FOOTER_RULE} flex items-center gap-3`}>
      {TIMELINE.map((stop, index) => (
        <span key={stop} className="contents">
          <span
            className={`${MICRO} shrink-0 ${
              index === TIMELINE.length - 1 ? "text-green" : "text-muted"
            }`}
          >
            {stop}
          </span>
          {index < TIMELINE.length - 1 ? (
            <span className="h-px flex-1 bg-line" />
          ) : null}
        </span>
      ))}
    </div>
  );
}

function NameRow({ items }: { items: string[] }) {
  return (
    <div
      aria-hidden="true"
      className={`${FOOTER_RULE} flex flex-wrap gap-x-[26px] gap-y-2.5`}
    >
      {items.map((item) => (
        <span key={item} className="font-mono text-[11px] text-muted">
          {item}
        </span>
      ))}
    </div>
  );
}

/** A draft that has not been saved — the whole AI posture in one line. */
function DraftMotif() {
  return (
    <div aria-hidden="true" className={FOOTER_RULE}>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-brass-deep">
        Draft insight · nothing saved yet
      </p>
      <p className="mt-2.5 font-display text-[20px] leading-[1.4] text-green">
        Stress layer carrying the case — cited from 3 sources.
      </p>
    </div>
  );
}

const PILLARS: { numeral: string; title: string; body: string; motif: ReactNode }[] =
  [
    {
      numeral: "I",
      title: "One unified clinical record",
      body: "Intake answers, examination results, lab markers, wearable signals, genomics and the care plan are the same record viewed from different angles. Nothing is retyped, and a report is a view of the data rather than a copy of it.",
      motif: <TimelineMotif />,
    },
    {
      numeral: "II",
      title: "Multi-vendor wearables and labs",
      body: "Wearables arrive through Terra and Ultrahuman; lab work moves through partner-lab upload or a bidirectional LIMS integration. Your vendors stay yours — WIMS 360 normalises what they send into 115 functional markers.",
      motif: <NameRow items={VENDORS} />,
    },
    {
      numeral: "III",
      title: "Consent-gated AI",
      body: "Dr.T Copilot reads the record, cites what it used and drafts an output. A clinician confirms before anything is saved. It is off by default, enabled per customer after a signed BAA or DPA, and only for clients whose AI consent is active.",
      motif: <DraftMotif />,
    },
    {
      numeral: "IV",
      title: "Role-based workflows",
      body: "Fourteen roles, each a permission set rather than a job title. A partner lab uploads results and sees nothing else; a compliance officer sees the audit log and no clinical detail. Every access is recorded with actor and timestamp.",
      motif: <NameRow items={ROLE_NAMES} />,
    },
  ];

export function Pillars() {
  return (
    <Section
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[820px]"
      contentClassName="mt-16 md:mt-[88px]"
      eyebrow="Why WIMS 360"
      title={
        <>
          Built on four <em className="italic text-green">load-bearing</em>{" "}
          ideas.
        </>
      }
      intro="Everything else in the platform is a consequence of these four decisions."
    >
      <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
        {PILLARS.map((pillar, index) => (
          <Reveal
            key={pillar.title}
            as="article"
            delay={Math.min(index, 4) * 90}
            className="bg-bg p-8 transition-colors duration-500 hover:bg-surface md:p-[52px]"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-brass">
              {pillar.numeral}
            </span>
            <h3 className="mt-5 font-display text-[clamp(1.6rem,2.4vw,32px)] font-normal leading-[1.15] text-ink">
              {pillar.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.8] text-muted">
              {pillar.body}
            </p>
            {pillar.motif}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Pillars;
