import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ROLES } from "@/content/roles";

/**
 * The role TYPES as a two-column hairline list — no count in the copy, because
 * roles can be configured around how a practice actually works.
 */
export function RolesGrid() {
  return (
    <Section
      id="team"
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="Your team"
      title={
        <>
          Everyone sees the part of the journey they{" "}
          <em className="italic text-green">need</em>.
        </>
      }
      intro="A role is a permission set rather than a job title. One client story, different views — and access to client information is recorded with the actor and the timestamp. Roles can be configured around the way your practice works."
    >
      <ul className="grid list-none grid-cols-1 gap-x-20 md:grid-cols-2">
        {ROLES.map((role, index) => {
          const isLast = index === ROLES.length - 1;
          const isSecondLast = index === ROLES.length - 2;
          return (
            <Reveal
              key={role.name}
              as="li"
              delay={Math.min(index % 2, 4) * 90}
              className={`grid grid-cols-1 gap-2 border-t border-line py-6 sm:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] sm:gap-6 ${
                isLast ? "border-b" : ""
              } ${isSecondLast ? "md:border-b" : ""}`}
            >
              <span className="font-display text-[22px] leading-[1.3] text-ink">
                {role.name}
              </span>
              <span className="text-[14.5px] leading-[1.8] text-muted">
                {role.scope}
              </span>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

export default RolesGrid;
