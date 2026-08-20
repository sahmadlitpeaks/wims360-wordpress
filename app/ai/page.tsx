import type { Metadata } from "next";
import { LoopTabs } from "@/components/ai/LoopTabs";
import { CompanionPhone } from "@/components/mocks/CompanionPhone";
import { CopilotChat } from "@/components/mocks/CopilotChat";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Dr.T AI",
  description:
    "Dr.T Copilot reads the clinical record and drafts across five loops — Ladder Chex, Health Insight, report analysis, recommendation plans and case review — and a clinician approves every write. The Wellness Companion is the separate, deliberately narrower client-facing agent.",
};

const HERO_CHIPS = [
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
      <section className="border-b border-line pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-site">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Eyebrow>Dr.T AI</Eyebrow>

              <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
                Two AIs. One rule: clinicians stay in{" "}
                <span className="font-serif italic">charge</span>.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Dr.T Copilot reads the clinical record and drafts. The Wellness
                Companion talks to clients and does far less on purpose. Neither
                one writes anything a clinician has not approved, and neither
                one runs at all until you switch it on.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contact" size="lg">
                  See Dr.T in a demo
                </Button>
                <Button href="#loops" variant="outline" size="lg">
                  See the five loops
                </Button>
              </div>

              <ul className="mt-10 flex flex-wrap items-center gap-2.5">
                {HERO_CHIPS.map((label) => (
                  <li key={label}>
                    <Chip tone="neutral">{label}</Chip>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-full max-w-[480px] lg:mx-0 lg:justify-self-end">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <ul className="flex flex-col gap-px bg-line">
                  {AGENTS.map((agent) => (
                    <li key={agent.name} className="bg-surface px-6 py-6 md:px-7">
                      <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green">
                        {agent.audience}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                        {agent.name}
                      </h2>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">
                        {agent.blurb}
                      </p>
                      <div className="mt-4">
                        <Button href={agent.anchor} variant="ghost">
                          What it does
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-start gap-2.5 border-t border-line bg-green-soft px-6 py-4 md:px-7">
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-deep"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <rect x="3" y="7" width="10" height="6.5" rx="1.5" />
                    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" strokeLinecap="round" />
                  </svg>
                  <p className="text-[0.8125rem] leading-5 text-green-deep">
                    Both are off until a BAA or DPA is signed, and both are
                    gated on the client&rsquo;s own consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoopTabs chat={<CopilotChat />} />

      <Section
        id="companion"
        className="scroll-mt-24"
        eyebrow="The client side"
        title={
          <>
            The Wellness Companion is{" "}
            <span className="font-serif italic">smaller</span> on purpose.
          </>
        }
        intro="Clients get their own agent in the portal — a separate one, not the clinical Copilot with a friendlier tone. It can do a short, useful list of things and nothing beyond it."
      >
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Card>
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                What it does
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {COMPANION_CAN.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                What it cannot do &mdash; by design
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {COMPANION_CANNOT.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5625rem] inline-block h-px w-3 shrink-0 bg-[color-mix(in_srgb,var(--ink)_35%,transparent)]"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Those actions belong to your team. A symptom the Companion
                judges serious goes to the care team rather than being answered
                away.
              </p>
            </Card>
          </div>

          <div className="mx-auto w-full max-w-[420px] lg:mx-0">
            <CompanionPhone />
          </div>
        </div>
      </Section>

      <Section
        id="governance"
        className="scroll-mt-24 bg-surface"
        eyebrow="Governance"
        title={
          <>
            The rules the AI runs{" "}
            <span className="font-serif italic">inside</span>.
          </>
        }
        intro="These are enforced by the platform on every request, which is why they read the same whether you are asking a clinician, a compliance officer or the audit log."
      >
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GOVERNANCE.map((fact) => (
            <Card key={fact.title} as="li" className="bg-bg">
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                {fact.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {fact.body}
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

      <Section
        eyebrow="Knowledge"
        title={
          <>
            Grounded in a library{" "}
            <span className="font-serif italic">you</span> curate.
          </>
        }
        intro="Knowledge answers are grounded in an admin-curated reference library rather than whatever the model happens to have absorbed. Your administrators decide what goes into it, which means the clinical reasoning Dr.T leans on is reasoning your organization has agreed to."
      >
        <Card className="max-w-3xl">
          <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green">
            How it works
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            An administrator uploads reference material into the library. When a
            question calls for it, Dr.T retrieves from that library and cites
            what it used, the same way it cites a lab marker or a Chex form. Add
            a document and it becomes available; remove one and it stops being
            used.
          </p>
        </Card>
      </Section>

      <CtaBand
        title={
          <>
            See Dr.T read a{" "}
            <span className="font-serif italic">real</span> record.
          </>
        }
        body="Bring one anonymized case and we'll run the loops against it live — the ladder, the insight, the plan — and stop at every point where a clinician has to approve."
        primary={{ label: "See Dr.T in a demo", href: "/contact" }}
        secondary={{ label: "Security approach", href: "/security" }}
      />
    </>
  );
}
