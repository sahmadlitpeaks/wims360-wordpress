import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ROLES } from "@/content/roles";

/**
 * All fourteen roles as a two-column hairline list — no "+ N more" card,
 * because the point of the section is that you can read the whole permission
 * model in one pass.
 */
export function RolesGrid() {
  return (
    <Section
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="Roles"
      title={
        <>
          Fourteen roles, fourteen{" "}
          <em className="italic text-green">different</em> views of the same
          record.
        </>
      }
      intro="A role is a permission set, not a job title. What a person can see and change is decided by their role — and every access against protected health information is logged."
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
