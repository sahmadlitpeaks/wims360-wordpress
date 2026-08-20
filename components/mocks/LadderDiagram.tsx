import { Dot, FIGURE_CLASS, MockFrame, MockHeader, MonoLabel } from "./parts";

type Layer = {
  name: string;
  load: number;
  tone: "green" | "amber";
};

/** Loads are 0–15; the two amber layers are the ones carrying the case. */
const LAYERS: Layer[] = [
  { name: "Diet", load: 12, tone: "green" },
  { name: "Sleep", load: 7, tone: "green" },
  { name: "Stress", load: 15, tone: "amber" },
  { name: "Digestion", load: 4, tone: "green" },
  { name: "Metabolism", load: 9, tone: "amber" },
  { name: "Toxicity", load: 3, tone: "green" },
  { name: "Individuality", load: 6, tone: "green" },
];

const INPUTS = ["Chex forms", "Lab markers", "Wearables", "Genomics"];

const MAX_LOAD = 15;

/**
 * The Dynamic Symptom Chart: four data sources feed seven weighted layers,
 * which resolve into one healing plan. Connector lines flow behind
 * `prefers-reduced-motion: no-preference`.
 */
export function LadderDiagram() {
  return (
    <MockFrame label="The Dynamic Symptom Chart: Chex forms, lab markers, wearables and genomics feeding seven weighted health layers that resolve into a healing plan">
      <div className="flex min-h-[440px] flex-col">
        <MockHeader>
          <span className="text-[0.8125rem] font-semibold leading-4 text-ink">
            Dynamic Symptom Chart
          </span>
          <MonoLabel>Sarah L. · 20 Apr</MonoLabel>
        </MockHeader>

        <div className="px-4 pt-4">
          <MonoLabel>Inputs</MonoLabel>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {INPUTS.map((input) => (
              <li
                key={input}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[0.75rem] leading-4 text-ink"
              >
                <Dot tone="muted" />
                {input}
              </li>
            ))}
          </ul>
        </div>

        <svg
          viewBox="0 0 300 26"
          className="mt-1 h-6 w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <g
            className="ladder-flow"
            fill="none"
            stroke="var(--green)"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="3 6"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M38,0 C38,14 150,12 150,26" vectorEffect="non-scaling-stroke" />
            <path d="M113,0 C113,14 150,12 150,26" vectorEffect="non-scaling-stroke" />
            <path d="M188,0 C188,14 150,12 150,26" vectorEffect="non-scaling-stroke" />
            <path d="M262,0 C262,14 150,12 150,26" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <div className="px-4">
          <ul className="rounded-xl border border-line">
            {LAYERS.map((layer, index) => (
              <li
                key={layer.name}
                className={`grid grid-cols-[5.25rem_minmax(0,1fr)_2.75rem] items-center gap-2.5 px-3 py-2 ${
                  index > 0 ? "border-t border-line" : ""
                }`}
              >
                <span className="truncate text-[0.75rem] leading-4 text-ink">
                  {layer.name}
                </span>
                <span className="h-1.5 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--ink)_8%,transparent)]">
                  <span
                    className={`block h-full rounded-full ${
                      layer.tone === "amber" ? "bg-amber" : "bg-green"
                    }`}
                    style={{ width: `${(layer.load / MAX_LOAD) * 100}%` }}
                  />
                </span>
                <span className="flex items-center justify-end gap-1.5">
                  <span
                    className={`text-[0.75rem] leading-4 text-muted ${FIGURE_CLASS}`}
                  >
                    {layer.load}
                  </span>
                  <Dot tone={layer.tone} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <svg
          viewBox="0 0 300 22"
          className="h-[22px] w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <g
            className="ladder-flow"
            fill="none"
            stroke="var(--green)"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="3 6"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M80,0 C80,12 150,10 150,22" vectorEffect="non-scaling-stroke" />
            <path d="M150,0 L150,22" vectorEffect="non-scaling-stroke" />
            <path d="M220,0 C220,12 150,10 150,22" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <div className="mt-auto px-4 pb-4">
          <div className="rounded-xl border border-[color-mix(in_srgb,var(--green)_20%,transparent)] bg-green-soft px-3.5 py-3">
            <MonoLabel tone="green">Output</MonoLabel>
            <p className="mt-1 text-[0.8125rem] font-semibold leading-5 text-green-deep">
              Healing plan · 7-layer recommendation letter
            </p>
            <p className="mt-1 text-[0.6875rem] leading-4 text-green-deep">
              Draft · awaiting clinician approval before it reaches the client.
            </p>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

export default LadderDiagram;
