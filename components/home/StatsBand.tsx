import { Reveal } from "@/components/ui/Reveal";
import { STATS } from "@/content/stats";

/** Dark band between the product story and the governance story. */
export function StatsBand() {
  return (
    <section className="bg-green-deep py-20 text-cream md:py-[112px]">
      <div className="container-site">
        <dl className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={Math.min(index, 4) * 90}
              className={
                index < STATS.length - 1
                  ? "lg:border-r lg:border-[rgba(176,132,68,.28)] lg:pr-10"
                  : ""
              }
            >
              <div className={index > 0 ? "lg:pl-10" : undefined}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="m-0">
                  <span className="block font-display text-[clamp(2.34rem,4.80vw,46px)] leading-[.92] text-paper">
                    {stat.value}
                  </span>
                  <span className="mt-[22px] block font-semibold text-[12px] uppercase tracking-[0.06em] text-brass">
                    {stat.label}
                  </span>
                  {stat.detail ? (
                    <span className="mt-3.5 block text-sm leading-[1.75] text-[rgba(242,239,230,.6)]">
                      {stat.detail}
                    </span>
                  ) : null}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default StatsBand;
