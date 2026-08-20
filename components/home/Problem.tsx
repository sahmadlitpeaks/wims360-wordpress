import { Card } from "@/components/ui/Card";
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

export function Problem() {
  return (
    <Section
      eyebrow="The problem"
      title={
        <>
          A clinic&apos;s data is{" "}
          <span className="font-serif italic">scattered</span> across seven
          tools.
        </>
      }
      intro="Integrative practices run the most data-rich care in medicine on the least connected software. The cost shows up in three places, every week."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {PROBLEMS.map((problem, index) => (
          <Card key={problem.title} as="article">
            <span className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
              {problem.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {problem.body}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default Problem;
