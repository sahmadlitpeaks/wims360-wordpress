import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PACKAGES, type PackageId } from "@/content/packages";
import { cn } from "@/lib/cn";

/** The one-line promise each package leads with, per the approved direction. */
const PROMISE: Record<PackageId, string> = {
  essentials: "Build the foundation.",
  clinical: "Go deeper into investigations and client management.",
  precision: "Bring intelligence, genomics and advanced care together.",
};

/**
 * The package summaries in `content/packages` open with the same promise
 * line the card already shows, so the card drops the duplicate opening.
 */
function summaryAfterPromise(summary: string, promise: string): string {
  return summary.startsWith(promise)
    ? summary.slice(promise.length).trimStart()
    : summary;
}

/** Precision sits on white so it reads as the emphasised column. */
const CARD_GROUND: Record<PackageId, string> = {
  essentials: "bg-bg",
  clinical: "bg-bg",
  precision: "bg-surface",
};

const CARD_CLASS = "flex flex-col p-8 md:px-9 md:py-12";

const CARD_LINK =
  "inline-flex font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4";

/**
 * The three packages plus the dark "Build your own" column, as one hairline
 * grid. Each package card keeps both calls to action: a conversation, or the
 * configurator pre-seeded with that package.
 */
export function PackageCards() {
  return (
    <section id="packages" className="bg-bg py-24 md:py-[140px]">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((pkg, index) => (
            <Reveal
              key={pkg.id}
              as="article"
              delay={Math.min(index, 4) * 90}
              className={cn(CARD_CLASS, CARD_GROUND[pkg.id])}
            >
              <h2 className="font-display text-[clamp(2rem,3.4vw,40px)] font-normal leading-[1.05] text-ink">
                {pkg.name}
              </h2>
              <p className="mt-4 font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.18em] text-brass">
                {pkg.audience}
              </p>
              <p className="mt-6 font-display text-[19px] leading-[1.3] text-green">
                {PROMISE[pkg.id]}
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.8] text-muted">
                {summaryAfterPromise(pkg.summary, PROMISE[pkg.id])}
              </p>

              <ul className="mt-8 flex list-none flex-col gap-3 border-t border-line pt-7">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="text-[13.5px] leading-[1.6] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col items-start gap-3.5 pt-9">
                <Link
                  href={`/contact?package=${pkg.id}`}
                  className={cn(
                    CARD_LINK,
                    "text-green hover:text-brass-deep focus-visible:ring-offset-bg",
                  )}
                >
                  Talk to us
                </Link>
                <Link
                  href={`/build?start=${pkg.id}`}
                  className={cn(
                    CARD_LINK,
                    "text-muted hover:text-brass-deep focus-visible:ring-offset-bg",
                  )}
                >
                  Customize this package
                </Link>
              </div>
            </Reveal>
          ))}

          <Reveal
            as="article"
            delay={Math.min(PACKAGES.length, 4) * 90}
            className={cn(CARD_CLASS, "bg-green-deep text-cream")}
          >
            <h2 className="font-display text-[clamp(2rem,3.4vw,40px)] font-normal leading-[1.05] text-paper">
              Build Your Own
            </h2>
            <p className="mt-4 font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.18em] text-brass">
              For practices that don&apos;t fit a package
            </p>
            <p className="mt-6 font-display text-[19px] leading-[1.3] text-brass">
              Configure WIMS 360 around your practice.
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.8] text-[rgba(242,239,230,.7)]">
              Start from any package and switch capabilities on or off across
              the four pillars, add the services you already run and tell us
              what needs shaping. The configurator assembles the scope as you
              go, and we review exactly what you chose.
            </p>

            <ul className="mt-8 flex list-none flex-col gap-3 border-t border-[rgba(242,239,230,.16)] pt-7">
              <li className="text-[13.5px] leading-[1.6] text-[rgba(242,239,230,.62)]">
                33 selectable modules across four pillars
              </li>
              <li className="text-[13.5px] leading-[1.6] text-[rgba(242,239,230,.62)]">
                The platform baseline included either way
              </li>
              <li className="text-[13.5px] leading-[1.6] text-[rgba(242,239,230,.62)]">
                Connected services chosen by service, not supplier
              </li>
              <li className="text-[13.5px] leading-[1.6] text-[rgba(242,239,230,.62)]">
                A shareable link so a colleague opens exactly your configuration
              </li>
            </ul>

            <div className="mt-auto pt-9">
              <Link
                href="/build"
                className={cn(
                  CARD_LINK,
                  "text-brass hover:text-paper focus-visible:ring-offset-green-deep",
                )}
              >
                Request a Configuration Review
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default PackageCards;
