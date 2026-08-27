import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { COMPLIANCE } from "@/content/compliance";

/** Posture, stated the way it is allowed to be stated — aligned, never certified. */
const POSTURE = ["HIPAA-aligned", "GDPR-ready", "Encrypted in transit and at rest"];

export function ComplianceGrid() {
  return (
    <Section
      id="security"
      className="border-y border-line bg-surface"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="Security & privacy"
      title={
        <>
          Built into the <em className="text-teal-deep">platform</em>.
        </>
      }
      intro="Client health information is handled under versioned consent, role-based access and a recorded audit trail. These practices hold across every module because they live in the platform rather than in a policy document."
    >
      <ul className="mb-10 flex list-none flex-wrap gap-2 md:mb-12">
        {POSTURE.map((item) => (
          <li key={item}>
            <Chip tone="green">{item}</Chip>
          </li>
        ))}
      </ul>

      {/*
        Each cell owns its border and overlaps its neighbour by a pixel, so
        shared edges collapse to one hairline and a ragged final row (seven
        practices in a three-column grid) leaves clean ground beside it rather
        than the coloured empty cell a `gap-px` background grid would show.
      */}
      <ul className="grid list-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {COMPLIANCE.map((practice, index) => (
          <li key={practice.title} className="-mb-px -mr-px border border-line">
            <Reveal
              delay={Math.min(index % 3, 4) * 90}
              className="flex h-full flex-col p-8 md:p-11"
            >
              <h3 className="font-display text-[28px] font-semibold leading-[1.15] text-ink">
                {practice.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.8] text-muted">
                {practice.summary}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-10 md:mt-11">
        <Button href="/security" variant="ghost">
          Read the security overview
        </Button>
      </div>
    </Section>
  );
}

export default ComplianceGrid;
