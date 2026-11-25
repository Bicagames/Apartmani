import { Mail, MapPin, Phone } from "lucide-react";
import type { Messages } from "@/i18n/load-messages";
import { getAddressLines, getMailtoHref, getTelHref } from "../contact-links";

type SiteAddress = {
  street: string;
  city: string;
  countryName: string;
  postalCode: string | null;
};

type ContactInfoProps = {
  messages: Messages["contact"]["info"];
  /** Same strings as `messages.contact.reservations` / `site.footer`. */
  phoneSoon: string;
  emailSoon: string;
  phone: string | null;
  email: string | null;
  address: SiteAddress;
};

const iconClasses = "mt-0.5 size-5 shrink-0 text-accent-soft";
const labelClasses = "text-small text-on-dark-muted";
const valueLinkClasses =
  "inline-flex min-h-11 items-center underline-offset-4 hover:underline";

/** Phone / email / address list for the dark contact column. */
export const ContactInfo = ({
  messages,
  phoneSoon,
  emailSoon,
  phone,
  email,
  address,
}: ContactInfoProps) => (
  <ul className="flex flex-col gap-5">
    <li className="flex items-start gap-3">
      <Phone aria-hidden="true" className={iconClasses} />
      <div className="flex min-w-0 flex-col gap-1">
        <p className={labelClasses}>{messages.phoneLabel}</p>
        {phone ? (
          <a href={getTelHref(phone)} className={valueLinkClasses}>
            {phone}
          </a>
        ) : (
          <p className="text-on-dark-muted">{phoneSoon}</p>
        )}
      </div>
    </li>

    <li className="flex items-start gap-3">
      <Mail aria-hidden="true" className={iconClasses} />
      <div className="flex min-w-0 flex-col gap-1">
        <p className={labelClasses}>{messages.emailLabel}</p>
        {email ? (
          <a href={getMailtoHref(email)} className={valueLinkClasses}>
            <span className="wrap-anywhere">{email}</span>
          </a>
        ) : (
          <p className="text-on-dark-muted">{emailSoon}</p>
        )}
      </div>
    </li>

    <li className="flex items-start gap-3">
      <MapPin aria-hidden="true" className={iconClasses} />
      <div className="flex min-w-0 flex-col gap-1">
        <p className={labelClasses}>{messages.addressLabel}</p>
        <address className="not-italic">
          {getAddressLines(address).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </div>
    </li>
  </ul>
);
