import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** Small uppercase mono label that sits above a headline. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export default Eyebrow;
