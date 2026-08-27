import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Step = { title: string; body: string };

const STEPS: Step[] = [
  {
    title: "Discover",
    body: "History, goals and the care team, in one record.",
  },
  {
    title: "Investigate",
    body: "Assessments, labs, genetics and imaging as structured data.",
  },
  {
    title: "Understand",
    body: "Findings read together, compared across the journey.",
  },
  {
    title: "Heal",
    body: "One plan across nutrition, supplements, medication and therapies.",
  },
  {
    title: "Connect",
    body: "Bookings, reminders and secure chat keep everyone in contact.",
  },
  {
    title: "Track",
    body: "Supported wearables, vitals and lifestyle logs continue the story between appointments, on the same timeline as clinical findings.",
  },
  {
    title: "Evolve",
    body: "Progress is reviewed against what came before, and the plan is revised as new findings arrive.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      className="border-t border-line bg-surface"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-[88px]"
      eyebrow="How it works"
      title={
        <>
          Seven steps, one{" "}
          <em className="text-teal-deep">continuous</em> journey.
        </>
      }
      intro="The same sequence a practice already follows — with each step writing to the record the next step reads."
    >
      <ol className="grid list-none grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <Reveal
            key={step.title}
            as="li"
            delay={Math.min(index % 4, 4) * 90}
            className="bg-surface p-8 md:p-10"
          >
            <span className="font-display text-[40px] leading-none text-brass">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 font-display text-[26px] font-semibold leading-[1.15] text-ink">
              {step.title}
            </h3>
            <p className="mt-3.5 text-[14.5px] leading-[1.8] text-muted">
              {step.body}
            </p>
          </Reveal>
        ))}

        <Reveal
          as="li"
          delay={270}
          className="flex items-end bg-green-deep p-8 md:p-10"
        >
          <p className="font-display text-[clamp(1.29rem,2.19vw,26px)] leading-[1.35] text-paper [text-wrap:pretty]">
            And then it begins again, with more of the story than last time.
          </p>
        </Reveal>
      </ol>
    </Section>
  );
}

export default HowItWorks;
