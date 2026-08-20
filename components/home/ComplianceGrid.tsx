import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { COMPLIANCE } from "@/content/compliance";

export function ComplianceGrid() {
  return (
    <Section
      className="bg-surface"
      eyebrow="Trust"
      title={
        <>
          Compliance built in, not{" "}
          <span className="font-serif italic">bolted</span> on.
        </>
      }
      intro="Six practices that hold across every module, because they live in the platform rather than in a policy document."
    >
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {COMPLIANCE.map((practice) => (
          <Card key={practice.title} as="li">
            <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
              {practice.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {practice.summary}
            </p>
          </Card>
        ))}
      </ul>

      <div className="mt-8">
        <Button href="/security" variant="ghost">
          Read the security overview
        </Button>
      </div>
    </Section>
  );
}

export default ComplianceGrid;
