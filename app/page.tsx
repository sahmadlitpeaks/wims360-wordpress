import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <Section
        eyebrow="WIMS 360"
        title={
          <>
            The operating system for{" "}
            <span className="font-serif italic">integrative</span> wellness
            clinics.
          </>
        }
        intro="Site under construction — the design system primitives and site chrome are in place."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" size="lg">
            Book a demo
          </Button>
          <Button href="/packages" variant="outline" size="lg">
            Request pricing
          </Button>
          <Button href="/platform" variant="ghost">
            Explore the platform
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card>
            <Chip tone="green">Clinical</Chip>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Intake, diagnostics and care plans in one clinical record.
            </p>
          </Card>
          <Card>
            <Chip tone="neutral">Operations</Chip>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Booking, packages and centres run from a single console.
            </p>
          </Card>
          <Card>
            <Chip tone="amber">Governance</Chip>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Consent-gated AI, clinician-approved writes, full audit trail.
            </p>
          </Card>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
