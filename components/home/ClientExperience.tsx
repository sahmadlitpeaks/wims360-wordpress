import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Benefit = { title: string; body: string };

const LEFT_COLUMN: Benefit[] = [
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
];

const RIGHT_COLUMN: Benefit[] = [
  {
    title: "Family and dependent profiles",
    body: "Parents manage children, partners share a programme — each profile keeps its own record and its own consent.",
  },
  {
    title: "Online consent signing",
    body: "Consent is versioned, signed in the app and revocable from the consent centre. No paper, and no ambiguity about which version was accepted.",
  },
];

function BenefitArticle({
  benefit,
  delay,
  last,
}: {
  benefit: Benefit;
  delay: number;
  last: boolean;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`border-t border-line py-8 ${last ? "border-b" : ""}`}
    >
      <h3 className="font-display text-[26px] font-normal leading-[1.2] text-ink">
        {benefit.title}
      </h3>
      <p className="mt-3.5 text-[15px] leading-[1.8] text-muted">
        {benefit.body}
      </p>
    </Reveal>
  );
}

export function ClientExperience() {
  return (
    <Section
      className="border-y border-line bg-surface"
      revealHeader
      headerClassName="max-w-[860px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="The client side"
      title={
        <>
          Your clients get an app worth{" "}
          <em className="italic text-green">opening</em>.
        </>
      }
      intro="Engagement between appointments is where integrative programmes are won or lost. The portal is the same record the clinic works in, filtered to what a clinician has chosen to share."
    >
      <div className="grid grid-cols-1 gap-x-20 md:grid-cols-2">
        <div>
          {LEFT_COLUMN.map((benefit, index) => (
            <BenefitArticle
              key={benefit.title}
              benefit={benefit}
              delay={index * 90}
              last={index === LEFT_COLUMN.length - 1}
            />
          ))}
        </div>

        <div>
          {RIGHT_COLUMN.map((benefit, index) => (
            <BenefitArticle
              key={benefit.title}
              benefit={benefit}
              delay={index * 90}
              last={index === RIGHT_COLUMN.length - 1}
            />
          ))}

          <Reveal delay={180} className="mt-9 bg-green-soft p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-green">
              Also on the desktop portal
            </p>
            <p className="mt-3.5 text-[15px] leading-[1.8] text-green-deep">
              Full report history with compare-over-time, the document hub with
              short-lived signed links, secure threaded messaging with the care
              team, and wearable connections through Terra and Ultrahuman.
            </p>
            <Link
              href="/platform#portal"
              className="mt-6 inline-flex items-center border-b border-[color-mix(in_srgb,var(--green)_30%,transparent)] pb-[7px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-green-deep transition-colors hover:border-green-deep"
            >
              Explore the client portal
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export default ClientExperience;
