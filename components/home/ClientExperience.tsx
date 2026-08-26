import { CompanionPhone } from "@/components/mocks/CompanionPhone";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Benefit = { title: string; body: string };

const BENEFITS: Benefit[] = [
  {
    title: "Client portal and mobile app",
    body: "Shared reports, the healing plan, appointments and documents on one account, on the web and on the phone. A report appears when a practitioner chooses to share it.",
  },
  {
    title: "Family and dependent profiles",
    body: "A parent can manage a child's profile and a partner can share a programme, with each profile keeping its own record and its own consent.",
  },
  {
    title: "Meal and habit tracking",
    body: "Meals, exercise, habits and symptoms can be logged as they happen, so a review appointment starts from what actually occurred rather than what can be remembered.",
  },
  {
    title: "Secure messaging",
    body: "Clients can reach the care team inside the platform rather than through a personal phone number, and the conversation stays with the client record.",
  },
  {
    title: "Wellness Companion",
    body: "A client-facing assistant that can explain the plan in plain language and encourage the habits the care team has recommended. Clinical questions go back to the practitioner.",
  },
];

export function ClientExperience() {
  return (
    <Section
      id="client-app"
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="The client side"
      title={
        <>
          Give clients a reason to stay{" "}
          <em className="text-teal-deep">engaged</em>.
        </>
      }
      intro="Health continues between appointments, and so does the record. The portal is the same client story the practice works in, filtered to what the care team has chosen to share."
    >
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-20">
        <div>
          <ul className="list-none border-t border-line">
            {BENEFITS.map((benefit, index) => (
              <Reveal
                key={benefit.title}
                as="li"
                delay={Math.min(index, 4) * 90}
                className="border-b border-line py-7"
              >
                <h3 className="font-display text-[clamp(1.35rem,2.19vw,26px)] font-semibold leading-[1.2] text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-3.5 text-[15px] leading-[1.8] text-muted">
                  {benefit.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/platform#client-portal" variant="ghost">
              Explore the client portal
            </Button>
          </div>
        </div>

        <Reveal delay={90} className="lg:pt-4">
          <CompanionPhone />
        </Reveal>
      </div>
    </Section>
  );
}

export default ClientExperience;
