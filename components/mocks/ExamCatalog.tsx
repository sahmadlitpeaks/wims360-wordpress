import { EXAM_CATEGORIES, EXAMS } from "@/content/exams";
import { Dot, FIGURE_CLASS, MockFrame, MockHeader, MonoLabel } from "./parts";

/**
 * The Chex form library as it appears in the console: every exam in
 * `content/exams.ts`, grouped by category, with the "build your own" form
 * called out in green.
 */
export function ExamCatalog() {
  const groups = EXAM_CATEGORIES.map((category) => ({
    category,
    exams: EXAMS.filter((exam) => exam.category === category),
  })).filter((group) => group.exams.length > 0);

  return (
    <MockFrame label="The WIMS 360 Chex form library, listing every examination form grouped by clinical category">
      <div className="flex min-h-[440px] flex-col">
        <MockHeader>
          <span className="text-[0.8125rem] font-semibold leading-4 text-ink">
            Chex form library
          </span>
          <span className="inline-flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-line px-2.5 py-1 sm:inline-flex">
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5 14 14" strokeLinecap="round" />
              </svg>
              <span className="text-[0.6875rem] leading-4 text-muted">
                Search forms
              </span>
            </span>
            <MonoLabel>
              <span className={FIGURE_CLASS}>{EXAMS.length}</span> forms
            </MonoLabel>
          </span>
        </MockHeader>

        <div className="divide-y divide-line">
          {groups.map((group) => {
            const isCustom = group.category === "Your own";

            return (
              <div
                key={group.category}
                className="grid grid-cols-1 gap-x-3 gap-y-2 px-4 py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-baseline"
              >
                <MonoLabel tone={isCustom ? "green" : "muted"}>
                  {group.category}
                </MonoLabel>
                <ul className="flex flex-wrap gap-1.5">
                  {group.exams.map((exam) => (
                    <li
                      key={exam.name}
                      className={
                        isCustom
                          ? "inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--green)_25%,transparent)] bg-green-soft px-2.5 py-1 text-[0.75rem] leading-4 text-green-deep"
                          : "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[0.75rem] leading-4 text-ink"
                      }
                    >
                      <Dot tone={isCustom ? "green" : "muted"} />
                      {exam.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-auto border-t border-line px-4 py-3">
          <p className="text-[0.6875rem] leading-4 text-muted">
            Every form writes to the same client record — results are
            comparable across visits and feed the healing plan.
          </p>
        </div>
      </div>
    </MockFrame>
  );
}

export default ExamCatalog;
