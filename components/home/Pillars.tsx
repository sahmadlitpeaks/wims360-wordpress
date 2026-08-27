import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PILLARS } from "@/content/pillars";

/**
 * The four pillars, compact. Each card carries the promise and nothing more —
 * the full explanation, the capability chips and the module lists live on
 * /platform, where a reader has already asked for depth.
 */
export function Pillars() {
  return (
    <Section
      id="pillars"
      eyebrow="The platform"
      title={
        <>
          Four pillars, one connected{" "}
          <span className="text-teal-deep">client journey</span>.
        </>
      }
      intro="Switch on what your practice needs. Every pillar writes to the same client record."
      className="border-y border-line bg-surface"
    >
      <ul className="mt-14 grid list-none grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {PILLARS.map((pillar) => (
          <li key={pillar.id} className="bg-surface">
            <Link
              href={`/platform#${pillar.id}`}
              className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--teal)_5%,transparent)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal md:p-10"
            >
              <span className="font-semibold text-[12px] tracking-[0.08em] text-teal">
                {pillar.number}
              </span>
              <h3 className="mt-5 font-display text-[26px] font-semibold leading-[1.15] text-ink">
                {pillar.name}
              </h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-muted">
                {pillar.promise}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-teal-deep transition-transform duration-300 group-hover:translate-x-0.5">
                Explore
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Pillars;
