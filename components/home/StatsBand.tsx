import { STATS } from "@/content/stats";

/** Quiet green band between the product story and the governance story. */
export function StatsBand() {
  return (
    <section className="border-y border-[color-mix(in_srgb,var(--green)_18%,transparent)] bg-green-soft py-14 md:py-16">
      <div className="container-site">
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-semibold leading-none tracking-tight tabular-nums text-green-deep md:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-3 block font-mono text-[0.72rem] uppercase leading-5 tracking-[0.14em] text-green">
                  {stat.label}
                </span>
                {stat.detail ? (
                  <span className="mt-2.5 block text-sm leading-relaxed text-green-deep">
                    {stat.detail}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default StatsBand;
