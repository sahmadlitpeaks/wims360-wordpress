import { MOCK_LABEL, MockFrame } from "@/components/mocks/parts";

type PlanSection = {
  heading: string;
  lines: string[];
};

const SECTIONS: PlanSection[] = [
  {
    heading: "Nutrition",
    lines: [
      "Protein target reviewed against the April panel",
      "Evening meal moved earlier · intolerances on file",
    ],
  },
  {
    heading: "Supplementation",
    lines: ["Dose, timing and duration recorded against the plan"],
  },
  {
    heading: "Therapies",
    lines: ["Six sessions scheduled through the practice calendar"],
  },
  {
    heading: "Lifestyle",
    lines: ["Sleep window and daily movement carried into the app"],
  },
];

/**
 * A healing plan mid-journey: the sections it carries, the revision history
 * that shows it has moved with the client, and the practitioner it belongs to.
 * No scores and no ranking — the plan is a set of actions, not a verdict.
 */
export function HealingPlanCard() {
  return (
    <MockFrame label="A WIMS 360 healing plan for a client showing its nutrition, supplementation, therapy and lifestyle sections, the revision it is on, and the practitioner who owns it">
      <div
        className="flex items-center justify-between gap-3 border-b border-line px-[22px] py-[18px]"
        style={{ background: "linear-gradient(to bottom,#fff,#FBFAF6)" }}
      >
        <span className="min-w-0">
          <span className="block truncate font-display text-[17px] leading-[1.2] text-ink">
            Healing plan · Sarah L.
          </span>
          <span className={`block truncate ${MOCK_LABEL}`}>
            Revision 3 · updated after the April results
          </span>
        </span>
        <span className="shrink-0 border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-green">
          Active
        </span>
      </div>

      <ul className="list-none">
        {SECTIONS.map((section) => (
          <li
            key={section.heading}
            className="grid grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] gap-4 border-b border-line px-[22px] py-4"
          >
            <span className="font-display text-[18px] leading-[1.3] text-ink">
              {section.heading}
            </span>
            <span>
              {section.lines.map((line) => (
                <span
                  key={line}
                  className="block text-[13.5px] leading-[1.7] text-muted"
                >
                  {line}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-[22px] py-4">
        <span className={MOCK_LABEL}>
          Every revision retained · shared to the client app
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brass-deep">
          Owned by the care team
        </span>
      </figcaption>
    </MockFrame>
  );
}

export default HealingPlanCard;
