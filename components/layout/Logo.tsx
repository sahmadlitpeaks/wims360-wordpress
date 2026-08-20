import Link from "next/link";
import { cn } from "@/lib/cn";

export type LogoProps = {
  /** Where the mark links to. Defaults to the homepage. */
  href?: string;
  className?: string;
  /** Hide the wordmark and render the "W" mark alone. */
  markOnly?: boolean;
};

/** The WIMS 360 "W" mark plus wordmark, linked to the homepage. */
export function Logo({ href = "/", className, markOnly = false }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="WIMS 360 home"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        width="32"
        height="32"
        aria-hidden="true"
        focusable="false"
        className="h-8 w-8 shrink-0"
      >
        <rect width="32" height="32" rx="9" fill="var(--green-deep)" />
        <g
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M7.5 9.5 L11.8 22.5" />
          <path d="M11.8 22.5 L16 13.8 L20.2 22.5" />
          <path d="M20.2 22.5 L24.5 9.5" />
        </g>
      </svg>
      {markOnly ? null : (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          WIMS<span className="text-green">360</span>
        </span>
      )}
    </Link>
  );
}

export default Logo;
