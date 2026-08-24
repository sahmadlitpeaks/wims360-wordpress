import { EXAMS } from "@/content/exams";
import { MOCK_LABEL, MockFrame } from "@/components/mocks/parts";

/**
 * The examination catalogue as the practice picks from it: every structured
 * examination the platform records, each one filed under the area it belongs
 * to. Rendered from `content/exams.ts`, so the mock cannot drift from the
 * catalogue the rest of the site describes.
 */
export function ExamCatalog() {
  return (
    <MockFrame label={`WIMS 360 examination catalogue listing ${EXAMS.length} structured clinical examination types`}>
      <div
        className="flex items-center justify-between gap-3 border-b border-line px-[22px] py-[18px]"
        style={{ background: "linear-gradient(to bottom,#fff,#FBFAF6)" }}
      >
        <span className="min-w-0">
          <span className="block truncate font-display text-[17px] leading-[1.2] text-ink">
            Examination catalogue
          </span>
          <span className={`block truncate ${MOCK_LABEL}`}>
            Structured findings · comparable over time
          </span>
        </span>
        <span className="shrink-0 font-display text-[26px] leading-none text-brass">
          {EXAMS.length}
        </span>
      </div>

      <ul className="grid list-none grid-cols-2 gap-px bg-line sm:grid-cols-3">
        {EXAMS.map((exam) => (
          <li key={exam.name} className="bg-surface px-3.5 py-3 sm:px-4">
            <span className="block truncate font-display text-[17px] leading-[1.25] text-ink">
              {exam.name}
            </span>
            <span className="mt-1 block truncate font-mono text-[8.5px] uppercase tracking-[0.14em] text-brass-deep">
              {exam.category}
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="border-t border-line px-[22px] py-4 font-mono text-[9px] uppercase leading-[1.8] tracking-[0.14em] text-muted">
        Each examination records its findings in defined fields
      </figcaption>
    </MockFrame>
  );
}

export default ExamCatalog;
