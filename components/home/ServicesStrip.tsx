import Link from "next/link";
import {
  INTEGRATION_SERVICES,
  INTEGRATIONS_CLOSING,
} from "@/content/integrations";

/**
 * The green-mid band directly under the hero: the SERVICE categories a
 * practice can connect, named as services rather than suppliers. Rendered from
 * `content/integrations.ts` so the strip cannot drift from the platform page.
 */
export function ServicesStrip() {
  return (
    <section className="border-t border-[rgba(176,132,68,.2)] bg-green-mid py-8 md:py-[34px]">
      <div className="container-site flex flex-col gap-6 md:flex-row md:items-baseline md:gap-14">
        <p className="shrink-0 font-semibold text-[12px] uppercase tracking-[0.06em] text-brass">
          Connect what you already use
        </p>

        <ul className="flex list-none flex-wrap items-baseline gap-x-[30px] gap-y-3.5">
          {INTEGRATION_SERVICES.map((service) => (
            <li
              key={service.id}
              className="font-semibold text-[12.5px] tracking-[0.02em] text-[rgba(242,239,230,.82)]"
            >
              {service.name}
            </li>
          ))}
          <li>
            <Link
              href="/platform#integrations"
              className="font-semibold text-[12.5px] tracking-[0.02em] text-brass transition-colors hover:text-brass-bright"
            >
              {INTEGRATIONS_CLOSING}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ServicesStrip;
