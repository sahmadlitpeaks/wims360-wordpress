import { Dot, FIGURE_CLASS, MockFrame, MockHeader, MonoLabel } from "./parts";

type StatTile = {
  label: string;
  value: string;
  unit: string;
  delta: string;
  tone: "green" | "amber" | "muted";
};

const TILES: StatTile[] = [
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
    tone: "amber",
  },
];

const DEVICES = [
  { name: "Ultrahuman Ring", meta: "synced 42s ago", tone: "green" as const },
  { name: "Apple Watch via Terra", meta: "3m", tone: "green" as const },
];

/**
 * Hero mock: a clinician looking at one client record — stat tiles, a 30-day
 * HRV trend, a Copilot draft insight and the connected-devices strip.
 */
export function DashboardMock() {
  return (
    <MockFrame label="WIMS 360 client dashboard showing heart-rate variability, sleep and glucose trends for a client, with an AI draft insight and connected wearables">
      <div className="flex min-h-[440px] flex-col">
        <MockHeader>
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-soft text-[0.625rem] font-semibold text-green-deep ${FIGURE_CLASS}`}
            >
              SL
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.8125rem] font-semibold leading-4 text-ink">
                Sarah L.
              </span>
              <MonoLabel className="block">
                Longevity programme · week 6
              </MonoLabel>
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5">
            <Dot pulse />
            <MonoLabel tone="green">Live</MonoLabel>
          </span>
        </MockHeader>

        <div className="grid grid-cols-3 gap-px bg-line">
          {TILES.map((tile) => (
            <div key={tile.label} className="bg-surface px-3 py-3.5">
              <MonoLabel className="block truncate">{tile.label}</MonoLabel>
              <p className="mt-1.5 flex items-baseline gap-1">
                <span
                  className={`text-xl font-semibold leading-none text-ink ${FIGURE_CLASS}`}
                >
                  {tile.value}
                </span>
                <span className={`text-[0.6875rem] text-muted ${FIGURE_CLASS}`}>
                  {tile.unit}
                </span>
              </p>
              <p className="mt-1.5 flex items-center gap-1.5">
                <Dot tone={tile.tone} />
                <span
                  className={`text-[0.6875rem] leading-4 ${FIGURE_CLASS} ${
                    tile.tone === "amber" ? "text-amber" : "text-green"
                  }`}
                >
                  {tile.delta}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-line px-4 pb-4 pt-3.5">
          <div className="flex items-center justify-between gap-3">
            <MonoLabel>HRV trend · 30 days</MonoLabel>
            <span className={`text-[0.6875rem] text-muted ${FIGURE_CLASS}`}>
              22 Mar — 20 Apr
            </span>
          </div>
          <div className="relative mt-2">
            <svg
              viewBox="0 0 300 80"
              className="h-20 w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M2,58 C16,56 30,52 44,52 C58,52 72,61 86,60 C100,59 114,45 128,44 C142,43 156,41 170,40 C184,39 198,31 212,30 C226,29 240,27 254,26 C268,25 282,21 296,18 L296,80 L2,80 Z"
                fill="var(--green-soft)"
              />
              <path
                d="M2,58 C16,56 30,52 44,52 C58,52 72,61 86,60 C100,59 114,45 128,44 C142,43 156,41 170,40 C184,39 198,31 212,30 C226,29 240,27 254,26 C268,25 282,21 296,18"
                fill="none"
                stroke="var(--green)"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span
              aria-hidden="true"
              className="absolute right-[1.33%] top-[22.5%] h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-green ring-2 ring-surface"
            />
          </div>
        </div>

        <div className="mx-4 rounded-xl border border-[color-mix(in_srgb,var(--green)_20%,transparent)] bg-green-soft p-3.5">
          <div className="flex items-center gap-1.5">
            <Dot />
            <MonoLabel tone="green">Dr.T Copilot · draft for review</MonoLabel>
          </div>
          <p className="mt-2 text-[0.8125rem] leading-5 text-green-deep">
            HRV recovery trending up 12% since the zinc protocol began (day 18).
            Suggest extending 2 weeks — cross-reference with the Apr 18 cortisol
            panel.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-green-deep px-3 py-1 text-[0.6875rem] leading-4 text-white">
              Approve
            </span>
            <span className="rounded-full border border-[color-mix(in_srgb,var(--green-deep)_25%,transparent)] px-3 py-1 text-[0.6875rem] leading-4 text-green-deep">
              Edit draft
            </span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line px-4 py-3">
          <MonoLabel>Connected</MonoLabel>
          {DEVICES.map((device) => (
            <span key={device.name} className="inline-flex items-center gap-1.5">
              <Dot tone={device.tone} />
              <span className="text-[0.6875rem] leading-4 text-ink">
                {device.name}
              </span>
              <span className={`text-[0.6875rem] text-muted ${FIGURE_CLASS}`}>
                {device.meta}
              </span>
            </span>
          ))}
        </div>
      </div>
    </MockFrame>
  );
}

export default DashboardMock;
