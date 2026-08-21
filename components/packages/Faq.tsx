"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQ } from "@/content/faq";
import { cn } from "@/lib/cn";

function slugify(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Accordion over `content/faq.ts`. One panel open at a time; clicking the open
 * question closes it again.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
            The questions that decide{" "}
            <span className="font-serif italic">this</span>, answered.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Deployment, data ownership, migration, agreements and go-live. If
            yours isn&apos;t here, ask us directly and we&apos;ll answer in
            writing.
          </p>
        </div>

        <ul className="mt-12 flex flex-col gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-16">
          {FAQ.map((item, index) => {
            const open = openIndex === index;
            const panelId = `faq-panel-${slugify(item.question)}`;
            const buttonId = `faq-button-${slugify(item.question)}`;

            return (
              <li key={item.question} className="bg-surface">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-green-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green md:px-7"
                  >
                    <span className="flex-1 text-base font-semibold leading-snug text-ink">
                      {item.question}
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      focusable="false"
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0 text-green transition-transform duration-200",
                        open && "rotate-180",
                      )}
                    >
                      <path
                        d="M3.5 6 8 10.5 12.5 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="px-5 pb-6 md:px-7"
                >
                  <p className="max-w-3xl text-sm leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Faq;
