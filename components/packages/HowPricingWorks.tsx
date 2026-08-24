import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Factor = {
  index: string;
  title: string;
  body: string;
};

const FACTORS: Factor[] = [
  {
    index: "01",
    title: "Platform base",
    body: "Every customer gets a managed cloud tenant with its own database and its own storage, hosted in the region you require. The base carries the six platform-baseline modules — roles & permissions, security, consent & audit, documents & records, dashboards & reporting, multi-centre support and integrations & connectivity. They are included in every package and are never a line item you can decline.",
  },
  {
    index: "02",
    title: "Modules",
    body: "On top of the base you switch on the capabilities your practice actually runs, drawn from the 33 selectable modules across the four pillars: Investigations, Healing, Live and Communication & Engagement, plus the intelligence layer. Scope follows what you turn on, and a module added later is a configuration change rather than a migration.",
  },
  {
    index: "03",
    title: "Practitioner seats",
    body: "Staff who touch the record hold named accounts scoped by role, so an audit entry always points at a person. Seats follow the size of your clinical team, and someone who covers two centres holds one account with access to both, not two accounts.",
  },
  {
    index: "04",
    title: "Centres",
    body: "Centres are part of the data model rather than an afterthought: clients, bookings, staff and reporting can be scoped per site, with roll-up reporting for head office. Each additional centre adds its own scope, while group-wide settings — consent versions, retention rules, training modules, the support desk — stay configured once, centrally.",
  },
  {
    index: "05",
    title: "One-time onboarding & migration",
    body: "Configuration, data migration and staff training are scoped once, up front. We start from a sample file, agree the field mapping with you, then run a dry migration you review before anything goes live — and we agree a dated plan before the contract, not after.",
  },
];

/**
 * The five things a proposal is built from, as numbered editorial rows.
 * Deliberately no numbers: the page explains the shape of a quote, not its
 * size.
 */
export function HowPricingWorks() {
  return (
    <Section
      id="how-pricing-works"
      className="scroll-mt-24 border-y border-line bg-surface"
      revealHeader
      headerClassName="max-w-[900px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="How pricing works"
      title={
        <>
          Five inputs, <em className="italic text-green">no</em> guesswork.
        </>
      }
      intro="A WIMS 360 proposal is assembled from the same five inputs every time. Tell us where your practice sits on each and the scope is legible — you can see exactly what you are being quoted for, and what you are not."
    >
      <ul className="list-none border-t border-line">
        {FACTORS.map((factor, index) => (
          <Reveal
            key={factor.index}
            as="li"
            delay={Math.min(index, 4) * 90}
            className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-6 gap-y-3.5 border-b border-line py-9 md:grid-cols-[64px_minmax(0,0.44fr)_minmax(0,1fr)] md:gap-8 md:py-10"
          >
            <span className="font-display text-[34px] leading-none text-brass">
              {factor.index}
            </span>
            <h3 className="font-display text-[clamp(1.5rem,2.4vw,30px)] font-normal leading-[1.12] text-ink">
              {factor.title}
            </h3>
            <p className="col-span-2 text-[15px] leading-[1.8] text-muted md:col-span-1">
              {factor.body}
            </p>
          </Reveal>
        ))}
      </ul>

      <p className="mt-12 max-w-[44ch] font-display text-[clamp(1.5rem,2.6vw,30px)] leading-[1.35] text-green md:mt-14">
        No public price list — every proposal is scoped to your configuration
        and comes back within one business day.
      </p>
    </Section>
  );
}

export default HowPricingWorks;
