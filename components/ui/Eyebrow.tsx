import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type EyebrowProps = {
  children: ReactNode;
  /**
   * `dark` switches the label to brass for green-deep grounds. It is a class
   * rather than a Tailwind colour utility because `.eyebrow` is authored after
   * the utilities layer and would otherwise win the cascade.
   */
  tone?: "light" | "dark";
  className?: string;
};

/** Small uppercase mono label that sits above a headline. */
export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <p className={cn("eyebrow", tone === "dark" && "eyebrow-dark", className)}>
      {children}
    </p>
  );
}

export default Eyebrow;
