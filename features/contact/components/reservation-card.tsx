import { Mail, Phone } from "lucide-react";
import type { Messages } from "@/i18n/load-messages";
import { ButtonLink } from "@/shared/ui/button";
import { getMailtoHref, getTelHref } from "../contact-links";

type ReservationCardProps = {
  messages: Messages["contact"]["reservations"];
  phone: string | null;
  email: string | null;
};

/*
 * Target of every "Rezervacije" link (`/sr#rezervacije`). Sits on a cream
 * surface inside the dark contact section: ink text on cream-50 (~15:1) beats
 * a lighter-moss card, so primary/secondary buttons (not on-dark) match the
 * light card. `:target` ring/flash lives in `app/globals.css`.
 */
export const ReservationCard = ({
  messages,
  phone,
  email,
}: ReservationCardProps) => (
  <div
    id="rezervacije"
    className="rounded-lg border border-border-strong bg-bg p-6 text-text shadow-sm md:p-8"
  >
    <h3 className="font-display text-h3">{messages.title}</h3>
    <p className="prose-measure mt-3 text-text-muted">{messages.body}</p>

    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {phone ? (
        <ButtonLink href={getTelHref(phone)} className="max-w-full sm:min-w-48">
          <Phone aria-hidden="true" />
          {messages.callCta}
        </ButtonLink>
      ) : (
        <p className="text-lead text-text-muted">{messages.phoneSoon}</p>
      )}

      {email ? (
        <ButtonLink
          href={getMailtoHref(email)}
          variant="secondary"
          className="max-w-full sm:min-w-48"
        >
          <Mail aria-hidden="true" />
          {messages.emailCta}
        </ButtonLink>
      ) : (
        <p className="text-lead text-text-muted">{messages.emailSoon}</p>
      )}
    </div>
  </div>
);
