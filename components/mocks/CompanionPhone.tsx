import { Dot, FIGURE_CLASS, MockFrame, MonoLabel } from "./parts";

/**
 * The client side: a Wellness Companion thread on a phone, where a meal photo
 * comes back as a logged entry the client confirms.
 */
export function CompanionPhone() {
  return (
    <MockFrame
      label="The Wellness Companion app on a phone: a client sends a lunch photo and the companion offers to log it as roughly 620 calories and 42 grams of protein"
      className="border-0 bg-transparent"
    >
      <div className="flex min-h-[440px] items-center justify-center py-2">
        <div className="w-full max-w-[300px] rounded-[2rem] border border-line bg-surface p-2 shadow-[0_1px_2px_color-mix(in_srgb,var(--ink)_8%,transparent)]">
          <div className="overflow-hidden rounded-[1.6rem] bg-bg">
            <div className="flex items-center justify-between px-4 pb-1 pt-2.5">
              <MonoLabel>9:41</MonoLabel>
              <span
                aria-hidden="true"
                className="h-1.5 w-14 rounded-full bg-[color-mix(in_srgb,var(--ink)_12%,transparent)]"
              />
              <MonoLabel>
                <span className={FIGURE_CLASS}>82%</span>
              </MonoLabel>
            </div>

            <div className="flex items-center justify-between gap-2 border-b border-line bg-surface px-3.5 py-2.5">
              <span className="min-w-0">
                <span className="block truncate text-[0.8125rem] font-semibold leading-4 text-ink">
                  Wellness Companion
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1.5">
                  <Dot />
                  <MonoLabel tone="green">Online</MonoLabel>
                </span>
              </span>
              <span className="text-[0.6875rem] leading-4 text-muted">
                Sarah L.
              </span>
            </div>

            <div className="flex flex-col gap-2.5 px-3.5 py-3.5">
              <div className="flex flex-col items-end gap-1">
                <div className="w-[62%] rounded-2xl rounded-br-md border border-[color-mix(in_srgb,var(--green)_20%,transparent)] bg-green-soft p-2.5">
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-full items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--green)_14%,transparent)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-green-deep"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      focusable="false"
                    >
                      <path
                        d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1-1.8h4.6l1 1.8h2.2A1.5 1.5 0 0 1 17 8.5v7A1.5 1.5 0 0 1 15.5 17h-11A1.5 1.5 0 0 1 3 15.5z"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="11.6" r="2.6" />
                      <path d="M19.5 9.5v5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <MonoLabel tone="green" className="mt-1.5 block">
                    Photo · lunch
                  </MonoLabel>
                </div>
                <MonoLabel>Sent 13:04</MonoLabel>
              </div>

              <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-line bg-surface px-3 py-2.5">
                <p className="text-[0.8125rem] leading-5 text-ink">
                  Looks like grilled salmon, quinoa and greens — roughly 620
                  kcal, 42 g protein. Log it?
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-green-deep px-3 py-1 text-[0.6875rem] leading-4 text-white">
                    Log meal
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 text-[0.6875rem] leading-4 text-muted">
                    Edit
                  </span>
                </div>
              </div>

              <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-[color-mix(in_srgb,var(--green)_20%,transparent)] bg-green-soft px-3 py-2.5">
                <p className="text-[0.8125rem] leading-5 text-green-deep">
                  Logged ✓ · added to your daily plan
                </p>
                <p
                  className={`mt-1 text-[0.6875rem] leading-4 text-green-deep ${FIGURE_CLASS}`}
                >
                  Lunch · ~620 kcal · 42 g protein
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-line bg-surface px-3.5 py-2.5">
              <span className="flex-1 truncate rounded-full border border-line px-3 py-1.5 text-[0.6875rem] leading-4 text-muted">
                Message your companion
              </span>
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-deep text-[0.6875rem] text-white"
              >
                ↑
              </span>
            </div>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

export default CompanionPhone;
