import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ROLES } from "@/content/roles";

const SHOWN = ROLES.slice(0, 8);
const REMAINING = ROLES.length - SHOWN.length;

export function RolesGrid() {
  return (
    <Section
      eyebrow="Roles"
      title={
        <>
          Fourteen roles, fourteen{" "}
          <span className="font-serif italic">different</span> views of the same
          record.
        </>
      }
      intro="A role is a permission set, not a job title. What a person can see and change is decided by their role — and every access against protected health information is logged."
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHOWN.map((role) => (
          <Card key={role.name} as="li" className="p-5 md:p-5">
            <h3 className="text-sm font-semibold leading-5 text-ink">
              {role.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {role.scope}
            </p>
          </Card>
        ))}

        <li>
          <div className="flex h-full flex-col justify-center rounded-xl border border-dashed border-[color-mix(in_srgb,var(--green)_40%,transparent)] bg-green-soft p-5">
            <span className="font-display text-base font-semibold leading-snug tracking-tight text-green-deep">
              + {REMAINING} more roles
            </span>
            <span className="mt-2 text-sm leading-relaxed text-green-deep">
              Every one with its own dashboard, permissions and data scope.
            </span>
          </div>
        </li>
      </ul>
    </Section>
  );
}

export default RolesGrid;
