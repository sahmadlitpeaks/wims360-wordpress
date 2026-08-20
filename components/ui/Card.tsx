import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardProps = {
  children: ReactNode;
  className?: string;
  /** Semantic element to render. Defaults to `div`. */
  as?: "div" | "article" | "section" | "li";
};

/** Neutral surface panel: white ground, hairline border, rounded-xl. */
export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-line bg-surface p-6 md:p-7",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export default Card;
