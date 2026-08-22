import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const PROBLEMS = [
  {
    title: "Fragmented schedules",
    body: "The calendar has no idea what the appointment is for. Rooms, equipment and the practitioner qualified to run the test are reconciled by hand — so a VO₂ Max slot booked without the analyser becomes a wasted visit and an apology.",
  },
  {
    title: "Insights arrive late",
    body: "Lab results land in an inbox, wearable data lives in an app, intake answers sit in a PDF nobody can query. By the time someone assembles the picture, the client has already had their follow-up.",
  },
  {
    title: "Compliance as an afterthought",
    body: "Consent is a checkbox in one tool and a signature in another. When an auditor asks who opened which record and when, the answer has to be reconstructed rather than retrieved.",
  },
];

/** Column padding runs edge-to-edge: no left pad on the first, none right on the last. */
const COLUMN_PADDING = [
  "md:border-r md:border-line md:py-11 md:pl-0 md:pr-11",
  "md:border-r md:border-line md:p-11",
  "md:py-11 md:pl-11 md:pr-0",
];

export function Problem() {
  return (
    <Section
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[820px]"
      contentClassName="mt-16 md:mt-[88px]"
      eyebrow="The problem"
      title={
        <>
          A clinic&apos;s data is <em className="italic text-green">scattered</em>{" "}
          across seven tools.
        </>
      }
      intro="Integrative practices run the most data-rich care in medicine on the least connected software. The cost shows up in three places, every week."
    >
      <div className="grid grid-cols-1 border-t border-line md:grid-cols-3">
        {PROBLEMS.map((problem, index) => (
          <Reveal
            key={problem.title}
            as="article"
            delay={index * 90}
            className={`py-9 ${
              index < PROBLEMS.length - 1 ? "border-b border-line" : ""
            } md:border-b-0 ${COLUMN_PADDING[index]}`}
          >
            <span className="font-display text-[44px] leading-none text-brass">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 font-display text-[28px] font-normal leading-[1.2] text-ink">
              {problem.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.8] text-muted">
              {problem.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Problem;
