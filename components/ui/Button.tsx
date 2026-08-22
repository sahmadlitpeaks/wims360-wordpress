import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "outlineLight"
  | "ghost";
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
  /** Set on a button sitting on a green-deep ground so the focus ring offset doesn't paint a parchment halo. */
  onDark?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

/**
 * Estate buttons are rectangular mono labels — never rounded, never sentence
 * case. Shared across every variant.
 */
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-none font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brass text-green-deep hover:bg-brass-light motion-safe:hover:-translate-y-0.5",
  dark: "bg-green-deep text-cream hover:bg-green motion-safe:hover:-translate-y-0.5",
  outline: "border border-line text-ink hover:border-brass",
  outlineLight:
    "border border-[rgba(242,239,230,.28)] text-cream hover:border-[rgba(242,239,230,.7)] hover:bg-[rgba(242,239,230,.06)]",
  ghost:
    "border-b border-line pb-2 text-green hover:border-brass hover:text-green-deep",
};

const SOLID_SIZES: Record<ButtonSize, string> = {
  default: "px-[26px] py-[14px]",
  lg: "px-[34px] py-[18px]",
};

const SIZES: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: SOLID_SIZES,
  dark: SOLID_SIZES,
  outline: SOLID_SIZES,
  outlineLight: SOLID_SIZES,
  ghost: { default: "", lg: "" },
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
  onDark = false,
  onClick,
  target,
  rel,
  ...aria
}: ButtonProps) {
  const classes = cn(
    BASE,
    onDark
      ? "focus-visible:ring-offset-green-deep"
      : "focus-visible:ring-offset-bg",
    VARIANTS[variant],
    SIZES[variant][size],
    disabled && "pointer-events-none opacity-60",
    className,
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
        {children}
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
      {children}
    </button>
  );
}

export default Button;
