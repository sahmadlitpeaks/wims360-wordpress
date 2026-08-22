import type { Metadata } from "next";
import Link from "next/link";
import { LoopTabs } from "@/components/ai/LoopTabs";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Dr.T AI",
  description:
    "Two AIs, one rule: clinicians stay in charge. Dr.T Copilot reads the clinical record and drafts across five loops; the Wellness Companion is the separate, deliberately narrower client-facing agent. Both are consent-gated, audit-logged and off by default.",
};

const HERO_NOTES = [
  "Consent-gated per client",
  "Clinician-approved writes",
  "Audit-logged access",
];

const AGENTS: {
  name: string;
  audience: string;
  blurb: string;
  anchor: string;
}[] = [
  {
    name: "Dr.T Copilot",
    audience: "For your clinicians",
    blurb:
      "Reads assessments, labs, wearables and genomics, then drafts the ladder, the insight, the plan or the case review for review.",
    anchor: "#loops",
  },
  {
    name: "Wellness Companion",
    audience: "For your clients",
    blurb:
      "Explains a client's own reports, logs a meal from a photo and logs symptoms. Deliberately narrower, and it stays that way.",
    anchor: "#companion",
  },
];

const COMPANION_CAN = [
  "Explain the client's own reports back to them in plain language",
  "Log a meal from a photo the client sends",
  "Log symptoms, and escalate the serious ones to the care team",
];

const COMPANION_CANNOT = [
  "Prescribe anything",
  "Order a test or a panel",
  "Book, move or cancel an appointment",
  "Message anyone on its own",
];

const GOVERNANCE: { title: string; body: string }[] = [
  {
    title: "Consent-gated, per client",
    body: "Every Dr.T response is gated on that client's consent. No active consent, no AI response about that client — the gate sits in the platform, not in a policy document.",
  },
  {
    title: "The AI drafts, the clinician decides",
    body: "Every write requires explicit clinician approval. Dr.T proposes an output; a person confirms it. Nothing reaches the record or the client on the model's own say-so.",
  },
  {
    title: "Every access is audit-logged",
    body: "What was read, what was drafted and who approved it are all recorded — so an AI-assisted decision can be reconstructed months later like any other clinical entry.",
  },
  {
    title: "Off by default",
    body: "AI is disabled until you turn it on. It is enabled per customer once a BAA or DPA is signed, which means a clinic that wants WIMS 360 without any AI simply runs it that way.",
  },
  {
    title: "Two agents, two capability sets",
    body: "The client-facing Wellness Companion is a separate agent with its own, smaller set of abilities. Giving the clinical Copilot a new capability does not hand that capability to clients.",
  },
];

