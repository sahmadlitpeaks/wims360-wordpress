import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const STEPS = [
  {
    title: "Connect the stack",
    body: "Staff accounts come in through Azure AD single sign-on, wearables through Terra and Ultrahuman, and lab results through the partner-lab portal or your own LIMS. Onboarding migrates the clients and history you already hold.",
  },
  {
    title: "Shape it to your clinic",
    body: "Switch on the modules you need, map your team onto the fourteen roles, and set what each dashboard shows. Chex forms mirror the protocols you already run, including custom ones.",
  },
  {
    title: "Deliver better care",
    body: "Book, examine, analyze and prescribe against one record. The ladder scores itself from every source, Dr.T drafts for review where it is enabled, and the client sees the plan in the portal the same day.",
  },
];

/** Column padding runs edge-to-edge: no left pad on the first, none right on the last. */
const COLUMN_PADDING = [
  "md:border-r md:border-line md:pl-0 md:pr-11 md:pt-11",
  "md:border-r md:border-line md:px-11 md:pt-11",
  "md:pl-11 md:pr-0 md:pt-11",
];

export function HowItWorks() {
  return (
    <Section
      className="border-t border-line bg-surface"
      revealHeader
      headerClassName="max-w-[860px]"
      contentClassName="mt-16 md:mt-[88px]"
      eyebrow="How it works"
      title={
        <>
          Three steps to a <em className="italic text-green">single</em> record.
        </>
      }
      intro="Implementation is a project, not a download — but it is a bounded one, run with your team rather than handed over as a login."
    >
      <ol className="grid list-none grid-cols-1 border-t border-line md:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal
            key={step.title}
            as="li"
            delay={index * 90}
            className={`pt-9 ${
              index < STEPS.length - 1 ? "border-b border-line pb-9" : ""
            } md:border-b-0 md:pb-0 ${COLUMN_PADDING[index]}`}
          >
            <span className="font-display text-[44px] leading-none text-brass">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 font-display text-[30px] font-normal leading-[1.15] text-ink">
              {step.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.8] text-muted">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export default HowItWorks;
