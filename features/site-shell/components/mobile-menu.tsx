"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type ReactNode } from "react";
import { LanguageSwitcher } from "@/features/site-shell/components/language-switcher";
import type { NavItem } from "@/features/site-shell/nav-items";
import type { Locale } from "@/i18n/config";
import { ButtonLink } from "@/shared/ui/button";

type MobileMenuProps = {
  items: NavItem[];
  cta: NavItem;
  /** Wordmark shown in the panel's top bar (rendered on the server). */
  brand: ReactNode;
  locale: Locale;
  /** Accessible name of the language navigation. */
  languageLabel: string;
  labels: {
    /** Accessible name of the panel (dialog). */
    title: string;
    /** Accessible name of the nav inside the panel. */
    nav: string;
    open: string;
    close: string;
  };
};

/*
 * Native <dialog> + showModal(): focus moves into the panel, Tab is trapped,
 * Esc closes it and focus returns to the trigger, all without an Effect.
 * The only React state is `open`, mirrored from the dialog for aria-expanded
 * and for `data-menu-open`, which the CSS in app/globals.css uses to lock
 * body scroll. `close` also fires on Esc, so state stays in sync.
 */
export const MobileMenu = ({
  items,
  cta,
  brand,
  locale,
  languageLabel,
  labels,
}: MobileMenuProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelId = useId();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={handleOpen}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={labels.open}
        className="-mr-2 inline-flex size-12 items-center justify-center rounded-pill"
      >
        <Menu aria-hidden="true" className="size-7" />
      </button>

      <dialog
        ref={dialogRef}
        id={panelId}
        aria-label={labels.title}
        data-menu-open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto bg-bg-dark text-on-dark backdrop:bg-transparent open:flex"
      >
        <div className="flex h-(--header-h) shrink-0 items-center justify-between px-(--space-gutter)">
          {brand}
          <button
            type="button"
            onClick={handleClose}
            aria-label={labels.close}
            className="-mr-2 inline-flex size-12 items-center justify-center rounded-pill"
          >
            <X aria-hidden="true" className="size-7" />
          </button>
        </div>

        <nav
          aria-label={labels.nav}
          className="flex flex-1 flex-col justify-between gap-8 px-(--space-gutter) pt-4 pb-10"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b border-on-dark-muted/25">
                <Link
                  href={item.href}
                  onClick={handleClose}
                  className="flex min-h-14 items-center font-display text-h3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <LanguageSwitcher
              locale={locale}
              label={languageLabel}
              tone="on-dark"
              onNavigate={handleClose}
            />
            <ButtonLink
              href={cta.href}
              variant="on-dark"
              onClick={handleClose}
              className="w-full"
            >
              {cta.label}
            </ButtonLink>
          </div>
        </nav>
      </dialog>
    </div>
  );
};
