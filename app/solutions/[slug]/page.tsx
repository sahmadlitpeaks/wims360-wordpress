import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { MODULES, type ModuleId } from "@/content/modules";
import { PACKAGES } from "@/content/packages";
import { SOLUTIONS } from "@/content/solutions";

type PageParams = { slug: string };

const PACKAGE_PREVIEW_COUNT = 5;

/** `ai` lives on its own page rather than a `/platform` deep-dive section. */
const MODULE_HREF_OVERRIDES: Partial<Record<ModuleId, string>> = {
  ai: "/ai",
};

function moduleHref(moduleId: ModuleId): string {
  return MODULE_HREF_OVERRIDES[moduleId] ?? `/platform#${moduleId}`;
}

function findSolution(slug: string) {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}

/** Italicizes the last word of a headline, per the site's one-accent-word rule. */
function accentLastWord(text: string): ReactNode {
  const words = text.trim().split(" ");
  const last = words.pop();
  if (!last) {
    return text;
  }
  return (
    <>
      {words.length ? `${words.join(" ")} ` : ""}
      <span className="font-serif italic">{last}</span>
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

  const siblings = SOLUTIONS.filter(
    (other) => other.slug !== solution.slug,
  );

  return (
    <>
      <section className="border-b border-line py-16 md:py-24">
        <div className="container-site">
          <div className="max-w-2xl">
            <Eyebrow>Solutions</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
              {accentLastWord(solution.name)}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {solution.problem}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                Book a demo
              </Button>
              <Button href="#modules" variant="outline" size="lg">
                See what you&apos;d run
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="The WIMS 360 answer"
        title={
          <>
            Here&apos;s what actually{" "}
            <span className="font-serif italic">changes</span>.
          </>
        }
        intro={solution.narrative}
      />

      {modules.length > 0 ? (
        <Section
          id="modules"
          className="scroll-mt-24 bg-surface"
          eyebrow="Inside this solution"
          title={
            <>
              What you&apos;ll{" "}
              <span className="font-serif italic">run</span> in WIMS 360.
            </>
          }
          intro="The modules this solution turns on first. Each one writes to the same client record, so nothing here is a separate system to keep in sync."
        >
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <Card key={module.id} as="li" className="flex flex-col">
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                  {module.name}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink">
                  {module.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {firstSentence(module.description)}
                </p>
                <div className="mt-5 pt-1">
                  <Button href={moduleHref(module.id)} variant="ghost">
                    Explore this module
                  </Button>
                </div>
              </Card>
            ))}
          </ul>
        </Section>
      ) : null}

      {recommendedPackage ? (
        <Section
          eyebrow="Recommended package"
          title={<>Start on {accentLastWord(recommendedPackage.name)}</>}
          intro={recommendedPackage.summary}
        >
          <Card className="max-w-2xl">
            <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em] text-green">
              {recommendedPackage.audience}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
              {recommendedPackage.name}
            </h3>

            <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
              {recommendedPackage.includes
                .slice(0, PACKAGE_PREVIEW_COUNT)
                .map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              {recommendedPackage.includes.length > PACKAGE_PREVIEW_COUNT ? (
                <li className="pl-[1.375rem] text-sm leading-relaxed text-muted">
                  and {recommendedPackage.includes.length - PACKAGE_PREVIEW_COUNT}{" "}
                  more
                </li>
              ) : null}
            </ul>

            <div className="mt-6">
              <Button href="/packages">See packages</Button>
            </div>
          </Card>
        </Section>
      ) : null}

      {siblings.length > 0 ? (
        <Section className="bg-surface" eyebrow="Also serving">
          <ul className="flex flex-wrap gap-3">
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <Link
                  href={`/solutions/${sibling.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.12em] text-muted transition-colors hover:border-green hover:text-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {sibling.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
