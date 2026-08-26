import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { MODULES, type ModuleId } from "@/content/modules";
import { PACKAGES } from "@/content/packages";
import { SOLUTIONS } from "@/content/solutions";

type PageParams = { slug: string };

const PACKAGE_PREVIEW_COUNT = 5;

/**
 * Dr.T and the client-facing companion have their own page; everything else
 * links to its named card in the matching pillar on `/platform`.
 */
const MODULE_HREF_OVERRIDES: Partial<Record<ModuleId, string>> = {
  "drt-ai": "/ai",
  "wellness-companion": "/ai#companion",
};

function moduleHref(moduleId: ModuleId): string {
  return MODULE_HREF_OVERRIDES[moduleId] ?? `/platform#${moduleId}`;
}

function findSolution(slug: string) {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}

/** Italicizes the last word of a headline, per the site's one-accent-word rule. */
function accentLastWord(text: string, tone: "light" | "dark" = "light"): ReactNode {
  const words = text.trim().split(" ");
  const last = words.pop();
  if (!last) {
    return text;
  }
  return (
    <>
      {words.length ? `${words.join(" ")} ` : ""}
      <em
        className={
          tone === "dark" ? "text-mint" : "text-teal-deep"
        }
      >
        {last}
      </em>
    </>
  );
}

/** First sentence of a longer description, for compact card copy. */
function firstSentence(text: string): string {
  const match = text.match(/^[^.]+\./);
  return match ? match[0] : text;
}

/** Word-boundary truncation for meta descriptions built from prose fields. */
function truncate(text: string, max: number): string {
  if (text.length <= max) {
    return text;
  }
  const slice = text.slice(0, max);
  const cut = slice.lastIndexOf(" ");
  return `${slice.slice(0, cut > 0 ? cut : max)}…`;
}

export function generateStaticParams(): PageParams[] {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = findSolution(slug);
  if (!solution) {
    return {};
  }

  return {
    title: solution.name,
    description: truncate(solution.problem, 200),
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const solution = findSolution(slug);

  if (!solution) {
    notFound();
  }

  const modules = solution.moduleIds
    .map((id) => MODULES.find((module) => module.id === id))
    .filter((module): module is (typeof MODULES)[number] => Boolean(module));

  const recommendedPackage = PACKAGES.find(
    (pkg) => pkg.id === solution.recommendedPackage,
  );

  const siblings = SOLUTIONS.filter((other) => other.slug !== solution.slug);

  return (
    <>
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div className="container-site">
          <Reveal>
            <Eyebrow tone="dark">Solutions</Eyebrow>
            <h1 className="mt-8 max-w-[20ch] font-display text-[clamp(2.03rem,4.96vw,47px)] font-semibold leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              {accentLastWord(solution.name, "dark")}
            </h1>
            <p className="mt-10 max-w-[64ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              {solution.problem}
            </p>

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary" size="lg" onDark>
                Book a demo
              </Button>
              <Button href="#modules" variant="outlineLight" size="lg" onDark>
                See what you&apos;d run
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section
        className="bg-bg"
        revealHeader
        headerClassName="max-w-[900px]"
        eyebrow="The WIMS 360 answer"
        title={
          <>
            Here&apos;s what actually{" "}
            <em className="text-teal-deep">changes</em>.
          </>
        }
        intro={solution.narrative}
      />

      {modules.length > 0 ? (
        <Section
          id="modules"
          className="scroll-mt-24 border-y border-line bg-surface"
          revealHeader
          headerClassName="max-w-[900px]"
          contentClassName="mt-16 md:mt-20"
          eyebrow="Inside this solution"
          title={
            <>
              What you&apos;ll <em className="text-teal-deep">run</em> in
              WIMS 360.
            </>
          }
          intro="The modules this solution turns on first. Each one writes to the same client record, so nothing here is a separate system to keep in sync."
        >
          <ul className="grid list-none grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {modules.map((module, index) => (
              <Reveal
                key={module.id}
                as="li"
                delay={Math.min(index, 4) * 90}
                className="flex flex-col bg-surface p-8 md:p-11"
              >
                <h3 className="font-display text-[clamp(1.60rem,2.60vw,29px)] font-semibold leading-[1.15] text-ink">
                  {module.name}
                </h3>
                <p className="mt-3.5 font-semibold text-[12px] uppercase leading-[1.7] tracking-[0.06em] text-brass">
                  {module.tagline}
                </p>
                <p className="mt-5 text-[14.5px] leading-[1.8] text-muted">
                  {firstSentence(module.description)}
                </p>
                <div className="mt-auto pt-8">
                  <Button href={moduleHref(module.id)} variant="ghost">
                    Explore this module
                  </Button>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      {recommendedPackage ? (
        <Section
          className="bg-bg"
          revealHeader
          headerClassName="max-w-[900px]"
          contentClassName="mt-14 md:mt-16"
          eyebrow="Recommended package"
          title={<>Start on {accentLastWord(recommendedPackage.name)}</>}
          intro={recommendedPackage.summary}
        >
          <Reveal className="max-w-2xl border-t border-line pt-9">
            <p className="font-semibold text-[12px] uppercase leading-[1.7] tracking-[0.06em] text-brass">
              {recommendedPackage.audience}
            </p>
            <h3 className="mt-4 font-display text-[clamp(1.74rem,3.00vw,34px)] font-semibold leading-[1.1] text-ink">
              {recommendedPackage.name}
            </h3>

            <ul className="mt-7 list-none border-t border-line">
              {recommendedPackage.includes
                .slice(0, PACKAGE_PREVIEW_COUNT)
                .map((item) => (
                  <li
                    key={item}
                    className="border-b border-line py-3.5 text-[14.5px] leading-[1.7] text-muted"
                  >
                    {item}
                  </li>
                ))}
              {recommendedPackage.includes.length > PACKAGE_PREVIEW_COUNT ? (
                <li className="border-b border-line py-3.5 text-[14.5px] leading-[1.7] text-muted">
                  and{" "}
                  {recommendedPackage.includes.length - PACKAGE_PREVIEW_COUNT}{" "}
                  more
                </li>
              ) : null}
            </ul>

            <div className="mt-9">
              <Button href="/packages" variant="outline">
                See packages
              </Button>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {siblings.length > 0 ? (
        <Section
          className="border-t border-line bg-surface"
          revealHeader
          contentClassName="mt-10 md:mt-12"
          eyebrow="Also serving"
        >
          <ul className="flex list-none flex-wrap gap-x-10 gap-y-5">
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <Link
                  href={`/solutions/${sibling.slug}`}
                  className="inline-flex border-b border-line pb-2 font-semibold text-[12px] uppercase tracking-[0.06em] text-green transition-colors duration-300 hover:border-brass hover:text-green-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                >
                  {sibling.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand ground="bg" />
    </>
  );
}
