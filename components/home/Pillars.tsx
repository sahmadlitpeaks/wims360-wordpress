import type { ReactNode } from "react";
import { BookingCalendar } from "@/components/mocks/BookingCalendar";
import { ExamCatalog } from "@/components/mocks/ExamCatalog";
import { HealingPlanCard } from "@/components/mocks/HealingPlanCard";
import { TrendPanel } from "@/components/mocks/TrendPanel";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PILLARS, type PillarId } from "@/content/pillars";

/** One supporting scene per pillar, chosen where it earns its place. */
const PILLAR_MOCK: Record<PillarId, ReactNode> = {
  investigations: <ExamCatalog />,
  healing: <HealingPlanCard />,
  live: <TrendPanel />,
  communication: <BookingCalendar />,
};

/**
 * The centrepiece of the homepage: the four pillars, each given a full
 * alternating row with its promise, its body, the capabilities it carries and
 * one scene from the product. Rendered from `content/pillars.ts`.
 */
export function Pillars() {
  return (
    <Section
      id="pillars"
      className="border-y border-line bg-surface"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-[88px]"
      eyebrow="The four pillars"
      title={
        <>
          One platform, built on four{" "}
          <em className="italic text-green">connected</em> pillars.
        </>
      }
      intro="Investigations, healing, live health data and communication — each one a complete part of the journey, and all four reading the same client record."
    >
      <div className="flex flex-col">
        {PILLARS.map((pillar, index) => {
          const flipped = index % 2 === 1;

          return (
            <article
              key={pillar.id}
              id={pillar.id}
              className={`grid grid-cols-1 items-start gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20 lg:pt-16 ${
                index > 0 ? "mt-16 md:mt-24" : ""
              }`}
            >
              <Reveal className={flipped ? "lg:order-2" : undefined}>
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[44px] leading-none text-brass">
                    {pillar.number}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brass-deep">
                    {pillar.name}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-[clamp(1.9rem,3.4vw,44px)] font-normal leading-[1.08] tracking-[-0.012em] text-ink [text-wrap:pretty]">
                  {pillar.headline}
                </h3>
                <p className="mt-5 font-display text-[clamp(1.15rem,1.9vw,23px)] leading-[1.45] text-green">
                  {pillar.promise}
                </p>

                {pillar.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-6 text-[15.5px] leading-[1.85] text-muted"
                  >
                    {paragraph}
                  </p>
                ))}

                <ul className="mt-9 flex list-none flex-wrap gap-2 border-t border-line pt-8">
                  {pillar.capabilities.map((capability) => (
                    <li key={capability}>
                      <Chip>{capability}</Chip>
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <Button href={`/platform#${pillar.id}`} variant="ghost">
                    Explore {pillar.name.toLowerCase()}
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={90} className={flipped ? "lg:order-1" : undefined}>
                {PILLAR_MOCK[pillar.id]}
              </Reveal>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export default Pillars;
