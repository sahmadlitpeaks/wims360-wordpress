"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type NavItem = {
  label: string;
  href: string;
};

export type MobileNavProps = {
  items: NavItem[];
};

const PANEL_ID = "site-mobile-nav";

/**
 * Hamburger that toggles a full-width green-deep panel with every nav item and
 * the demo CTA. Hidden from `md` up; locks body scroll while open.
 */
export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(176,132,68,.4)] text-cream transition-colors hover:border-brass hover:text-brass focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-green-deep"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        >
          {open ? (
            <>
              <path d="M6 6 L18 18" />
              <path d="M18 6 L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7 H20" />
              <path d="M4 12 H20" />
              <path d="M4 17 H20" />
            </>
          )}
        </svg>
      </button>

      <div
        id={PANEL_ID}
        hidden={!open}
        className="fixed inset-x-0 top-[76px] z-40 max-h-[calc(100vh-76px)] overflow-y-auto border-b border-[rgba(176,132,68,.22)] bg-green-deep"
      >
        <nav aria-label="Mobile" className="container-site py-8">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block border-b border-[rgba(176,132,68,.18)] py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-cream transition-colors hover:text-brass"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-6">
            <Link
              href="/contact"
              onClick={close}
              className="inline-flex w-full items-center justify-center bg-brass px-[34px] py-[18px] font-mono text-[11px] uppercase tracking-[0.18em] text-green-deep transition-colors hover:bg-brass-light"
            >
              Book a demo
            </Link>
            <Link
              href="/packages"
              onClick={close}
              className="border-b border-[rgba(176,132,68,.5)] pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(242,239,230,.72)] transition-colors hover:border-brass hover:text-cream"
            >
              View packages
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MobileNav;
