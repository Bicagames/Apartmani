import type { Messages } from "@/i18n/load-messages";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import {
  getMailtoHref,
  getTelegramHref,
  getTelHref,
  getViberHref,
  getWhatsAppHref,
} from "../contact-links";
import { MapEmbed } from "./map-embed";

type ContactSectionProps = {
  messages: Messages["contact"];
  phone: string;
  email: string | null;
  mapQuery: string;
};

const titleId = "kontakt-title";

const detailClasses =
  "font-sans lining-nums tracking-normal text-text underline-offset-4 hover:underline";

export const ContactSection = ({
  messages,
  phone,
  email,
  mapQuery,
}: ContactSectionProps) => (
  <Section id="kontakt" tone="dark" aria-labelledby={titleId}>
    <Container>
      <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        <div
          id="rezervacije"
          className="flex flex-col justify-between rounded-lg bg-bg p-8 text-text shadow-lg md:p-12"
        >
          <div>
            <p className="eyebrow">{messages.section.eyebrow}</p>
            <h2 id={titleId} className="mt-4 font-display text-h2">
              {messages.section.title}
            </h2>
            <p className="mt-4 max-w-md text-lead text-text-muted">
              {messages.section.lead}
            </p>
            <p className="mt-4 max-w-md text-text-muted">
              {messages.reservations.body}
            </p>
          </div>

          <div className="mt-10 flex flex-col items-start gap-6">
            <div className="flex flex-col gap-2">
              <a href={getTelHref(phone)} className={cn(detailClasses, "text-h3")}>
                {phone}
              </a>
              {email ? (
                <a
                  href={getMailtoHref(email)}
                  className={cn(detailClasses, "text-lead break-all")}
                >
                  {email}
                </a>
              ) : (
                <p className="text-lead text-text-muted">
                  {messages.reservations.emailSoon}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={getTelHref(phone)}>
                {messages.reservations.callCta}
              </ButtonLink>
              <ButtonLink
                href={getWhatsAppHref(phone)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {messages.reservations.whatsappCta}
              </ButtonLink>
              <ButtonLink href={getTelegramHref(phone)}>
                {messages.reservations.telegramCta}
              </ButtonLink>
              <ButtonLink href={getViberHref(phone)}>
                {messages.reservations.viberCta}
              </ButtonLink>
              {email ? (
                <ButtonLink href={getMailtoHref(email)}>
                  {messages.reservations.emailCta}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>

        <MapEmbed messages={messages.map} mapQuery={mapQuery} />
      </div>
    </Container>
  </Section>
);
