import { FIGURE_CLASS, MockFrame, MockHeader, MonoLabel } from "./parts";

type Stage = {
  name: string;
  count: number;
  leads: Array<{ initials: string; interest: string }>;
};

const STAGES: Stage[] = [
  {
    name: "New",
    count: 24,
    leads: [
      { initials: "SL", interest: "Longevity · web form" },
      { initials: "MK", interest: "Metabolic · walk-in" },
      { initials: "AR", interest: "Sleep · referral" },
    ],
  },
  {
    name: "Contacted",
    count: 11,
    leads: [
      { initials: "DN", interest: "Longevity · WhatsApp" },
      { initials: "HB", interest: "Performance · call back" },
    ],
  },
  {
    name: "Qualified",
    count: 6,
    leads: [
      { initials: "JF", interest: "Longevity · consult booked" },
      { initials: "TO", interest: "Gut · consult booked" },
    ],
  },
  {
    name: "Converted",
    count: 3,
    leads: [
      { initials: "RM", interest: "Longevity · 6-month" },
      { initials: "EC", interest: "Metabolic · 3-month" },
    ],
  },
];

/** Lead pipeline: four stages with counts, plus campaign performance chips. */
export function CrmFunnel() {
  return (
    <MockFrame label="The WIMS 360 lead pipeline with new, contacted, qualified and converted columns and campaign performance for WhatsApp and email">
      <div className="flex min-h-[440px] flex-col">
        <MockHeader>
          <span className="text-[0.8125rem] font-semibold leading-4 text-ink">
            Lead pipeline
          </span>
          <span className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--green)_25%,transparent)] bg-green-soft px-2.5 py-1 text-[0.6875rem] leading-4 text-green-deep">
              WhatsApp campaign ·{" "}
              <span className={FIGURE_CLASS}>sent 214</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.6875rem] leading-4 text-muted">
              Email nurture · <span className={FIGURE_CLASS}>open 38%</span>
            </span>
          </span>
        </MockHeader>

        <div className="grid grid-cols-2 gap-3 px-4 py-4 md:grid-cols-4">
          {STAGES.map((stage) => (
            <section key={stage.name} className="min-w-0">
              <div className="flex items-baseline justify-between gap-2 border-b border-line pb-1.5">
                <MonoLabel className="truncate">{stage.name}</MonoLabel>
                <span
                  className={`text-[0.8125rem] font-semibold leading-4 text-ink ${FIGURE_CLASS}`}
                >
                  {stage.count}
                </span>
              </div>
              <ul className="mt-2 flex flex-col gap-1.5">
                {stage.leads.map((lead) => (
                  <li
                    key={lead.initials}
                    className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2 py-1.5"
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-soft text-[0.5625rem] font-semibold text-green-deep ${FIGURE_CLASS}`}
                    >
                      {lead.initials}
                    </span>
                    <span className="min-w-0 truncate text-[0.6875rem] leading-4 text-muted">
                      {lead.interest}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-auto border-t border-line px-4 py-3">
          <p className="text-[0.6875rem] leading-4 text-muted">
            Every lead carries its source, consent state and owner — conversions
            open a client record with the intake already attached.
          </p>
        </div>
      </div>
    </MockFrame>
  );
}

export default CrmFunnel;
