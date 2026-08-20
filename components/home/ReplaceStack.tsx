import { Section } from "@/components/ui/Section";

const REPLACED = [
  "Intake forms",
  "Booking tool",
  "Lab portal",
  "Spreadsheet CRM",
  "Report documents",
  "WhatsApp broadcasts",
  "Client app",
];

/** Seven feeder lines collapsing into one — drawn, not animated. */
function ConvergenceArrow() {
  return (
    <>
      <svg
        viewBox="0 0 64 210"
        className="hidden h-[210px] w-16 lg:block"
        aria-hidden="true"
        focusable="false"
      >
        <g
          fill="none"
          stroke="var(--green)"
          strokeOpacity="0.35"
          strokeWidth="1"
        >
          <path d="M0,10 C30,10 16,105 44,105" />
          <path d="M0,42 C30,42 20,105 44,105" />
          <path d="M0,74 C30,74 24,105 44,105" />
          <path d="M0,105 L44,105" />
          <path d="M0,136 C30,136 24,105 44,105" />
          <path d="M0,168 C30,168 20,105 44,105" />
          <path d="M0,200 C30,200 16,105 44,105" />
        </g>
        <path
          d="M44,105 L60,105 M54,100 L60,105 L54,110"
          fill="none"
          stroke="var(--green)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        viewBox="0 0 120 48"
        className="mx-auto h-12 w-[120px] lg:hidden"
        aria-hidden="true"
        focusable="false"
      >
        <g
          fill="none"
          stroke="var(--green)"
          strokeOpacity="0.35"
          strokeWidth="1"
        >
          <path d="M6,0 C6,20 60,14 60,32" />
          <path d="M33,0 C33,20 60,14 60,32" />
          <path d="M60,0 L60,32" />
          <path d="M87,0 C87,20 60,14 60,32" />
          <path d="M114,0 C114,20 60,14 60,32" />
        </g>
        <path
          d="M60,30 L60,44 M55,38 L60,44 L65,38"
          fill="none"
          stroke="var(--green)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function ReplaceStack() {
  return (
    <Section
      className="bg-surface"
      eyebrow="What it replaces"
      title={
        <>
          Seven subscriptions collapse into{" "}
          <span className="font-serif italic">one</span> record.
        </>
      }
      intro="Nothing here is a connector between tools. Each of these becomes a module of the same system, writing to the same client, under the same audit log."
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,20rem)] lg:gap-6">
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {REPLACED.map((tool) => (
            <li
              key={tool}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-bg px-4 py-3 text-sm leading-5 text-muted"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color-mix(in_srgb,var(--ink)_25%,transparent)]"
              />
              {tool}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center">
          <ConvergenceArrow />
        </div>

        <div className="rounded-xl bg-green-deep px-6 py-7 text-white md:px-7">
          <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-white/70">
            One system
          </p>
          <p className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">
            WIMS 360
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            One client record, one calendar, one consent registry, one audit
            trail. Modules switch on per package — the record underneath never
            changes.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default ReplaceStack;
