import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Layer = {
  name: string;
  note: string;
  /** Evidence weight for this case, as the artboard scores it. */
  weight: number;
  /** The layer carrying the case is drawn in brass. */
  carrying?: boolean;
};

const LADDER_LAYERS: Layer[] = [
  {
    name: "Diet",
    note: "Intake quality, timing and what the markers say about it",
    weight: 88,
  },
  {
    name: "Sleep",
    note: "Duration, architecture and recovery from the wearable feed",
    weight: 62,
  },
  {
    name: "Stress",
    note: "Perceived load, HRV trend and the cortisol picture",
    weight: 100,
    carrying: true,
  },
  {
    name: "Digestion",
    note: "Gut symptoms, stool and microbiome panels",
    weight: 48,
  },
  {
    name: "Metabolism",
    note: "RMR, glucose variability and the metabolic panel",
    weight: 74,
  },
  {
    name: "Toxicity",
    note: "Exposure history, detox capacity and relevant markers",
    weight: 34,
  },
  {
    name: "Individuality",
    note: "Genomic traits and the history that makes the case specific",
    weight: 56,
  },
];

/**
 * The methodology section: the reasoning on the left, and the seven layers of
 * the Diamond System of Care scored against one case on the right.
 */
export function Methodology() {
  return (
    <Section
      id="method"
      className="border-t border-line bg-surface"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="The method"
      title={
        <>
          Software that encodes a clinical method — the{" "}
          <em className="italic text-green">Diamond</em> System of Care.
        </>
      }
      intro="Most clinical software is a filing cabinet with a calendar attached. WIMS 360 is built around the way integrative practitioners actually reason about a case."
    >
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:gap-20">
        <Reveal>
          <p className="text-[16.5px] leading-[1.85] text-muted">
            Seven layers carry every case. Each one is scored from every data
            source the clinic holds — Chex intake and examination forms, lab
            markers, wearable signals and genomic traits — so the layers are
            weighted by evidence rather than by whichever result arrived last.
          </p>
          <p className="mt-5 text-[16.5px] leading-[1.85] text-muted">
            The result is a ranked picture of what is actually carrying the
            case, which feeds the healing plan: a recommendation letter across
            supplements, therapies, nutrition and movement, drafted layer by
            layer and released only once a clinician approves it.
          </p>

          <div className="mt-9">
            <Button href="/platform#assessments" variant="ghost">
              How the ladder is scored
            </Button>
          </div>
        </Reveal>

        <Reveal as="ul" delay={90} className="list-none">
          {LADDER_LAYERS.map((layer, index) => (
            <li
              key={layer.name}
              className={`grid grid-cols-[32px_minmax(0,1fr)_72px] items-baseline gap-4 border-t border-line py-5 sm:grid-cols-[44px_minmax(0,1fr)_96px] sm:gap-5 ${
                index === LADDER_LAYERS.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span className="font-display text-[22px] text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-display text-[22px] leading-[1.2] text-ink">
                  {layer.name}
                </span>
                <span className="mt-1.5 block text-[13.5px] leading-[1.7] text-muted">
                  {layer.note}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="block h-[3px] w-[72px] justify-self-end bg-line sm:w-24"
              >
                <span
                  className={`block h-[3px] ${
                    layer.carrying ? "bg-brass" : "bg-green"
                  }`}
                  style={{ width: `${layer.weight}%` }}
                />
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

export default Methodology;
