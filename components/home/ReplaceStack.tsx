import { DashboardMock } from "@/components/mocks/DashboardMock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const REPLACED = [
  "Intake forms",
  "Booking tool",
  "Lab portal",
  "Spreadsheet CRM",
  "Report documents",
  "WhatsApp broadcasts",
  "Client app",
];

/**
 * "The record": the seven tools a clinic pays for on the left, and the one
 * record they collapse into on the right, sitting on its green-soft offset
 * block.
 */
export function ReplaceStack() {
  return (
    <section className="border-y border-line bg-surface py-24 md:py-[140px]">
      <div className="container-site">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-[88px]">
          <Reveal>
            <Eyebrow>The record</Eyebrow>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.2vw,56px)] font-normal leading-[1.06] tracking-[-0.012em] text-ink [text-wrap:pretty]">
              Seven subscriptions collapse into{" "}
              <em className="italic text-green">one</em> record.
            </h2>
            <p className="mt-7 text-[17px] leading-[1.8] text-muted">
              Nothing here is a connector between tools. Each becomes a module
              of the same system, writing to the same client, under the same
              audit log.
            </p>

            <ul className="mt-11 grid list-none grid-cols-1 gap-x-10 sm:grid-cols-2">
              {REPLACED.map((tool, index) => (
                <li
                  key={tool}
                  className={`flex items-center gap-3.5 py-[15px] text-[14.5px] text-muted ${
                    index < REPLACED.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 rounded-full bg-brass"
                  />
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative" delay={90}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 bottom-6 left-6 bg-green-soft md:-right-7 md:-top-7 md:bottom-10 md:left-10"
            />
            <DashboardMock />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ReplaceStack;
