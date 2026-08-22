import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { COMPLIANCE } from "@/content/compliance";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "WIMS 360 operates as a HIPAA Business Associate and a GDPR Processor. Audit logging, versioned consent, enforced 2FA, retention and erasure workflows, a 72-hour breach process and encrypted infrastructure — plus how the AI layer is governed.",
};

/** Hairline colour for dividers on the green-deep ground. */
const BRASS_RULE = "border-[rgba(176,132,68,.28)]";

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
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div className="container-site">
          <Reveal>
            <Eyebrow tone="dark">Security &amp; Compliance</Eyebrow>
            <h1 className="mt-8 max-w-[22ch] font-display text-[clamp(2.6rem,6.2vw,78px)] font-normal leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              Compliance is a <em className="italic text-brass">platform</em>{" "}
              property, not a policy binder.
            </h1>
            <p className="mt-10 max-w-[64ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              WIMS 360 operates as a HIPAA Business Associate and a GDPR
              Processor. Your clinic remains the Covered Entity and the
              Controller — the party that decides why the data exists and who it
              belongs to. Here is how we hold up our side.
            </p>

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/contact?package=security" variant="primary" size="lg" onDark>
                Request the DPA/BAA pack
              </Button>
              <Button href="/contact" variant="outlineLight" size="lg" onDark>
                Book a security call
              </Button>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-[rgba(176,132,68,.28)] md:mt-[88px] md:grid-cols-2">
            {STANCE.map((party, index) => (
              <Reveal
                key={party.role}
                as="article"
                delay={index * 90}
                className={cn(
                  "bg-green-deep py-10 md:py-11",
                  index === 0 ? "md:pr-11" : "md:pl-11",
                )}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  {party.label}
                </p>
                <h2 className="mt-[18px] font-display text-[clamp(1.8rem,3.2vw,38px)] font-normal leading-[1.08] text-paper">
                  {party.role}
                </h2>
                <p className="mt-[18px] text-[15.5px] leading-[1.85] text-[rgba(242,239,230,.66)]">
                  {party.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section
        className="bg-bg"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-16 md:mt-20"
        eyebrow="Practices"
        title={
          <>
            Six practices, held{" "}
            <em className="italic text-green">everywhere</em> in the platform.
          </>
        }
        intro="These are not a checklist we maintain alongside the product — they are enforced by it, module by module."
      >
        <div className="border-t border-line">
          {COMPLIANCE.map((practice, index) => (
            <Reveal
              key={practice.title}
              as="article"
              delay={Math.min(index, 4) * 90}
              className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-6 gap-y-6 border-b border-line py-10 md:grid-cols-[64px_minmax(0,0.52fr)_minmax(0,1fr)] md:gap-10 md:py-12"
            >
              <span className="font-display text-[34px] leading-none text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="col-span-1">
                <h3 className="font-display text-[clamp(1.6rem,2.6vw,32px)] font-normal leading-[1.1] text-ink">
                  {practice.title}
                </h3>
                <p className="mt-[18px] text-[15px] leading-[1.8] text-muted">
                  {practice.summary}
                </p>
              </div>
              <ul className="col-span-2 list-none border-t border-line md:col-span-1">
                {practice.points.map((point) => (
                  <li
                    key={point}
                    className="border-b border-line py-4 text-[14.5px] leading-[1.75] text-muted"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        ground="dark"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-16 md:mt-20"
        eyebrow="AI governance"
        title={
          <>
            The AI layer runs under the{" "}
            <em className="italic text-brass">same</em> rules.
          </>
        }
        intro="Dr.T Copilot and the Wellness Companion are covered by the same posture as the rest of the platform, enforced at the platform level rather than left to a prompt."
      >
        <ul className="grid list-none grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {GOVERNANCE.map((fact, index) => (
            <Reveal
              key={fact.title}
              as="li"
              delay={index * 90}
              className={cn(
                index > 0 && "lg:pl-9",
                index < GOVERNANCE.length - 1 && `lg:border-r lg:pr-9 ${BRASS_RULE}`,
              )}
            >
              <h3 className="font-display text-[clamp(1.5rem,2.2vw,28px)] font-normal leading-[1.14] text-paper">
                {fact.title}
              </h3>
              <p className="mt-[18px] text-[14.5px] leading-[1.8] text-[rgba(242,239,230,.62)]">
                {fact.body}
              </p>
            </Reveal>
          ))}
        </ul>

        {/*
          Ghost `Button` with a `className` override: safe now that `cn` pipes
          through `tailwind-merge`, so `text-brass` reliably beats the ghost
          variant's `text-green` on this green-deep ground.
        */}
        <div className="mt-12 md:mt-14">
          <Button
            href="/ai"
            variant="ghost"
            onDark
            className="border-[rgba(176,132,68,.5)] text-[10.5px] text-brass hover:border-paper hover:text-paper"
          >
            Read the full AI governance page
          </Button>
        </div>
      </Section>

      <section className="border-b border-line bg-surface py-24 md:py-[140px]">
        <div className="container-site">
          <Reveal className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-20">
            <div>
              <Eyebrow>Documentation</Eyebrow>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,4.2vw,3.75rem)] font-normal leading-[1.06] tracking-[-0.012em] text-ink [text-wrap:pretty]">
                Deeper documentation is available{" "}
                <em className="italic text-green">under NDA</em>.
              </h2>
            </div>
            <div>
              <p className="text-[17px] leading-[1.8] text-muted">
                Penetration test summaries, subprocessor lists, infrastructure
                diagrams and the full DPA/BAA text are shared once an NDA is in
                place — request the pack and we&apos;ll route it to the right
                person.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button href="/contact?package=security" variant="dark" size="lg">
                  Request the DPA/BAA pack
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Book a security call
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Bring your security team to a{" "}
            <em className="italic text-green">live</em> walkthrough.
          </>
        }
        body="We'll walk your security or compliance lead through the audit log, the consent registry and the breach process directly in the product."
        primary={{ label: "Book a security call", href: "/contact" }}
        secondary={{ label: "See Dr.T governance", href: "/ai" }}
      />
    </>
  );
}
