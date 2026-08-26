import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Stop = { name: string; note: string };

/** The complete journey, exactly as the content direction sequences it. */
const STOPS: Stop[] = [
  { name: "History", note: "What the client brings with them" },
  { name: "Assessment", note: "Their own account, captured as data" },
  { name: "Examination", note: "What the practice measures" },
  { name: "Laboratory & Genetics", note: "Order, sample, result, review" },
  { name: "Intelligent Analysis", note: "Findings read together" },
  { name: "Personalised Healing Plan", note: "Insight turned into action" },
  { name: "Live Health & Lifestyle Tracking", note: "The story between visits" },
  { name: "Communication & Engagement", note: "The client kept in the loop" },
  { name: "Progress & Review", note: "Measured against what came before" },
];

/** Nine evenly spaced marks on one hairline — the journey as a single line. */
function FlowRule() {
  return (
    <svg
      viewBox="0 0 900 12"
      className="block h-3 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="0"
        y1="6"
        x2="900"
        y2="6"
        stroke="rgba(176,132,68,.4)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      {STOPS.map((stop, index) => (
        <circle
          key={stop.name}
          cx={20 + index * 107.5}
          cy="6"
          r="3"
          fill="var(--brass)"
        />
      ))}
    </svg>
  );
}

/**
 * The closing story band: the whole journey in one dark run, ending on the
 * line the client asked us to end on.
 */
export function JourneyFlow() {
  return (
    <section
      id="journey"
      className="bg-green-deep py-24 text-cream md:py-[140px]"
    >
      <div className="container-site">
        <Reveal className="max-w-[880px]">
          <Eyebrow tone="dark">The complete journey</Eyebrow>
          <h2 className="mt-7 font-display text-[clamp(1.87rem,3.61vw,2.70rem)] font-semibold leading-[1.06] tracking-[-0.012em] text-paper [text-wrap:pretty]">
            From the first history to the next{" "}
            <em className="text-mint">review</em>.
          </h2>
          <p className="mt-7 text-[17px] leading-[1.8] text-[rgba(242,239,230,.7)]">
            Every stage writes to the same client story, and every stage can be
            read against the one before it.
          </p>
        </Reveal>

        <Reveal delay={90} className="mt-14 hidden md:block">
          <FlowRule />
        </Reveal>

        <ol className="mt-8 grid list-none grid-cols-1 gap-px bg-[rgba(176,132,68,.24)] sm:grid-cols-2 lg:grid-cols-3">
          {STOPS.map((stop, index) => (
            <Reveal
              key={stop.name}
              as="li"
              delay={Math.min(index % 3, 4) * 90}
              className="bg-green-deep px-6 py-7 md:px-8 md:py-9"
            >
              <span className="font-semibold text-[12px] tracking-[0.06em] text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-4 block font-display text-[clamp(1.21rem,2.00vw,24px)] leading-[1.25] text-paper [text-wrap:pretty]">
                {stop.name}
              </span>
              <span className="mt-2.5 block text-[13.5px] leading-[1.75] text-[rgba(242,239,230,.6)]">
                {stop.note}
              </span>
            </Reveal>
          ))}
        </ol>

        <Reveal
          delay={180}
          className="mt-14 border-t border-[rgba(176,132,68,.28)] pt-10"
        >
          <p className="font-display text-[clamp(1.48rem,2.97vw,34px)] leading-[1.25] text-brass [text-wrap:pretty]">
            The journey never stops.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default JourneyFlow;
