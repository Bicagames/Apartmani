"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode, SyntheticEvent } from "react";
import "./apartment-modal.css";

type ApartmentModalProps = {
  /** Id of the heading inside `children` that names the dialog. */
  titleId: string;
  closeLabel: string;
  /** Server-rendered content (ApartmentDetails). */
  children: ReactNode;
};

/*
 * Opens the dialog when React attaches the element. A ref callback (not an
 * Effect) fits because showModal() is a one-off DOM call tied to the element.
 * The `open` guard keeps it safe when the callback runs again.
 *
 * The cleanup runs whenever React detaches the element: unmount, Strict Mode,
 * and also when Cache Components hides the previous route with <Activity> (kept
 * so browser back/forward can restore it instantly). A hidden but still open
 * dialog would keep the page scroll-locked, so it is closed here. That fires a
 * `close` event which must not count as a user action, hence `data-detached`.
 */
const attachDialog = (dialog: HTMLDialogElement) => {
  if (!dialog.open) {
    dialog.showModal();
    // The scrolling panel is focusable and comes first in tree order, so the
    // browser may pick it. Start on the close button instead.
    dialog.querySelector<HTMLElement>("[data-initial-focus]")?.focus();
  }

  return () => {
    if (!dialog.open) return;
    dialog.dataset.detached = "";
    dialog.close();
  };
};

/*
 * Lightbox for the intercepted apartment route (see app/[lang]/@modal).
 * Every way of closing ends in the native `close` event, which is the ONLY
 * place that calls router.back(): Esc and the close button/backdrop (both call
 * dialog.close()) therefore trigger exactly one history step. A <Link> to
 * another page needs no handling: it unmounts the slot together with the dialog.
 * Focus is trapped by showModal() and returns to the clicked card on close.
 */
export const ApartmentModal = ({
  titleId,
  closeLabel,
  children,
}: ApartmentModalProps) => {
  const router = useRouter();

  // The dialog fills the viewport, so a click that targets the dialog itself
  // (not the panel inside it) is a click on the backdrop.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  };

  // The native `close` event (Esc, close button, backdrop) is the only place
  // that goes back in history.
  const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if ("detached" in dialog.dataset) {
      delete dialog.dataset.detached;
      return;
    }
    router.back();
  };

  return (
    <dialog
      ref={attachDialog}
      data-apartment-modal=""
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      onClose={handleClose}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-text backdrop:bg-text/60 open:grid md:place-items-center"
    >
      <div
        // max-h-[90dvh]: share of the viewport, there is no spacing token for it.
        className="apartment-modal-panel relative h-dvh w-full overflow-y-auto overscroll-contain bg-bg md:h-auto md:max-h-[90dvh] md:max-w-5xl md:rounded-lg md:shadow-lg"
      >
        {/* Zero-height sticky row: the button stays in view while content scrolls. */}
        <div className="sticky top-0 z-20 flex h-0 justify-end">
          <button
            type="button"
            aria-label={closeLabel}
            data-initial-focus=""
            onClick={(event) => event.currentTarget.closest("dialog")?.close()}
            className="mt-3 mr-3 flex size-11 items-center justify-center rounded-pill bg-bg/90 text-text shadow-md hover:bg-bg"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};
