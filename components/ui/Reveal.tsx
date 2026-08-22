"use client";

import type { ElementType, ReactNode, Ref } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  /** Stagger in ms. Pass the sibling index times ~90 for a run of items. */
  delay?: number;
};

/** Nothing stays hidden longer than this, whatever the observer does. */
const FAILSAFE_MS = 2500;

/**
 * Fade + rise on scroll, the site's only entrance motion. One
 * IntersectionObserver per element — never a scroll listener — and a no-op
 * under `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!node || reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const failsafe = window.setTimeout(() => setShown(true), FAILSAFE_MS);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref as Ref<never>}
      /* Hook for the no-JS failsafe stylesheet in the root layout. */
      data-reveal=""
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]",
        shown
          ? "translate-y-0 opacity-100"
          : "motion-safe:translate-y-[22px] motion-safe:opacity-0",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
