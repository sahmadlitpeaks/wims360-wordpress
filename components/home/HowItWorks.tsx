import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Step = { title: string; body: string };

const STEPS: Step[] = [
  {
    title: "Discover",
    body: "The client record opens with history, discovery notes and the care team, so everything that follows has somewhere to land.",
  },
  {
    title: "Investigate",
    body: "Assessments, clinical examinations, laboratory work, genetics and imaging are recorded as structured data rather than as documents.",
  },
  {
    title: "Understand",
    body: "Findings are read together — compared across the journey, mapped to pathways, and reviewed with Dr.T where a practice has it enabled.",
  },
  {
    title: "Heal",
    body: "A personalised healing plan brings nutrition, supplementation, medication and therapies into one plan the client can follow.",
  },
  {
    title: "Connect",
    body: "Bookings, reminders, secure chat and the client portal keep the client and the care team in contact before, during and after every appointment.",
  },
  {
    title: "Track",
    body: "Supported wearables, vitals and lifestyle logs continue the story between appointments, on the same timeline as clinical findings.",
  },
  {
    title: "Evolve",
    body: "Progress is reviewed against what came before, and the plan is revised as new findings arrive. The journey never stops.",
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
          <em className="italic text-green">continuous</em> journey.
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
            <h3 className="mt-6 font-display text-[26px] font-normal leading-[1.15] text-ink">
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
          <p className="font-display text-[clamp(1.3rem,2.2vw,27px)] leading-[1.35] text-paper [text-wrap:pretty]">
            And then it begins again, with more of the story than last time.
          </p>
        </Reveal>
      </ol>
    </Section>
  );
}

export default HowItWorks;
