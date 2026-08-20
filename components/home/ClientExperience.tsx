import { CompanionPhone } from "@/components/mocks/CompanionPhone";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const BENEFITS = [
  {
    title: "Portal and mobile app on one account",
    body: "Shared reports, healing plans, appointments and documents in plain language — on the web and on the phone, without a second login.",
  },
  {
    title: "Wellness Companion",
    body: "The client-facing agent: deliberately narrower than the clinician's Copilot, restricted to what the care team has shared, and only active where AI consent is.",
  },
  {
    title: "Meal-photo logging and habit check-ins",
    body: "A photo of the plate is faster than a food diary, and the check-in lands on the same timeline the practitioner reviews before the next appointment.",
  },
  {
    title: "Family and dependent profiles",
    body: "Parents manage children, partners share a programme — each profile keeps its own record and its own consent.",
  },
  {
    title: "Online consent signing",
    body: "Consent is versioned, signed in the app and revocable from the consent centre. No paper, and no ambiguity about which version was accepted.",
  },
];

export function ClientExperience() {
  return (
    <Section
      className="bg-surface"
      eyebrow="The client side"
      title={
        <>
          Your clients get an app worth{" "}
          <span className="font-serif italic">opening</span>.
        </>
      }
      intro="Engagement between appointments is where integrative programmes are won or lost. The portal is the same record the clinic works in, filtered to what a clinician has chosen to share."
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <div>
          <ul className="flex flex-col gap-px overflow-hidden rounded-xl border border-line bg-line">
            {BENEFITS.map((benefit) => (
              <li key={benefit.title} className="bg-surface px-5 py-4">
                <h3 className="text-sm font-semibold leading-5 text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {benefit.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-line bg-bg p-5">
            <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
              Also on the desktop portal
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Full report history with compare-over-time, the document hub with
              short-lived signed links, secure threaded messaging with the care
              team, and wearable connections through Terra and Ultrahuman.
            </p>
            <div className="mt-4">
              <Button href="/platform#portal" variant="ghost">
                Explore the client portal
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[380px] lg:mx-0">
          <CompanionPhone />
        </div>
      </div>
    </Section>
  );
}

export default ClientExperience;
