import type { Metadata } from "next";
import { CompanionPhone } from "@/components/mocks/CompanionPhone";
import { CopilotChat } from "@/components/mocks/CopilotChat";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Dr.T AI",
  description:
    "Dr.T works across the information available within the client's record — analysing in seconds, comparing findings across the history and surfacing relationships a single report would not show. Intelligent assistance, human oversight: every AI-assisted clinical action stays subject to permissions, consent and professional review.",
};

const HERO_NOTES = [
  "Works within the client record",
  "Consent and permissions apply",
  "Professional review before anything counts",
];

/**
 * The approved capability list. These are CAPABILITIES, deliberately named for
 * what a practitioner gets — never for the internal workflow that produces it.
 */
const CAPABILITIES: { title: string; body: string }[] = [
  {
    title: "Analyse individual reports",
    body: "A report can be read marker by marker in the context of the client it belongs to, rather than as a document to be interpreted from scratch each time.",
  },
  {
    title: "Compare results over time",
    body: "Findings from today can be set against any earlier point in the journey, so a direction of travel is visible instead of a single reading.",
  },
  {
    title: "Review broader health information",
    body: "Assessments, examinations, laboratory results, genomics, imaging and live data are all available to the same review, where the client has consented to their use.",
  },
  {
    title: "Generate health insights",
    body: "Observations are drafted from what the record holds and presented for the practitioner to accept, amend or discard.",
  },
  {
    title: "Identify patterns across multiple sources",
    body: "Relationships that only appear when several sources are read together can be surfaced — something a single document cannot show on its own.",
  },
  {
    title: "Assist with case review",
    body: "Preparation for a review appointment can be gathered in one pass, so the practitioner arrives with the history already assembled.",
  },
  {
    title: "Draft recommendations for practitioner review",
    body: "Recommendations are drafts. Nothing reaches the record or the client until a practitioner has reviewed and approved it.",
  },
  {
    title: "Support personalised healing plans",
    body: "Plan content can be drafted from the client's own findings, and revised as new results arrive, with the practitioner making every decision.",
  },
  {
    title: "Work within a client-specific clinical context",
    body: "Each response is scoped to one client's record. Dr.T does not answer about a client whose information the practitioner is not permitted to see.",
  },
];

const COMPANION_SCOPE = [
  "Explains the plan the care team has shared, in plain language",
  "Encourages logging, habits and everyday adherence",
  "Answers questions about what the client has already been given",
  "Directs clinical questions back to the care team",
];

const COMPANION_LIMITS = [
  "It works only from what the care team has chosen to share",
  "It does not diagnose, prescribe or order investigations",
  "It is active only where the client's consent is active",
  "It is a separate, narrower assistant — not Dr.T with a friendlier tone",
];

const GOVERNANCE: { title: string; body: string }[] = [
  {
    title: "Consent",
    body: "Consent is versioned rather than a single checkbox, and AI-assisted features carry their own consent. Where that consent is not active, Dr.T does not run for that client.",
  },
  {
    title: "Permissions",
    body: "Access follows the same role-based permissions as the rest of the platform. Dr.T can read no more of a client's record than the practitioner asking is permitted to read.",
  },
  {
    title: "Audit",
    body: "What was read, what was drafted and who approved it are recorded, so an AI-assisted decision can be reconstructed later like any other clinical entry.",
  },
  {
    title: "Professional review",
    body: "Every AI-generated clinical action remains subject to professional review. Dr.T proposes; a practitioner decides, and nothing is written to the record without that decision.",
  },
  {
    title: "Withdrawal of AI consent",
    body: "A client can withdraw consent for AI-assisted features from the consent centre in their portal, without withdrawing from care. AI-assisted features stop applying to their record from that point.",
  },
  {
    title: "HIPAA-aligned, GDPR-ready",
    body: "The same encryption, retention and erasure workflows that cover the rest of the client record cover AI-assisted features. The platform is built to support HIPAA-aligned and GDPR-ready operation.",
  },
];

