"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type Loop = {
  id: string;
  /** Tab label — short enough to sit in a horizontal tablist at 390px. */
  name: string;
  /** One line under the heading, in ink rather than muted. */
  lead: string;
  /** What the loop actually does, in plain language. */
  body: string;
  /** The parts the loop returns, rendered as a labelled list. */
  produces: string[];
  /** The approval gate. Every loop has one; none of them are optional. */
  approves: string;
};

/**
 * The five Dr.T Copilot loops, in the order a clinic meets them: score the
 * ladder, read the record, read one report, draft the plan, review the case.
 */
const LOOPS: Loop[] = [
  {
    id: "ladder-chex",
    name: "Ladder Chex",
    lead: "Scores the seven layers of the Diamond System of Care.",
    body: "Dr.T reads the client's Chex forms, lab markers, wearable signals and genomic traits, then scores every layer of the ladder — Diet, Sleep, Stress, Digestion, Metabolism, Toxicity and Individuality. Each layer comes back with a numeric load and a traffic-light state, a one-line clinical why, and the drivers named rather than implied.",
    produces: [
      "A numeric load and traffic-light state per layer",
      "A one-line clinical why behind each state",
      "The named drivers the score was built from",
    ],
    approves: "The scored ladder itself — the clinician approves it before it is saved to the record.",
  },
  {
    id: "health-insight",
    name: "Health Insight",
    lead: "A structured deep-read of the whole record.",
    body: "Dr.T works through everything on file and writes it up: the clinical picture, an evidence summary with each finding tagged by source and certainty, the contradictions and data gaps it ran into, a cross-layer interpretation, the questions worth asking next, the next-best actions, and a phased plan. It writes a plain-language version for the client alongside it.",
    produces: [
      "Evidence tagged by source and certainty",
      "Contradictions and data gaps, stated plainly",
      "Priority questions, next-best actions and a phased plan",
      "A plain-language client-facing summary",
    ],
    approves: "The whole insight — nothing is stored or shared until the clinician has reviewed and approved it.",
  },
  {
    id: "analyze-report",
    name: "Analyze a report",
    lead: "One specialty report, read end to end.",
    body: "Point Dr.T at a single specialty report — a Gut Chex or a Blood Chex, say — and it reads the full report rather than the headline values, then returns a layered analysis of what is in it.",
    produces: [
      "A layered analysis of one specialty report",
      "Written against the full report, not a summary of it",
    ],
    approves: "The analysis — on sign-off it becomes that report's stored interpretation.",
  },
  {
    id: "recommendation-plan",
    name: "Recommendation plan",
    lead: "The client-facing 7-layer healing plan, drafted.",
    body: "Dr.T drafts the healing plan across the seven layers: recommendations, supplements and therapies drawn only from your own clinic's catalogue, checked against the client's recorded allergies, and held to a daily-actions adherence limit so the plan stays something a person can actually follow.",
    produces: [
      "Recommendations, supplements and therapies from your catalogue only",
      "Recorded allergies respected",
      "A daily-actions limit, so adherence stays realistic",
    ],
    approves: "The plan arrives as a draft prescription — the clinician edits it and approves it before the client sees it.",
  },
  {
    id: "case-review",
    name: "Case review",
    lead: "The deepest pass, routed for a second opinion.",
    body: "The entire record plus every specialty report, integrated into a formatted functional-medicine case review. It flags the contradictions it found and the records that need fixing rather than quietly working around them.",
    produces: [
      "A formatted functional-medicine case review",
      "Contradictions and records to fix, flagged",
      "Routing to a named senior clinician on approval",
    ],
    approves: "The review — and on approval it routes to a named senior clinician for cross-check.",
  },
];

export type LoopTabsProps = {
  /**
   * The Dr.T Copilot mock, passed in from the server page so it stays a server
   * component instead of joining the client bundle.
   */
  chat: ReactNode;
};

/** Accessible tabs over the five Copilot loops, with the thread mock beside. */
export function LoopTabs({ chat }: LoopTabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const next = (index + LOOPS.length) % LOOPS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(LOOPS.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <Section
      id="loops"
      className="scroll-mt-24 bg-surface"
      eyebrow="Dr.T Copilot"
      title={
        <>
          Five loops, and every one of them{" "}
          <span className="font-serif italic">ends</span> with a clinician.
        </>
      }
      intro="Each loop is the same shape: Dr.T loads the record, drafts an output, and hands it back for review. What changes is how deep it reads and what the clinician is signing off on."
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-12">
        <div>
          <div
            role="tablist"
            aria-label="Dr.T Copilot loops"
            aria-orientation="horizontal"
            className="flex flex-wrap gap-2"
          >
            {LOOPS.map((loop, index) => {
              const selected = index === active;
              return (
                <button
                  key={loop.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`loop-tab-${loop.id}`}
                  aria-controls={`loop-panel-${loop.id}`}
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "rounded-xl border px-4 py-2.5 text-sm font-medium leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                    selected
                      ? "border-green-deep bg-green-deep text-white"
                      : "border-line bg-bg text-muted hover:border-green hover:text-green",
                  )}
                >
                  {loop.name}
                </button>
              );
            })}
          </div>

          {LOOPS.map((loop, index) => (
            <div
              key={loop.id}
              role="tabpanel"
              id={`loop-panel-${loop.id}`}
              aria-labelledby={`loop-tab-${loop.id}`}
              tabIndex={0}
              hidden={index !== active}
              className="mt-8 rounded-xl border border-line bg-bg p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green md:p-8"
            >
              <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green">
                Loop {index + 1} of {LOOPS.length}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-ink">
                {loop.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink">
                {loop.lead}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {loop.body}
              </p>

              <p className="mt-7 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
                What comes back
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {loop.produces.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-xl border border-[color-mix(in_srgb,var(--green)_25%,transparent)] bg-green-soft px-5 py-4">
                <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green-deep">
                  What the clinician approves
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-green-deep">
                  {loop.approves}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto w-full max-w-[420px] lg:mx-0 lg:sticky lg:top-24">
          {chat}
        </div>
      </div>
    </Section>
  );
}

export default LoopTabs;
