import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "default" | "lg";

export type ButtonProps = {
  children: ReactNode;
  /** When provided the button renders as a next/link anchor. */
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Only applies when `href` is omitted. */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "rounded-xl bg-green-deep text-white hover:bg-green",
  outline:
    "rounded-xl border border-[color-mix(in_srgb,var(--ink)_20%,transparent)] text-ink hover:border-green hover:text-green",
  ghost: "group rounded-md text-green hover:text-green-deep",
};

const SIZES: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: { default: "px-5 py-2.5 text-sm", lg: "px-6 py-3.5 text-base" },
  outline: { default: "px-5 py-2.5 text-sm", lg: "px-6 py-3.5 text-base" },
  ghost: { default: "text-sm", lg: "text-base" },
};

/**
 * The single call-to-action primitive for the site. Renders a `<Link>` when
 * `href` is given and a native `<button>` otherwise.
 */
export function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
  type = "button",
  disabled = false,
  onClick,
  target,
  rel,
  ...aria
}: ButtonProps) {
  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[variant][size],
    disabled && "pointer-events-none opacity-60",
    className,
  );

  const content = (
    <>
      {children}
      {variant === "ghost" ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={rel}
        {...aria}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...aria}
    >
      {content}
    </button>
  );
}

export default Button;
