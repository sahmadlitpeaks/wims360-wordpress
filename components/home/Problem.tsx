import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * The information a longevity practice already collects. Listed as an
 * editorial hairline run rather than as cards: the length of the list is the
 * argument.
 */
const INFORMATION_TYPES = [
  "Clinical assessments",
  "Laboratory biomarkers",
  "Genetic data",
  "Wearables",
  "Lifestyle information",
  "Imaging",
  "Therapies",
  "Appointments",
  "Messages",
  "Progress over time",
];

export function Problem() {
  return (
    <Section
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-[88px]"
      eyebrow="The problem"
      title={
        <>
          Your client&apos;s health story is{" "}
          <em className="text-teal-deep">bigger</em> than any single report.
        </>
      }
      intro="Modern longevity and wellness practices collect enormous amounts of information."
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:gap-20">
        <Reveal as="ul" className="list-none border-t border-line">
          {INFORMATION_TYPES.map((type, index) => (
            <li
              key={type}
              className="grid grid-cols-[36px_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-[15px] sm:grid-cols-[46px_minmax(0,1fr)]"
            >
              <span className="font-semibold text-[12px] tracking-[0.14em] text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(1.26rem,2.19vw,26px)] leading-[1.3] text-ink">
                {type}
              </span>
            </li>
          ))}
        </Reveal>

        <Reveal delay={90} className="lg:pt-4">
          <p className="text-[17px] leading-[1.85] text-muted">
            When those pieces live in different systems, nobody can read one
            finding against another — and assembling the picture falls to
            whoever has time.
          </p>
          <p className="mt-6 text-[17px] leading-[1.85] text-muted">
            WIMS 360 connects the journey so your team can spend less time
            moving information between systems and more time understanding the
            client and delivering personalised care.
          </p>

          <p className="mt-10 border-t border-line pt-8 font-display text-[clamp(1.35rem,2.40vw,29px)] leading-[1.35] text-green [text-wrap:pretty]">
            Stop managing fragments. Start managing the journey.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

export default Problem;
