import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { COMPLIANCE } from "@/content/compliance";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "WIMS 360 operates as a HIPAA Business Associate and a GDPR Processor. Audit logging, versioned consent, enforced 2FA, retention and erasure workflows, a 72-hour breach process and encrypted infrastructure — plus how the AI layer is governed.",
};

const STANCE: { role: string; label: string; body: string }[] = [
  {
    role: "WIMS 360",
    label: "Business Associate / Processor",
    body: "We process protected health information on your behalf, under the terms of the BAA and DPA you sign with us. We do not decide why the data is collected or how it is used clinically — you do.",
  },
  {
    role: "Your clinic",
    label: "Covered Entity / Controller",
    body: "You remain the Covered Entity under HIPAA and the Controller under GDPR. You set the clinical purpose, own the client relationship, and are the party clients and regulators contact first.",
  },
];

const GOVERNANCE: { title: string; body: string }[] = [
  {
    title: "Consent-gated, per client",
    body: "AI features are gated on that individual client's consent, including a separate, revocable AI consent — not one blanket toggle for the account.",
  },
  {
    title: "Clinician approval on every write",
    body: "Dr.T Copilot and the Wellness Companion draft; nothing is written to the clinical record without a clinician confirming it first.",
  },
  {
    title: "Audit-logged",
    body: "What was read, what was drafted and who approved it are recorded in the same append-only audit log as every other clinical action.",
  },
  {
    title: "Off until the paperwork is signed",
    body: "AI is disabled by default and enabled per customer only once a BAA or DPA is in place — a clinic can run WIMS 360 with no AI at all.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-line py-16 md:py-24">
        <div className="container-site">
          <div className="max-w-2xl">
            <Eyebrow>Security &amp; Compliance</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
              Compliance is a{" "}
              <span className="font-serif italic">platform</span> property,
              not a policy binder.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              WIMS 360 operates as a HIPAA Business Associate and a GDPR
              Processor. Your clinic remains the Covered Entity and the
              Controller — the party that decides why the data exists and who
              it belongs to. Here is how we hold up our side.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact?package=security" size="lg">
                Request the DPA/BAA pack
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Book a security call
              </Button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2">
            {STANCE.map((party) => (
              <Card key={party.role}>
                <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green">
                  {party.label}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                  {party.role}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {party.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Section
        eyebrow="Practices"
        title={
          <>
            Six practices, held{" "}
            <span className="font-serif italic">everywhere</span> in the
            platform.
          </>
        }
        intro="These are not a checklist we maintain alongside the product — they are enforced by it, module by module."
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
              <ul className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4">
                {practice.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </ul>
      </Section>

      <Section
        className="bg-surface"
        eyebrow="AI governance"
        title={
          <>
            The AI layer runs under the{" "}
            <span className="font-serif italic">same</span> rules.
          </>
        }
        intro="Dr.T Copilot and the Wellness Companion are covered by the same posture as the rest of the platform, enforced at the platform level rather than left to a prompt."
      >
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {GOVERNANCE.map((fact) => (
            <Card key={fact.title} as="li" className="bg-bg">
              <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-ink">
                {fact.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {fact.body}
              </p>
            </Card>
          ))}
        </ul>

        <div className="mt-8">
          <Button href="/ai" variant="ghost">
            Read the full AI governance page
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Documentation"
        title={
          <>
            Deeper documentation is available{" "}
            <span className="font-serif italic">under NDA</span>.
          </>
        }
        intro="Penetration test summaries, subprocessor lists, infrastructure diagrams and the full DPA/BAA text are shared once an NDA is in place — request the pack and we'll route it to the right person."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/contact?package=security">
            Request the DPA/BAA pack
          </Button>
          <Button href="/contact" variant="outline">
            Book a security call
          </Button>
        </div>
      </Section>

      <CtaBand
        title={
          <>
            Bring your security team to a{" "}
            <span className="font-serif italic">live</span> walkthrough.
          </>
        }
        body="We'll walk your security or compliance lead through the audit log, the consent registry and the breach process directly in the product."
        primary={{ label: "Book a security call", href: "/contact" }}
        secondary={{ label: "See Dr.T governance", href: "/ai" }}
      />
    </>
  );
}
