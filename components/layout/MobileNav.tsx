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
 * The only client component in the site chrome: a hamburger that toggles a
 * full-width panel with every nav item and both CTAs. Hidden from `md` up.
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
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:border-green hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
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
        className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-bg"
      >
        <nav aria-label="Mobile" className="container-site py-6">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-lg px-2 py-3 text-base text-ink transition-colors hover:bg-green-soft hover:text-green-deep"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
            <Link
              href="/packages"
              onClick={close}
              className="inline-flex items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--ink)_20%,transparent)] px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-green hover:text-green"
            >
              Request pricing
            </Link>
            <Link
              href="/contact"
              onClick={close}
              className="inline-flex items-center justify-center rounded-xl bg-green-deep px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-green"
            >
              Book a demo
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MobileNav;
