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

export function HowItWorks() {
  return (
    <Section
      className="bg-surface"
      eyebrow="How it works"
      title={
        <>
          Three steps to a <span className="font-serif italic">single</span>{" "}
          record.
        </>
      }
      intro="Implementation is a project, not a download — but it is a bounded one, run with your team rather than handed over as a login."
    >
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {STEPS.map((step, index) => (
          <li key={step.title} className="border-t border-line pt-6">
            <span className="font-mono text-[0.72rem] uppercase leading-5 tracking-[0.14em] text-green">
              Step {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default HowItWorks;
