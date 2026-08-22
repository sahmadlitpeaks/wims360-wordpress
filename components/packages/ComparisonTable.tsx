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

/** The artboard's own affordance: a green dot for yes, a pale rule for no. */
function Included() {
  return (
    <>
      <span aria-hidden="true" className="text-[15px] leading-none text-green">
        &#9679;
      </span>
      <span className="sr-only">Included</span>
    </>
  );
}

function NotIncluded() {
  return (
    <>
      <span
        aria-hidden="true"
        className="text-[color-mix(in_srgb,var(--muted)_45%,transparent)]"
      >
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
      className="scroll-mt-24 bg-bg"
      revealHeader
      headerClassName="max-w-[900px]"
      contentClassName="mt-16 md:mt-[72px]"
      eyebrow="Compare"
      title={
        <>
          Every feature, <em className="italic text-green">tier</em> by tier.
        </>
      }
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
                className="sticky top-[76px] z-10 w-[46%] border-b border-ink bg-bg pb-4 pr-6 align-bottom font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-muted"
              >
                Feature
              </th>
              {PACKAGES.map((pkg) => (
                <th
                  key={pkg.id}
                  scope="col"
                  className="sticky top-[76px] z-10 w-[132px] border-b border-ink bg-bg pb-4 text-center align-bottom font-display text-[22px] font-normal leading-[1.1] text-ink"
                >
                  {pkg.name}
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
                  className="pb-3.5 pt-10 text-left font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-brass"
                >
                  {group.group}
                </th>
              </tr>

              {group.rows.map((row) => (
                <tr key={`${group.group}-${row.feature}`}>
                  <th
                    scope="row"
                    className="border-t border-line py-[18px] pr-6 text-left text-[14.5px] font-normal leading-[1.6] text-muted"
                  >
                    {row.feature}
                  </th>
                  {PACKAGES.map((pkg) => {
                    const value = row.tiers[pkg.id];

                    return (
                      <td
                        key={pkg.id}
                        className="border-t border-line px-2 py-[18px] text-center font-mono text-[12.5px] leading-[1.5] text-muted"
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

      <p className="mt-10 max-w-[70ch] text-[15px] leading-[1.8] text-muted">
        Dr.T Copilot and the Wellness Companion are consent-gated and
        clinician-approved, and are enabled per customer only after a BAA or DPA
        is signed.
      </p>
    </Section>
  );
}

export default ComparisonTable;
