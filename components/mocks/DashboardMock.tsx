import {
  ClientBadge,
  MOCK_LABEL,
  MockFrame,
  ReviewFooter,
  StatusDot,
} from "@/components/mocks/parts";

type StatCell = {
  label: string;
  value: string;
  unit: string;
  delta: string;
  /** The glucose delta is the only figure that reads as a caution. */
  tone: "green" | "brass";
};

const CELLS: StatCell[] = [
  { label: "HRV 7d avg", value: "68", unit: "ms", delta: "+12%", tone: "green" },
  {
    label: "Sleep score",
    value: "84",
    unit: "/100",
    delta: "+6",
    tone: "green",
  },
  {
    label: "Glucose var.",
    value: "14",
    unit: "%",
    delta: "−4pts",
    tone: "brass",
  },
];

/**
 * Connected sources named the way the platform names them: the device
 * ecosystem the client owns, or the kind of device — never the supplier
 * behind the connection.
 */
const SOURCES = ["Smart ring · synced 42s ago", "Apple Health · 3m ago"];

const SPARK_PATH =
  "M2,62 C16,60 30,56 44,56 C58,56 72,66 86,65 C100,64 114,49 128,48 C142,47 156,44 170,43 C184,42 198,33 212,32 C226,31 240,29 254,28 C268,27 282,22 296,19";

/**
 * One client record as the practice sees it: the client header with a live
 * dot, three serif figures, the connected sources feeding them, the 30-day HRV
 * trend, and the Dr.T Copilot draft waiting on a practitioner. Prop-less
 * server component — a fixed scene, not a data view. The trend line draws
 * itself in CSS, so no client JS is involved.
 */
export function DashboardMock() {
  return (
    <MockFrame label="WIMS 360 client record showing heart-rate variability, sleep and glucose figures for a client, the connected devices feeding them, a 30-day trend and a Dr.T Copilot draft awaiting practitioner review">
      <div
        className="flex items-center justify-between gap-3 border-b border-line px-[22px] py-[18px]"
        style={{ background: "linear-gradient(to bottom,#fff,#FBFAF6)" }}
      >
        <ClientBadge note="Longevity programme · week 6" />
        <StatusDot>Live</StatusDot>
      </div>

      <div className="grid grid-cols-3">
        {CELLS.map((cell, index) => (
          <div
            key={cell.label}
            className={`px-4 py-5 sm:px-[22px] ${
              index < CELLS.length - 1 ? "border-r border-line" : ""
            }`}
          >
            <span className={`block truncate ${MOCK_LABEL}`}>{cell.label}</span>
            <p className="mt-2.5 flex items-baseline gap-[5px]">
              <span className="font-display text-[38px] leading-[.9] text-ink">
                {cell.value}
              </span>
              <span className="font-mono text-[11.5px] text-muted">
                {cell.unit}
              </span>
            </p>
            <p
              className={`mt-2.5 font-mono text-[11.5px] tracking-[0.04em] ${
                cell.tone === "brass" ? "text-brass-deep" : "text-green"
              }`}
            >
              {cell.delta}
            </p>
          </div>
        ))}
      </div>

      <ul className="flex list-none flex-wrap items-center gap-x-6 gap-y-2 border-t border-line px-[22px] py-3.5">
        {SOURCES.map((source) => (
          <li key={source} className={MOCK_LABEL}>
            {source}
          </li>
        ))}
      </ul>

      <div className="border-t border-line px-[22px] pb-[22px] pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className={MOCK_LABEL}>HRV trend · 30 days</span>
          <span className="shrink-0 font-mono text-[11.5px] text-muted">
            22 Mar — 20 Apr
          </span>
        </div>
        <div className="relative mt-3.5">
          <svg
            viewBox="0 0 300 88"
            className="block h-24 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient
                id="dashboard-hrv-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="var(--green)" stopOpacity=".22" />
                <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${SPARK_PATH} L296,88 L2,88 Z`}
              fill="url(#dashboard-hrv-fill)"
            />
            <path
              className="spark-draw"
              d={SPARK_PATH}
              fill="none"
              stroke="var(--green)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      <ReviewFooter
        kicker="Dr.T Copilot · draft for review"
        note="Subject to permissions, consent and professional review"
      >
        Recovery has trended upward since the plan was revised on day 18.
        Extending the current phase by two weeks may be worth considering.
      </ReviewFooter>
    </MockFrame>
  );
}

export default DashboardMock;