export default function AiPage() {
  return (
    <>
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div className="container-site">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <Eyebrow tone="dark">Dr.T AI</Eyebrow>
              <h1 className="mt-8 font-display text-[clamp(2.6rem,6.2vw,78px)] font-normal leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
                Two AIs. One rule: clinicians stay in{" "}
                <em className="italic text-brass">charge</em>.
              </h1>
              <p className="mt-10 max-w-[56ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
                Dr.T Copilot reads the clinical record and drafts. The Wellness
                Companion talks to clients and does far less on purpose. Neither
                one writes anything a clinician has not approved, and neither
                one runs at all until you switch it on.
              </p>

              <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button href="/contact" variant="primary" size="lg" onDark>
                  See Dr.T in a demo
                </Button>
                <Button href="#loops" variant="outlineLight" size="lg" onDark>
                  See the five loops
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

            <Reveal
              delay={90}
              className="border border-[rgba(176,132,68,.35)]"
            >
              {AGENTS.map((agent) => (
                <article
                  key={agent.name}
                  className="border-b border-[rgba(176,132,68,.35)] p-8 md:p-10"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                    {agent.audience}
                  </p>
                  <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,36px)] font-normal leading-[1.1] text-paper">
                    {agent.name}
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.8] text-[rgba(242,239,230,.66)]">
                    {agent.blurb}
                  </p>
                  <Link
                    href={agent.anchor}
                    className="mt-6 inline-flex font-mono text-[10px] uppercase tracking-[0.18em] text-brass transition-colors duration-300 hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-green-deep"
                  >
                    What it does
                  </Link>
                </article>
              ))}

              <div className="bg-[rgba(176,132,68,.12)] px-8 py-7 md:px-10">
                <p className="text-sm leading-[1.75] text-[rgba(242,239,230,.78)]">
                  Both are off until a BAA or DPA is signed, and both are gated
                  on the client&rsquo;s own consent.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <LoopTabs />

      <Section
        id="companion"
        className="scroll-mt-24 bg-bg"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-16 md:mt-20"
        eyebrow="The client side"
        title={
          <>
            The Wellness Companion is{" "}
            <em className="italic text-green">smaller</em> on purpose.
          </>
        }
        intro="Clients get their own agent in the portal — a separate one, not the clinical Copilot with a friendlier tone. It can do a short, useful list of things and nothing beyond it."
      >
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          <Reveal className="bg-bg p-8 md:p-12">
            <h3 className="font-display text-[clamp(1.75rem,3vw,34px)] font-normal leading-[1.1] text-ink">
              What it does
            </h3>
            <ul className="mt-8 list-none border-t border-line">
              {COMPANION_CAN.map((item, index) => (
                <li
                  key={item}
                  className={`py-5 text-[15px] leading-[1.8] text-muted ${
                    index < COMPANION_CAN.length - 1
                      ? "border-b border-line"
                      : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90} className="bg-green-deep p-8 text-cream md:p-12">
            <h3 className="font-display text-[clamp(1.75rem,3vw,34px)] font-normal leading-[1.1] text-paper">
              What it cannot do &mdash; by design
            </h3>
            <ul className="mt-8 list-none border-t border-[rgba(242,239,230,.16)]">
              {COMPANION_CANNOT.map((item, index) => (
                <li
                  key={item}
                  className={`py-5 text-[15px] leading-[1.8] text-[rgba(242,239,230,.66)] ${
                    index < COMPANION_CANNOT.length - 1
                      ? "border-b border-[rgba(242,239,230,.16)]"
                      : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-[22px] leading-[1.45] text-cream">
              Those actions belong to your team. A symptom the Companion judges
              serious goes to the care team rather than being answered away.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section
        id="governance"
        className="scroll-mt-24 border-y border-line bg-surface"
        revealHeader
        headerClassName="max-w-[900px]"
        contentClassName="mt-16 md:mt-20"
        eyebrow="Governance"
        title={
          <>
            The rules the AI runs <em className="italic text-green">inside</em>.
          </>
        }
        intro="These are enforced by the platform on every request, which is why they read the same whether you are asking a clinician, a compliance officer or the audit log."
      >
        <ul className="list-none border-t border-line">
          {GOVERNANCE.map((rule, index) => (
            <Reveal
              key={rule.title}
              as="li"
              delay={Math.min(index, 4) * 90}
              className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-6 gap-y-3.5 border-b border-line py-9 md:grid-cols-[44px_minmax(0,0.5fr)_minmax(0,1fr)] md:gap-8"
            >
              <span className="font-display text-[24px] leading-none text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,2.4vw,28px)] font-normal leading-[1.15] text-ink">
                {rule.title}
              </h3>
              <p className="col-span-2 text-[15px] leading-[1.8] text-muted md:col-span-1">
                {rule.body}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-11">
          <Button href="/security" variant="ghost">
            Read the security overview
          </Button>
        </div>
      </Section>

      <section className="bg-bg py-24 md:py-[140px]">
        <div className="container-site">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
            <Reveal>
              <Eyebrow>Knowledge</Eyebrow>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,4.2vw,3.75rem)] font-normal leading-[1.06] tracking-[-0.012em] text-ink [text-wrap:pretty]">
                Grounded in a library <em className="italic text-green">you</em>{" "}
                curate.
              </h2>
              <p className="mt-7 text-[17px] leading-[1.8] text-muted md:text-lg md:leading-[1.75]">
                Knowledge answers are grounded in an admin-curated reference
                library rather than whatever the model happens to have absorbed.
                Your administrators decide what goes into it, which means the
                clinical reasoning Dr.T leans on is reasoning your organization
                has agreed to.
              </p>
            </Reveal>

            <Reveal delay={90} className="border-t border-line pt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
                How it works
              </p>
              <p className="mt-5 text-base leading-[1.85] text-muted">
                An administrator uploads reference material into the library.
                When a question calls for it, Dr.T retrieves from that library
                and cites what it used, the same way it cites a lab marker or a
                Chex form. Add a document and it becomes available; remove one
                and it stops being used.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        ground="surface"
        title={
          <>
            See Dr.T read a <em className="italic text-green">real</em> record.
          </>
        }
        body="Bring one anonymized case and we'll run the loops against it live — the ladder, the insight, the plan — and stop at every point where a clinician has to approve."
        primary={{ label: "See Dr.T in a demo", href: "/contact" }}
        secondary={{ label: "Security approach", href: "/security" }}
      />
    </>
  );
}
