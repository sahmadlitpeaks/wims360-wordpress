import { MOCK_LABEL, MockFrame } from "@/components/mocks/parts";

type Dimension = {
  name: string;
  note: string;
};

/**
 * The seven dimensions of the Diamond System of Care. Each row names the kinds
 * of information that inform it — deliberately no numbers, no bars and no
 * ranking, because the platform offers a structured way to LOOK ACROSS the
 * dimensions rather than a score for each one.
 */
const DIMENSIONS: Dimension[] = [
  { name: "Diet", note: "Intake, preferences and what the panels say about them" },
  { name: "Sleep", note: "Duration, consistency and recovery between appointments" },
  { name: "Stress", note: "Perceived load recorded in assessments, read over time" },
  { name: "Digestion", note: "Gut findings, symptoms and the examinations that cover them" },
  { name: "Metabolism", note: "Metabolic examinations and the markers that relate to them" },
  { name: "Toxicity", note: "Exposure history and the relevant recorded findings" },
  { name: "Individuality", note: "Genomic findings and the history that makes the case specific" },
];

/** The brass ornament: one client at the centre, seven ways of looking in. */
function DiamondMark() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="block h-[86px] w-[86px]"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="24"
        y="24"
        width="72"
        height="72"
        transform="rotate(45 60 60)"
        fill="none"
        stroke="var(--brass)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="42"
        y="42"
        width="36"
        height="36"
        transform="rotate(45 60 60)"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="60" cy="60" r="3" fill="var(--green)" />
    </svg>
  );
}

/**
 * The Diamond System of Care as the platform presents it: seven dimensions and
 * the information that informs each one, with nothing scored.
 */
export function DiamondDiagram() {
  return (
    <MockFrame label="The seven dimensions of the Diamond System of Care — diet, sleep, stress, digestion, metabolism, toxicity and individuality — each listing the kinds of recorded information that inform it">
      <div className="flex items-center gap-5 border-b border-line px-[22px] py-5">
        <DiamondMark />
        <span className="min-w-0">
          <span className="block font-display text-[19px] leading-[1.25] text-ink">
            One client, seven ways of looking
          </span>
          <span className={`mt-1.5 block ${MOCK_LABEL}`}>
            Diamond System of Care
          </span>
        </span>
      </div>

      <ol className="list-none">
        {DIMENSIONS.map((dimension, index) => (
          <li
            key={dimension.name}
            className={`grid grid-cols-[28px_minmax(0,1fr)] items-baseline gap-4 px-[22px] py-[15px] sm:grid-cols-[34px_minmax(0,1fr)] ${
              index < DIMENSIONS.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <span className="font-display text-[18px] leading-none text-brass">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[19px] leading-[1.25] text-ink">
                {dimension.name}
              </span>
              <span className="mt-1 block text-[13px] leading-[1.7] text-muted">
                {dimension.note}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="border-t border-line bg-green-deep px-[22px] py-5">
        <p className="font-display text-[17px] leading-[1.5] text-cream">
          A structured way to look across the dimensions — not a score, and not
          a substitute for clinical judgement.
        </p>
      </figcaption>
    </MockFrame>
  );
}

export default DiamondDiagram;
