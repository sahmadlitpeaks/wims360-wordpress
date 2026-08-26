import { CopilotChat } from "@/components/mocks/CopilotChat";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** What Dr.T can help a practitioner do, from the approved capability list. */
const CAPABILITIES = [
  "Analyse and compare reports across the whole journey",
  "Surface patterns and possible contributing factors",
  "Draft insights and plans for practitioner review",
];

/**
 * Intelligence across the entire journey. The dark band gives Dr.T its own
 * ground, and the Copilot scene beside it shows the posture: cited sources, a
 * draft, and a practitioner who has to approve it.
 */
export function DrT() {
  return (
    <section
      id="dr-t"
      className="relative overflow-hidden bg-green-deep py-24 text-cream md:py-[140px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 82% 0%,rgba(14,107,78,.34),transparent 62%)",
        }}
      />

      <div className="container-site relative">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-20">
          <Reveal>
            <Eyebrow tone="dark">Dr.T</Eyebrow>
            <h2 className="mt-7 font-display text-[clamp(1.87rem,3.61vw,2.70rem)] font-semibold leading-[1.06] tracking-[-0.012em] text-paper [text-wrap:pretty]">
              AI that sees the whole story —{" "}
              <em className="text-mint">not just one report</em>.
            </h2>
            <p className="mt-7 text-[17px] leading-[1.85] text-[rgba(242,239,230,.7)]">
              Dr.T works across the information available within the
              client&apos;s record. It can analyse in seconds, compare findings
              across the history, and surface relationships and patterns a
              single document would not show.
            </p>

            <ul className="mt-11 grid list-none grid-cols-1 gap-x-10 border-t border-[rgba(176,132,68,.28)] sm:grid-cols-2">
              {CAPABILITIES.map((capability) => (
                <li
                  key={capability}
                  className="border-b border-[rgba(176,132,68,.2)] py-[13px] text-[14.5px] leading-[1.7] text-[rgba(242,239,230,.78)]"
                >
                  {capability}
                </li>
              ))}
            </ul>

            <p className="mt-11 font-display text-[clamp(1.29rem,2.31vw,29px)] leading-[1.4] text-paper [text-wrap:pretty]">
              Dr.T does not replace the practitioner. It helps the practitioner
              see more of the story, faster.
            </p>
            <p className="mt-6 font-semibold text-[12px] uppercase leading-[1.9] tracking-[0.06em] text-brass">
              Intelligent assistance. Human oversight.
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.8] text-[rgba(242,239,230,.6)]">
              Every AI-generated clinical action remains subject to the
              appropriate permissions, consent and professional review.
            </p>

            <div className="mt-10">
              <Button href="/ai" variant="outlineLight" size="lg" onDark>
                Explore Dr.T AI
              </Button>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <CopilotChat />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default DrT;
