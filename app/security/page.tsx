import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { COMPLIANCE } from "@/content/compliance";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Security, permissions and consent are part of the WIMS 360 platform rather than an afterthought: audit logging, versioned consent, role-based access, two-factor authentication, defined retention, secure data and governed AI. HIPAA-aligned and GDPR-ready.",
};

/** Hairline colour for dividers on the green-deep ground. */
const BRASS_RULE = "border-[rgba(176,132,68,.28)]";

/** Posture, stated the way it is allowed to be stated — aligned, never certified. */
const POSTURE = [
  "HIPAA-aligned",
  "GDPR-ready",
  "Encrypted in transit and at rest",
];

const STANCE: { role: string; label: string; body: string }[] = [
  {
    role: "WIMS 360",
    label: "Business Associate / Processor",
    body: "We process client health information on your behalf, under the terms of the Business Associate Agreement and Data Processing Agreement you sign with us. We do not decide why the information is collected or how it is used clinically — you do.",
  },
  {
    role: "Your practice",
    label: "Covered Entity / Controller",
    body: "Your practice remains the Covered Entity under HIPAA and the Controller under GDPR. You set the clinical purpose, you own the client relationship, and you are the party clients and regulators contact first.",
  },
];

/** The closing chip row from the approved content direction. */
const CLOSING_CHIPS = [
  "Security",
  "Consent",
  "Access Control",
  "Auditability",
  "Privacy",
];

export default function SecurityPage() {
  return (
    <>
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div className="container-site">
          <Reveal>
            <Eyebrow tone="dark">Security</Eyebrow>
            <h1 className="mt-8 max-w-[18ch] font-display text-[clamp(2.6rem,6.2vw,78px)] font-normal leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              Built into the <em className="italic text-brass">platform</em>.
            </h1>
            <p className="mt-10 max-w-[64ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              WIMS 360 is designed so security, permissions and consent are part
              of the platform rather than an afterthought. They are not a policy
              document maintained alongside the product — they are the way the
              client record behaves in every module, on every screen, for every
              role.
            </p>

            <ul className="mt-10 flex list-none flex-wrap gap-2">
              {POSTURE.map((item) => (
                <li key={item}>
                  <Chip
                    tone="neutral"
                    className={cn(
                      "border-[rgba(176,132,68,.4)] bg-transparent text-[rgba(242,239,230,.8)]",
                    )}
                  >
                    {item}
                  </Chip>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                href="/contact?package=security"
                variant="primary"
                size="lg"
                onDark
              >
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
        eyebrow="What the platform holds"
        title={
          <>
            Seven things the platform holds{" "}
            <em className="italic text-green">everywhere</em>.
          </>
        }
        intro="Each one is enforced by the product rather than maintained beside it, so it holds the same way in the first module a practice switches on as in the last."
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
        contentClassName="mt-14 md:mt-16"
        eyebrow="AI governance"
        title={
          <>
            Intelligence on the{" "}
            <em className="italic text-brass">same</em> terms.
          </>
        }
        intro="Dr.T and the Wellness Companion are governed through explicit client consent and the appropriate organisational controls. Every AI-generated clinical action remains subject to the relevant permissions, consent and professional review — a practice can also run WIMS 360 with no AI at all."
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button
            href="/ai#governance"
            variant="ghost"
            onDark
            className="border-[rgba(176,132,68,.5)] text-[10.5px] text-brass hover:border-paper hover:text-paper"
          >
            Read how Dr.T is governed
          </Button>
        </div>
      </Section>

      <section className="border-y border-line bg-surface py-24 md:py-[140px]">
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
                Security assessments, the list of services we rely on,
                infrastructure detail and the full Data Processing Agreement and
                Business Associate Agreement text are shared once an NDA is in
                place — request the pack and we&apos;ll route it to the right
                person.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button
                  href="/contact?package=security"
                  variant="dark"
                  size="lg"
                >
                  Request the DPA/BAA pack
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Book a security call
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16 border-t border-line pt-10 md:mt-20 md:pt-12">
            <ul className="flex list-none flex-wrap items-center gap-x-3 gap-y-3">
              {CLOSING_CHIPS.map((chip, index) => (
                <li key={chip} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "hidden h-px w-6 border-t sm:block",
                        BRASS_RULE,
                      )}
                    />
                  ) : null}
                  <Chip tone="green">{chip}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        ground="bg"
        title={
          <>
            Bring your security lead to a{" "}
            <em className="italic text-green">live</em> walkthrough.
          </>
        }
        body="We'll walk your security or compliance lead through the audit trail, the consent records and the permission model directly in the product."
        primary={{ label: "Book a security call", href: "/contact" }}
        secondary={{ label: "See how Dr.T is governed", href: "/ai#governance" }}
      />
    </>
  );
}