export default function AiPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 80% at 84% 0%,rgba(14,107,78,.32),transparent 62%)",
          }}
        />

        <div className="container-site relative">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-20">
            <Reveal>
              <Eyebrow tone="dark">Meet Dr.T</Eyebrow>
              <h1 className="mt-8 font-display text-[clamp(2.6rem,6.2vw,78px)] font-normal leading-[1.02] tracking-[-0.015em] text-paper [text-wrap:pretty]">
                AI that sees the whole story —{" "}
                <em className="italic text-brass">not just one report</em>.
              </h1>
              <p className="mt-10 max-w-[58ch] text-[17px] leading-[1.8] text-[rgba(242,239,230,.72)] md:text-lg md:leading-[1.75]">
                Dr.T works across the information available within the
                client&rsquo;s record. It can analyse in seconds, compare
                findings across the history, and surface relationships and
                patterns a single document would not show.
              </p>
              <p className="mt-6 max-w-[58ch] text-[15.5px] leading-[1.85] text-[rgba(242,239,230,.6)]">
                Assessments, examinations, laboratory results, genomics, imaging
                and live health data are read together, in the context of one
                client, so the care team can see how findings relate rather than
                reading each report on its own.
              </p>

              <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button href="/contact" variant="primary" size="lg" onDark>
                  Book a demo
                </Button>
                <Button
                  href="#capabilities"
                  variant="outlineLight"
                  size="lg"
                  onDark
                >
                  What Dr.T can do
                </Button>
              </div>

              <ul className="mt-14 flex list-none flex-wrap gap-x-8 gap-y-3 border-t border-[rgba(242,239,230,.14)] pt-8">
                {HERO_NOTES.map((note) => (
                  <li
                    key={note}
                    className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(242,239,230,.5)]"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={90}>
              <CopilotChat />
            </Reveal>
          </div>
        </div>
      </section>

      <Section
        id="capabilities"
        ground="surface"
        className="scroll-mt-24"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-14 md:mt-16"
        eyebrow="Capabilities"
        title={
          <>
            Dr.T can help practitioners{" "}
            <em className="italic text-green">see more</em> of the story.
          </>
        }
        intro="Nine things Dr.T can help a practitioner do. Each one is available where the client's consent and the practitioner's permissions allow it, and each one produces something a person reviews."
      >
        <ul className="list-none border-t border-line">
          {CAPABILITIES.map((capability, index) => (
            <Reveal
              key={capability.title}
              as="li"
              delay={Math.min(index, 4) * 90}
              className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-6 gap-y-3.5 border-b border-line py-8 md:grid-cols-[52px_minmax(0,0.62fr)_minmax(0,1fr)] md:gap-8"
            >
              <span className="font-display text-[24px] leading-none text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.4rem,2.3vw,27px)] font-normal leading-[1.18] text-ink">
                {capability.title}
              </h3>
              <p className="col-span-2 text-[14.5px] leading-[1.8] text-muted md:col-span-1">
                {capability.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section ground="bg" contentClassName="mt-0">
        <Reveal className="max-w-[1000px] border-t border-line pt-12 md:pt-16">
          <p className="font-display text-[clamp(2rem,4.2vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.012em] text-ink [text-wrap:pretty]">
            Dr.T does not replace the practitioner. It helps the practitioner{" "}
            <em className="italic text-green">see more of the story</em>,
            faster.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] md:gap-16">
            <p className="font-mono text-[11px] uppercase leading-[1.9] tracking-[0.18em] text-brass-deep">
              Intelligent assistance.
              <br />
              Human oversight.
            </p>
            <p className="text-[15.5px] leading-[1.85] text-muted md:text-base">
              Every AI-generated clinical action remains subject to the
              appropriate permissions, consent and professional review. Dr.T
              drafts, cites what it read and stops — a practitioner decides what
              becomes part of the record and what the client sees.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section
        id="companion"
        ground="surface"
        className="scroll-mt-24"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-14 md:mt-16"
        eyebrow="Wellness Companion"
        title={
          <>
            The client-facing assistant is{" "}
            <em className="italic text-green">narrower</em> on purpose.
          </>
        }
        intro="Clients get their own assistant in the portal and mobile app — a separate one, restricted to what the care team has chosen to share, and active only where the client's consent is active."
      >
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="max-w-[62ch] text-[15.5px] leading-[1.85] text-muted md:text-base">
                The Wellness Companion helps a client understand the plan they
                are on, answer everyday questions about it and keep to the
                habits the care team has recommended. It is not the clinical
                assistant in a friendlier tone; it is a different assistant with
                a smaller set of things it can do, and it stays that way.
              </p>
            </Reveal>

            <Reveal delay={90} className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
                What it does
              </p>
              <ul className="mt-6 list-none border-t border-line">
                {COMPANION_SCOPE.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line py-4 text-[15px] leading-[1.8] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180} className="mt-12 bg-green-deep p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                Deliberately narrow
              </p>
              <ul className="mt-6 list-none border-t border-[rgba(176,132,68,.28)]">
                {COMPANION_LIMITS.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[rgba(176,132,68,.2)] py-4 text-[14.5px] leading-[1.8] text-[rgba(242,239,230,.72)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 flex flex-wrap gap-2">
                <Chip tone="amber">Consent-gated</Chip>
                <Chip tone="amber">Shared content only</Chip>
                <Chip tone="amber">Care team escalation</Chip>
              </p>
            </Reveal>
          </div>

          <Reveal delay={90} className="lg:pt-2">
            <CompanionPhone />
          </Reveal>
        </div>
      </Section>

      <Section
        id="governance"
        ground="dark"
        className="scroll-mt-24"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-14 md:mt-16"
        eyebrow="Governance"
        title={
          <>
            The rules AI-assisted features run{" "}
            <em className="italic text-brass">inside</em>.
          </>
        }
        intro="These apply on every request, which is why they read the same whether the question comes from a practitioner, a compliance officer or the audit trail."
      >
        <ul className="grid list-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {GOVERNANCE.map((rule, index) => (
            <Reveal
              key={rule.title}
              as="li"
              delay={Math.min(index % 3, 4) * 90}
              className="-mb-px -mr-px border border-[rgba(176,132,68,.28)] p-7 md:p-8"
            >
              <h3 className="font-display text-[23px] font-normal leading-[1.2] text-paper">
                {rule.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8] text-[rgba(242,239,230,.66)]">
                {rule.body}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12">
          <Button href="/security" variant="outlineLight" size="lg" onDark>
            Read the security overview
          </Button>
        </div>
      </Section>

      <CtaBand
        ground="bg"
        title={
          <>
            See Dr.T read one <em className="italic text-green">real</em>{" "}
            client story.
          </>
        }
        body="Bring an anonymised case from your own practice. We'll show how Dr.T reads across the record, what it can draft, and every point at which a practitioner has to review before anything counts."
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
      />
    </>
  );
}
