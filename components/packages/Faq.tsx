"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
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
 * question closes it again. Editorial hairline rows — the disclosure is a
 * button so the whole list stays keyboard-operable.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      className="scroll-mt-24 border-t border-line bg-surface"
      headerClassName="max-w-[900px]"
      contentClassName="mt-14 md:mt-20"
      eyebrow="Questions"
      title={
        <>
          What clinics ask <em className="italic text-green">before</em>{" "}
          signing.
        </>
      }
    >
      <ul className="list-none border-t border-line">
        {FAQ.map((item, index) => {
          const open = openIndex === index;
          const panelId = `faq-panel-${slugify(item.question)}`;
          const buttonId = `faq-button-${slugify(item.question)}`;

          return (
            <li key={item.question} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="group flex w-full items-start justify-between gap-8 py-8 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-surface md:py-10"
                >
                  <span
                    className={cn(
                      "font-display text-[clamp(1.4rem,2.4vw,28px)] font-normal leading-[1.2] transition-colors duration-300",
                      open ? "text-green" : "text-ink group-hover:text-green",
                    )}
                  >
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2 shrink-0 font-mono text-[15px] leading-none text-brass"
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className="pb-9 md:pb-11"
              >
                <p className="max-w-[80ch] text-[15px] leading-[1.85] text-muted">
                  {item.answer}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default Faq;
