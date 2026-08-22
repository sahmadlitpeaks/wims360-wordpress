import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { COMPLIANCE } from "@/content/compliance";

export function ComplianceGrid() {
  return (
    <Section
      className="border-y border-line bg-surface"
      revealHeader
      headerClassName="max-w-[860px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="Trust"
      title={
        <>
          Compliance built in, not <em className="italic text-green">bolted</em>{" "}
          on.
        </>
      }
      intro="Six practices that hold across every module, because they live in the platform rather than in a policy document."
    >
      <ul className="grid list-none grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {COMPLIANCE.map((practice, index) => (
          <Reveal
            key={practice.title}
            as="li"
            delay={Math.min(index % 3, 4) * 90}
            className="bg-surface p-8 md:p-11"
          >
            <h3 className="font-display text-[28px] font-normal leading-[1.15] text-ink">
              {practice.title}
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.8] text-muted">
              {practice.summary}
            </p>
          </Reveal>
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
