import { ArrowRight, Ruler, Users } from "lucide-react";
import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import { formatCount } from "@/i18n/plural";
import { AppImage } from "@/shared/ui/image";
import { getApartmentItem } from "../item-messages";
import type { Apartment } from "../types";
import { PriceLabel } from "./price-label";

type ApartmentCardProps = {
  apartment: Apartment;
  locale: Locale;
  messages: Messages["apartments"];
};

/*
 * The whole card is ONE link (stretched-link pattern): the anchor sits on the
 * name and its `::after` covers the card, so there is a single tab stop whose
 * accessible name is the apartment name. The "view details" text is only a
 * visual affordance for the same link, hence `aria-hidden`.
 * `scroll={false}`: the lightbox opens over the page, which must not move.
 * Every card image is lazy: the cards sit below the 100svh hero.
 */
export const ApartmentCard = ({
  apartment,
  locale,
  messages,
}: ApartmentCardProps) => {
  const item = getApartmentItem(messages, apartment.slug);
  const { card } = messages;
  const image = apartment.images[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-shadow duration-(--duration-base) ease-out hover:shadow-md has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-accent-soft">
      <div
        className="relative aspect-4/3 overflow-hidden bg-border"
        style={image ? { backgroundColor: image.color } : undefined}
      >
        {image ? (
          <AppImage
            src={image.src}
            alt={item.imageAlts[0]}
            fill
            loading="lazy"
            sizes="(min-width: 80rem) 600px, (min-width: 48rem) 50vw, 100vw"
            quality={70}
            className="object-cover motion-safe:transition-transform motion-safe:duration-(--duration-slow) motion-safe:ease-out motion-safe:group-hover:scale-104"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h3 className="font-display text-h3">
          <Link
            href={localizedPath(locale, `/apartmani/${apartment.slug}`)}
            scroll={false}
            className="focus-visible:outline-hidden after:absolute after:inset-0"
          >
            {item.name}
          </Link>
        </h3>
        <p className="text-text-muted">{item.summary}</p>

        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-small">
          <li className="flex items-center gap-2">
            <Ruler aria-hidden="true" className="size-4 text-accent" />
            {apartment.areaM2} {card.areaUnit}
          </li>
          <li className="flex items-center gap-2">
            <Users aria-hidden="true" className="size-4 text-accent" />
            {apartment.maxGuests}{" "}
            {formatCount(locale, apartment.maxGuests, card.guests)}
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
          <PriceLabel
            locale={locale}
            price={apartment.price}
            messages={card}
          />
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center gap-2 text-small text-accent"
          >
            <span className="max-lg:hidden">{card.viewDetails}</span>
            <ArrowRight className="size-5 motion-safe:transition-transform motion-safe:duration-(--duration-base) motion-safe:ease-out motion-safe:group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
};
