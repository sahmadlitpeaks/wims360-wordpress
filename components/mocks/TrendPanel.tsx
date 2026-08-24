import { MOCK_LABEL, MockFrame, StatusDot } from "@/components/mocks/parts";

type Trend = {
  label: string;
  value: string;
  unit: string;
  window: string;
  path: string;
};

const TRENDS: Trend[] = [
  {
    label: "Sleep duration",
    value: "7.2",
    unit: "hrs avg",
    window: "28 days",
    path: "M2,30 C24,26 46,32 68,24 C90,16 112,22 134,18 C156,14 178,20 198,12",
  },
  {
    label: "Resting heart rate",
    value: "56",
    unit: "bpm",
    window: "28 days",
    path: "M2,14 C24,18 46,12 68,20 C90,28 112,22 134,26 C156,30 178,26 198,30",
  },
  {
    label: "Daily movement",
    value: "8.4",
    unit: "k steps",
    window: "28 days",
    path: "M2,32 C24,28 46,30 68,22 C90,14 112,26 134,16 C156,10 178,18 198,10",
  },
];

/**
 * The live half of the record: what the connected devices have been saying
 * between appointments. Sources are named the way the client would name them —
 * their own ecosystem — and the panel deliberately shows direction of travel
 * rather than a single reading.
 */
export function TrendPanel() {
  return (
    <MockFrame label="WIMS 360 live health panel showing 28-day sleep duration, resting heart rate and daily movement trends for a client, with the connected health sources feeding them">
      <div
        className="flex items-center justify-between gap-3 border-b border-line px-[22px] py-[18px]"
        style={{ background: "linear-gradient(to bottom,#fff,#FBFAF6)" }}
      >
        <span className="min-w-0">
          <span className="block truncate font-display text-[17px] leading-[1.2] text-ink">
            Between appointments
          </span>
          <span className={`block truncate ${MOCK_LABEL}`}>
            Sarah L. · since the last review
          </span>
        </span>
        <StatusDot>Connected</StatusDot>
      </div>

      <ul className="list-none">
        {TRENDS.map((trend) => (
          <li
            key={trend.label}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,110px)] items-center gap-4 border-b border-line px-[22px] py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,150px)] sm:gap-6"
          >
            <span className="min-w-0">
              <span className={`block truncate ${MOCK_LABEL}`}>
                {trend.label} · {trend.window}
              </span>
              <span className="mt-2 flex items-baseline gap-[5px]">
                <span className="font-display text-[28px] leading-[.95] text-ink">
                  {trend.value}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {trend.unit}
                </span>
              </span>
            </span>
            <svg
              viewBox="0 0 200 44"
              className="block h-11 w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d={trend.path}
                fill="none"
                stroke="var(--green)"
                strokeWidth="1.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </li>
        ))}
      </ul>

      <figcaption className="px-[22px] py-4">
        <span className={`block ${MOCK_LABEL}`}>Connected by the client</span>
        <span className="mt-2 block text-[13px] leading-[1.7] text-muted">
          Apple Health · Samsung Health · Fitbit · and other supported devices.
          More can be integrated.
        </span>
      </figcaption>
    </MockFrame>
  );
}

export default TrendPanel;
