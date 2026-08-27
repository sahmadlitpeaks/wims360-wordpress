import { DiamondDiagram } from "@/components/mocks/DiamondDiagram";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * The Diamond System of Care. The claim is deliberately soft: seven dimensions
 * to look across, not seven numbers to rank. The diagram beside it carries no
 * scores for the same reason.
 */
export function Diamond() {
  return (
    <Section
      id="diamond"
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="The Diamond System of Care"
      title={
        <>
          Turn complex information into a{" "}
          <em className="text-teal-deep">clearer</em> picture.
        </>
      }
      intro="Seven dimensions give the care team a consistent way to look at a client: diet, sleep, stress, digestion, metabolism, toxicity and individuality."
    >
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-20">
        <Reveal>
          <p className="text-[16.5px] leading-[1.85] text-muted">
            Findings recorded across the journey — assessments, examinations,
            laboratory results, genomics and live data — can be read against
            each of the seven dimensions rather than only against the report
            they arrived in. It is a structured way to look across the
            dimensions, not a score for any of them.
          </p>
          <p className="mt-6 text-[16.5px] leading-[1.85] text-muted">
            The objective is not simply to collect more information. It is to
            help the care team understand which findings matter, how they relate
            to each other and what may need attention next.
          </p>

          <p className="mt-10 border-t border-line pt-8 font-display text-[clamp(1.29rem,2.31vw,29px)] leading-[1.4] text-green [text-wrap:pretty]">
            Understand the whole person, not the last result to arrive.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <DiamondDiagram />
        </Reveal>
      </div>
    </Section>
  );
}

export default Diamond;
