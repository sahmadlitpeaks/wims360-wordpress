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

const SPARK_PATH =
  "M2,62 C16,60 30,56 44,56 C58,56 72,66 86,65 C100,64 114,49 128,48 C142,47 156,44 170,43 C184,42 198,33 212,32 C226,31 240,29 254,28 C268,27 282,22 296,19";

const MONO_LABEL =
  "font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted";

/**
 * One client record as the clinic sees it: the client header with a live dot,
 * three serif stat cells, the 30-day HRV trend, and the Dr.T Copilot draft
 * waiting on a clinician. Prop-less server component — a fixed scene, not a
 * data view. The trend line draws itself in CSS, so no client JS is involved.
 */
export function DashboardMock() {
  return (
    <figure
      aria-label="WIMS 360 client record showing heart-rate variability, sleep and glucose figures for a client, a 30-day HRV trend and a Dr.T Copilot draft awaiting clinician approval"
      className="relative m-0 border border-line bg-surface shadow-[0_40px_80px_-32px_rgba(20,30,26,.28),0_8px_20px_-10px_rgba(20,30,26,.12)]"
    >
      <div
        className="flex items-center justify-between gap-3 border-b border-line px-[22px] py-[18px]"
        style={{ background: "linear-gradient(to bottom,#fff,#FBFAF6)" }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-deep font-mono text-[10px] text-cream"
          >
            SL
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[17px] leading-[1.2] text-ink">
              Sarah L.
            </span>
            <span className={`block truncate ${MONO_LABEL}`}>
              Longevity programme · week 6
            </span>
          </span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-[7px]">
          <span
            aria-hidden="true"
            className="el-pulse inline-block h-[5px] w-[5px] rounded-full bg-green"
          />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-green">
            Live
          </span>
        </span>
      </div>

      <div className="grid grid-cols-3">
        {CELLS.map((cell, index) => (
          <div
            key={cell.label}
            className={`px-4 py-5 sm:px-[22px] ${
              index < CELLS.length - 1 ? "border-r border-line" : ""
            }`}
          >
            <span className={`block truncate ${MONO_LABEL}`}>{cell.label}</span>
            <p className="mt-2.5 flex items-baseline gap-[5px]">
              <span className="font-display text-[38px] leading-[.9] text-ink">
                {cell.value}
              </span>
              <span className="font-mono text-[10.5px] text-muted">
                {cell.unit}
              </span>
            </p>
            <p
              className={`mt-2.5 font-mono text-[10.5px] tracking-[0.04em] ${
                cell.tone === "brass" ? "text-brass-deep" : "text-green"
              }`}
            >
              {cell.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-line px-[22px] pb-[22px] pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className={MONO_LABEL}>HRV trend · 30 days</span>
          <span className="shrink-0 font-mono text-[10.5px] text-muted">
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

      <figcaption className="border-t border-line bg-green-deep p-[22px]">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-1 w-1 shrink-0 rounded-full bg-brass"
          />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-brass">
            Dr.T Copilot · draft for review
          </span>
        </span>
        <p className="mt-3 font-display text-[19px] leading-[1.45] text-cream">
          HRV recovery trending up 12% since the zinc protocol began (day 18).
          Suggest extending 2 weeks.
        </p>
        <span className="mt-[18px] flex flex-wrap gap-2.5">
          <span className="border border-brass bg-brass px-[18px] py-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-green-deep">
            Approve
          </span>
          <span className="border border-[rgba(242,239,230,.28)] px-[18px] py-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[rgba(242,239,230,.8)]">
            Edit draft
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default DashboardMock;
