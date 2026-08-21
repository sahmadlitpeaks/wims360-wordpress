import { Section } from "@/components/ui/Section";
import { COMPARISON, PACKAGES, type ComparisonRow } from "@/content/packages";

const COLUMN_COUNT = PACKAGES.length + 1;

/** Group order follows the order the rows are authored in `content/packages`. */
function groupRows(rows: ComparisonRow[]): { group: string; rows: ComparisonRow[] }[] {
  const groups: { group: string; rows: ComparisonRow[] }[] = [];

  for (const row of rows) {
    const last = groups[groups.length - 1];
    if (last && last.group === row.group) {
      last.rows.push(row);
    } else {
      groups.push({ group: row.group, rows: [row] });
    }
  }

  return groups;
}

function Included() {
  return (
    <>
      <svg
        viewBox="0 0 14 14"
        aria-hidden="true"
        focusable="false"
        className="mx-auto h-4 w-4"
      >
        <path
          d="M2.5 7.4 5.6 10.5 11.5 3.8"
          fill="none"
          stroke="var(--green)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">Included</span>
    </>
  );
}

function NotIncluded() {
  return (
    <>
      <span aria-hidden="true" className="text-muted">
        &mdash;
      </span>
      <span className="sr-only">Not included</span>
    </>
  );
}

/**
 * The full 41-row feature matrix. The wrapper scrolls horizontally below `lg`
 * so the four columns stay readable on a phone without the page itself
 * scrolling; from `lg` the wrapper stops being a scroll container, which is
 * what lets the header row stick under the site header.
 */
export function ComparisonTable() {
  const groups = groupRows(COMPARISON);

  return (
    <Section
      id="compare"
      className="bg-surface"
      eyebrow="Feature by feature"
      title={
        <>
          Everything that <span className="font-serif italic">differs</span>,
          in one table.
        </>
      }
      intro="No asterisks and no “contact us for details” rows. Where a package includes something partially, the table says what that partial looks like."
    >
      {/* `relative` keeps the sr-only spans inside the scrollport: without a
          positioned ancestor they resolve against the initial containing block,
          escape the clip and widen the document at mobile widths. */}
      <div className="relative overflow-x-auto lg:overflow-x-visible">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            Feature comparison of the Essentials, Clinical and Precision
            packages
          </caption>

          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-16 z-10 w-[38%] border-b border-line bg-surface px-4 py-4 align-bottom font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted"
              >
                Feature
              </th>
              {PACKAGES.map((pkg) => (
                <th
                  key={pkg.id}
                  scope="col"
                  className="sticky top-16 z-10 border-b border-line bg-surface px-4 py-4 text-center align-bottom"
                >
                  <span className="block font-display text-base font-semibold leading-snug tracking-tight text-ink">
                    {pkg.name}
                  </span>
                  <span className="mt-1 block font-mono text-[0.62rem] uppercase leading-4 tracking-[0.12em] text-green">
                    {pkg.audience}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {groups.map((group) => (
            <tbody key={group.group}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={COLUMN_COUNT}
                  className="border-y border-line bg-green-soft px-4 py-2.5 text-left font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-green-deep"
                >
                  {group.group}
                </th>
              </tr>

              {group.rows.map((row) => (
                <tr key={`${group.group}-${row.feature}`}>
                  <th
                    scope="row"
                    className="border-b border-line px-4 py-3.5 text-left text-sm font-normal leading-relaxed text-ink"
                  >
                    {row.feature}
                  </th>
                  {PACKAGES.map((pkg) => {
                    const value = row.tiers[pkg.id];

                    return (
                      <td
                        key={pkg.id}
                        className="border-b border-line px-4 py-3.5 text-center text-sm leading-relaxed text-muted"
                      >
                        {typeof value === "string" ? (
                          value
                        ) : value ? (
                          <Included />
                        ) : (
                          <NotIncluded />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">
        Dr.T Copilot and the Wellness Companion are consent-gated and
        clinician-approved, and are enabled per customer only after a BAA or DPA
        is signed.
      </p>
    </Section>
  );
}

export default ComparisonTable;
