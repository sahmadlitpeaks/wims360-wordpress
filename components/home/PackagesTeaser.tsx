import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PACKAGES } from "@/content/packages";

const PREVIEW_COUNT = 3;

/** Precision sits on white so it reads as the emphasised column. */
const CARD_GROUND: Record<string, string> = {
  essentials: "bg-bg",
  clinical: "bg-bg",
  precision: "bg-surface",
};

const CARD_CLASS = "flex flex-col p-8 md:px-9 md:py-11";

export function PackagesTeaser() {
  return (
    <Section
      id="packages"
      className="bg-bg"
      revealHeader
      headerClassName="max-w-[880px]"
      contentClassName="mt-16 md:mt-20"
      eyebrow="Packages"
      title={
        <>
          Start where your practice{" "}
          <em className="text-teal-deep">actually</em> is.
        </>
      }
      intro="Three packages, or a configuration of your own. Every package sits on the same connected record and the same security baseline — the difference is which modules are switched on."
    >
      <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
        {PACKAGES.map((pkg, index) => (
          <Reveal
            key={pkg.id}
            as="article"
            delay={Math.min(index, 4) * 90}
            className={`${CARD_CLASS} ${CARD_GROUND[pkg.id]}`}
          >
            <h3 className="font-display text-[34px] font-semibold leading-[1.1] text-ink">
              {pkg.name}
            </h3>
            <p className="mt-3.5 font-semibold text-[12px] uppercase leading-[1.7] tracking-[0.06em] text-brass">
              {pkg.audience}
            </p>
            <p className="mt-6 text-[14.5px] leading-[1.8] text-muted">
              {pkg.summary}
            </p>

            <ul className="mt-7 flex list-none flex-col gap-2.5 border-t border-line pt-[26px]">
              {pkg.includes.slice(0, PREVIEW_COUNT).map((item) => (
                <li
                  key={item}
                  className="text-[13.5px] leading-[1.6] text-muted"
                >
                  {item}
                </li>
              ))}
              <li className="text-[13.5px] leading-[1.6] text-muted">
                and {pkg.includes.length - PREVIEW_COUNT} more
              </li>
            </ul>

            <Link
              href="/packages"
              className="mt-auto inline-flex pt-8 font-semibold text-[12px] uppercase tracking-[0.06em] text-green transition-colors hover:text-brass-deep"
            >
              See what&apos;s included
            </Link>
          </Reveal>
        ))}

        <Reveal
          as="article"
          delay={Math.min(PACKAGES.length, 4) * 90}
          className={`${CARD_CLASS} bg-green-deep text-cream`}
        >
          <h3 className="font-display text-[34px] font-semibold leading-[1.1] text-paper">
            Build your own
          </h3>
          <p className="mt-3.5 font-semibold text-[12px] uppercase leading-[1.7] tracking-[0.06em] text-brass">
            Configure WIMS 360 around your practice
          </p>
          <p className="mt-6 text-[14.5px] leading-[1.8] text-[rgba(242,239,230,.7)]">
            Choose the modules, the connected services and the roles your
            practice actually runs, and the configurator assembles the scope as
            you go. Send it to us and we review it against exactly that.
          </p>
          <Link
            href="/build"
            className="mt-auto inline-flex pt-8 font-semibold text-[12px] uppercase tracking-[0.06em] text-brass transition-colors hover:text-paper"
          >
            Request a configuration review
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

export default PackagesTeaser;
