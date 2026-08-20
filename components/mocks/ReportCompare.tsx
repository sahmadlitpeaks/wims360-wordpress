import { FIGURE_CLASS, MockFrame, MockHeader, MonoLabel } from "./parts";

type Marker = {
  name: string;
  /** Bar lengths as a percentage of the row width. */
  before: number;
  after: number;
  delta: string;
  improved: boolean;
};

const MARKERS: Marker[] = [
  { name: "Bloating score", before: 78, after: 53, delta: "−32%", improved: true },
  {
    name: "Bowel regularity",
    before: 46,
    after: 72,
    delta: "+18%",
    improved: true,
  },
  {
    name: "Food-trigger count",
    before: 85, after: 51,
    delta: "−40%",
    improved: true,
  },
  {
    name: "Digestive comfort",
    before: 52,
    after: 81,
    delta: "+24%",
    improved: true,
  },
  {
    name: "Symptom load index",
    before: 69,
    after: 50,
    delta: "−27%",
    improved: true,
  },
];

/** Two dated runs of one specialty report, marker by marker. */
export function ReportCompare() {
  return (
    <MockFrame label="A Gut Chex specialty report comparing two visits, January 12 and April 20, with before and after bars for five markers">
      <div className="flex min-h-[440px] flex-col">
        <MockHeader>
          <span className="text-[0.8125rem] font-semibold leading-4 text-ink">
            Gut Chex · compare
          </span>
          <span className="flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-full border border-line px-2.5 py-1 text-[0.6875rem] leading-4 text-muted ${FIGURE_CLASS}`}
            >
              Jan 12
            </span>
            <span aria-hidden="true" className="text-[0.6875rem] text-muted">
              →
            </span>
            <span
              className={`rounded-full border border-[color-mix(in_srgb,var(--green)_25%,transparent)] bg-green-soft px-2.5 py-1 text-[0.6875rem] leading-4 text-green-deep ${FIGURE_CLASS}`}
            >
              Apr 20
            </span>
          </span>
        </MockHeader>

        <ul className="flex flex-col divide-y divide-line">
          {MARKERS.map((marker) => (
            <li key={marker.name} className="px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 truncate text-[0.75rem] leading-4 text-ink">
                  {marker.name}
                </span>
                <span
                  className={`shrink-0 text-[0.75rem] leading-4 ${FIGURE_CLASS} ${
                    marker.improved ? "text-green" : "text-amber"
                  }`}
                >
                  {marker.delta}
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]">
                  <span
                    className="block h-full rounded-full bg-[color-mix(in_srgb,var(--ink)_22%,transparent)]"
                    style={{ width: `${marker.before}%` }}
                  />
                </span>
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]">
                  <span
                    className="block h-full rounded-full bg-green"
                    style={{ width: `${marker.after}%` }}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line px-4 py-3">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-5 rounded-full bg-[color-mix(in_srgb,var(--ink)_22%,transparent)]"
            />
            <MonoLabel>Jan 12</MonoLabel>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-5 rounded-full bg-green"
            />
            <MonoLabel>Apr 20</MonoLabel>
          </span>
          <MonoLabel className="ml-auto">Shared with Sarah L.</MonoLabel>
        </div>
      </div>
    </MockFrame>
  );
}

export default ReportCompare;
