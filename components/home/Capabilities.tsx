import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  BASELINE_MODULES,
  SELECTABLE_MODULES,
  modulesByPillar,
  type ModulePillar,
} from "@/content/modules";

type Group = {
  pillar: ModulePillar;
  name: string;
};

/**
 * Every selectable module, in catalog order, grouped the way the platform
 * groups them. `intelligence` sits with the four pillars here because Dr.T and
 * the Wellness Companion are chosen like any other module.
 */
const GROUPS: Group[] = [
  { pillar: "investigations", name: "Investigations" },
  { pillar: "healing", name: "Healing" },
  { pillar: "live", name: "Live" },
  { pillar: "communication", name: "Communication & Engagement" },
  { pillar: "intelligence", name: "Intelligence" },
];

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      className="border-y border-line bg-surface"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="Capabilities"
      title={
        <>
          Everything the platform can{" "}
          <em className="italic text-green">do</em>, in one view.
        </>
      }
      intro={`${SELECTABLE_MODULES.length} modules you can switch on, plus the platform baseline that ships in every package. Each one writes to the same client record.`}
    >
      <div className="flex flex-col gap-16 md:gap-20">
        {GROUPS.map((group) => {
          const modules = modulesByPillar(group.pillar);

          return (
            <div key={group.pillar}>
              <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-6">
                <h3 className="font-display text-[clamp(1.5rem,2.6vw,32px)] font-normal leading-[1.15] text-ink">
                  {group.name}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
                  {modules.length} modules
                </span>
              </Reveal>

              <ul className="mt-8 grid list-none grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((module, index) => (
                  <Reveal
                    key={module.id}
                    as="li"
                    delay={Math.min(index % 3, 4) * 90}
                    className="bg-surface p-6 md:p-7"
                  >
                    <h4 className="font-display text-[20px] font-normal leading-[1.25] text-ink">
                      {module.name}
                    </h4>
                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-muted">
                      {module.tagline}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}

        <Reveal className="bg-green-deep p-8 md:p-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
            Included in every package
          </p>
          <ul className="mt-7 grid list-none grid-cols-1 gap-x-10 border-t border-[rgba(176,132,68,.28)] sm:grid-cols-2 lg:grid-cols-3">
            {BASELINE_MODULES.map((module) => (
              <li
                key={module.id}
                className="border-b border-[rgba(176,132,68,.2)] py-4"
              >
                <span className="block font-display text-[19px] leading-[1.25] text-paper">
                  {module.name}
                </span>
                <span className="mt-1.5 block text-[13px] leading-[1.7] text-[rgba(242,239,230,.62)]">
                  {module.tagline}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-12">
        <Button href="/platform" variant="ghost">
          See every module in detail
        </Button>
      </div>
    </Section>
  );
}

export default Capabilities;
