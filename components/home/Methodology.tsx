import { LadderDiagram } from "@/components/mocks/LadderDiagram";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const LADDER_LAYERS = [
  { name: "Diet", note: "Intake quality, timing and what the markers say about it" },
  { name: "Sleep", note: "Duration, architecture and recovery from the wearable feed" },
  { name: "Stress", note: "Perceived load, HRV trend and the cortisol picture" },
  { name: "Digestion", note: "Gut symptoms, stool and microbiome panels" },
  { name: "Metabolism", note: "RMR, glucose variability and the metabolic panel" },
  { name: "Toxicity", note: "Exposure history, detox capacity and relevant markers" },
  {
    name: "Individuality",
    note: "Genomic traits and the history that makes the case specific",
  },
];

/**
 * The methodology section. Alongside the hero this is the page's second "wow"
 * moment, so the ladder gets a full column and the copy stays out of its way.
 */
export function Methodology() {
  return (
    <Section
      id="method"
      className="bg-surface"
      eyebrow="The method"
      title={
        <>
          Software that encodes a clinical method — the{" "}
          <span className="font-serif italic">Diamond</span> System of Care.
        </>
      }
      intro="Most clinical software is a filing cabinet with a calendar attached. WIMS 360 is built around the way integrative practitioners actually reason about a case."
      headerClassName="max-w-3xl"
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
        <div>
          <p className="text-base leading-relaxed text-muted">
            Seven layers carry every case. Each one is scored from every data
            source the clinic holds — Chex intake and examination forms, lab
            markers, wearable signals and genomic traits — so the layers are
            weighted by evidence rather than by whichever result arrived last.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The result is a ranked picture of what is actually carrying the
            case, which feeds the healing plan: a recommendation letter across
            supplements, therapies, nutrition and movement, drafted layer by
            layer and released only once a clinician approves it.
          </p>

          <ul className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
            {LADDER_LAYERS.map((layer, index) => (
              <li key={layer.name} className="bg-surface px-4 py-3.5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.6875rem] leading-5 tracking-tight text-green">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold leading-5 text-ink">
                    {layer.name}
                  </span>
                </div>
                <p className="mt-1 pl-8 text-[0.8125rem] leading-5 text-muted">
                  {layer.note}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/platform#assessments" variant="ghost">
              How the ladder is scored
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px] lg:sticky lg:top-24 lg:mx-0">
          <LadderDiagram />
        </div>
      </div>
    </Section>
  );
}

export default Methodology;
