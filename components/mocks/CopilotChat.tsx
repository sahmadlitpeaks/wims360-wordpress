import { Dot, FIGURE_CLASS, MockFrame, MockHeader, MonoLabel } from "./parts";

const SOURCES = [
  { name: "Ultrahuman ring", meta: "28-day stream" },
  { name: "Cortisol panel", meta: "Apr 18" },
  { name: "Perceived Stress Chex", meta: "Apr 15" },
];

const QUICK_REPLIES = ["Generate insight", "Draft healing plan", "Review case"];

/**
 * Dr.T Copilot in a clinician thread: a real question, a cited answer, and the
 * consent/approval footer that governs every write.
 */
export function CopilotChat() {
  return (
    <MockFrame label="A Dr.T Copilot thread where a clinician asks whether a client's protocol is working and receives an answer with cited clinical sources">
      <div className="flex min-h-[440px] flex-col">
        <MockHeader>
          <span className="inline-flex items-center gap-2">
            <span className="text-[0.8125rem] font-semibold leading-4 text-ink">
              Dr.T Copilot
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[0.6875rem] leading-4 text-muted">
              Sarah L.
            </span>
          </span>
          <MonoLabel>
            Thread · <span className={FIGURE_CLASS}>12</span> turns
          </MonoLabel>
        </MockHeader>

        <div className="flex flex-1 flex-col gap-3 px-4 py-4">
          <div className="flex flex-col items-end gap-1">
            <MonoLabel>Clinician · 09:41</MonoLabel>
            <p className="max-w-[88%] rounded-2xl rounded-br-md bg-green-deep px-3.5 py-2.5 text-[0.8125rem] leading-5 text-white">
              Summarise Sarah&rsquo;s last 30 days. Is the zinc protocol working?
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5">
              <Dot />
              <MonoLabel tone="green">Dr.T Copilot</MonoLabel>
            </span>
            <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-bg px-3.5 py-3">
              <p className="text-[0.8125rem] leading-5 text-ink">
                Yes, with caveats. HRV recovery is up 12% since day 18. Sleep
                efficiency improved 78 &rarr; 84. Glucose variability dropped to
                14%.
              </p>
              <div className="mt-3 border-t border-line pt-2.5">
                <MonoLabel>Sources</MonoLabel>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {SOURCES.map((source, index) => (
                    <li
                      key={source.name}
                      className="flex items-baseline gap-2 text-[0.75rem] leading-4"
                    >
                      <span
                        className={`shrink-0 text-muted ${FIGURE_CLASS}`}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0 text-ink">
                        {source.name}{" "}
                        <span className={`text-muted ${FIGURE_CLASS}`}>
                          · {source.meta}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {QUICK_REPLIES.map((reply) => (
              <li
                key={reply}
                className="rounded-full border border-[color-mix(in_srgb,var(--green)_25%,transparent)] bg-green-soft px-2.5 py-1 text-[0.75rem] leading-4 text-green-deep"
              >
                {reply}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 border-t border-line px-4 py-3">
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 shrink-0 text-green"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="3" y="7" width="10" height="6.5" rx="1.5" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" strokeLinecap="round" />
          </svg>
          <MonoLabel>
            Consent verified · every save requires clinician approval
          </MonoLabel>
        </div>
      </div>
    </MockFrame>
  );
}

export default CopilotChat;
