import { BedDouble, Ruler, Users } from "lucide-react";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import { formatCount } from "@/i18n/plural";
import { ButtonLink } from "@/shared/ui/button";
import { getAppImageProps } from "@/shared/ui/image";
import { getApartmentItem } from "../item-messages";
import type { Apartment } from "../types";
import { AmenityList } from "./amenity-list";
import { GalleryCarousel, type GallerySlide } from "./gallery-carousel";
import { headingTags } from "./heading-level";
import { PriceLabel } from "./price-label";

/**
 * Id of the apartment name heading. The modal points `aria-labelledby` at it.
 * Includes the slug: with Cache Components the lightbox of a previously opened
 * apartment stays in the DOM (hidden), so a fixed id would be duplicated and the
 * dialog could be named after the wrong apartment.
 */
export const apartmentTitleId = (slug: string) => `apartment-title-${slug}`;

type ApartmentDetailsProps = {
  apartment: Apartment;
  messages: Messages["apartments"];
  locale: Locale;
  /** `1` on the full page, `2` inside the modal; sub-sections use the levels below. */
  headingLevel: 1 | 2;
};

const sectionTitleClasses = "font-display text-h3";

/** Heading levels of the sub-sections and the amenity groups per title level. */
const subLevels = {
  1: { section: 2, group: 3 },
  2: { section: 3, group: 4 },
} as const;

/**
 * Gallery, facts, description, amenities, price and CTA of one apartment.
 * Server component shared by the lightbox (`headingLevel={2}`) and the full
 * page (`headingLevel={1}`). Only `GalleryCarousel` is a client island.
 */
export const ApartmentDetails = ({
  apartment,
  messages,
  locale,
  headingLevel,
}: ApartmentDetailsProps) => {
  const item = getApartmentItem(messages, apartment.slug);
  const { detail, card } = messages;
  const Title = headingTags[headingLevel];
  const { section, group } = subLevels[headingLevel];
  const SectionTitle = headingTags[section];

  const bedroomsLabel =
    apartment.bedrooms === 0
      ? detail.studio
      : `${apartment.bedrooms} ${formatCount(locale, apartment.bedrooms, detail.bedrooms)}`;

  const slides: GallerySlide[] = apartment.images.map((image, imageIndex) => ({
    key: image.src,
    color: image.color,
    img: getAppImageProps({
      src: image.src,
      alt: item.imageAlts[imageIndex] ?? "",
      fill: true,
      draggable: false,
      // Only the first photo is requested eagerly; the rest are lazy.
      loading: imageIndex === 0 ? "eager" : "lazy",
      fetchPriority: imageIndex === 0 ? "high" : "auto",
      // Panel is max 64rem (1024px) wide, full viewport width below that.
      sizes: "(min-width: 64rem) 1024px, 100vw",
      quality: 70,
      className: "object-cover",
    }),
  }));

  return (
    <article>
      <GalleryCarousel
        slides={slides}
        labels={{
          previous: detail.previousPhoto,
          next: detail.nextPhoto,
          counter: detail.photoCounter,
          gallery: detail.galleryLabel,
        }}
      />

      <div className="flex flex-col gap-10 px-(--space-gutter) py-8 md:px-10 md:py-10">
        <header className="flex flex-col gap-4">
          <Title id={apartmentTitleId(apartment.slug)} className="font-display text-h2">
            {item.name}
          </Title>
          <p className="prose-measure text-lead text-text-muted">
            {item.summary}
          </p>
          <ul
            aria-label={detail.factsTitle}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            <li className="flex items-center gap-2">
              <Ruler aria-hidden="true" className="size-5 text-accent" />
              {apartment.areaM2} {card.areaUnit}
            </li>
            <li className="flex items-center gap-2">
              <Users aria-hidden="true" className="size-5 text-accent" />
              {apartment.maxGuests}{" "}
              {formatCount(locale, apartment.maxGuests, card.guests)}
            </li>
            <li className="flex items-center gap-2">
              <BedDouble aria-hidden="true" className="size-5 text-accent" />
              {bedroomsLabel}
            </li>
          </ul>
        </header>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <section>
              <SectionTitle className={sectionTitleClasses}>
                {detail.descriptionTitle}
              </SectionTitle>
              <p className="prose-measure mt-3">{item.description}</p>
            </section>

            <section>
              <SectionTitle className={sectionTitleClasses}>
                {detail.bedsTitle}
              </SectionTitle>
              <ul className="mt-3 flex flex-col gap-1">
                {apartment.beds.map((bed) => (
                  <li key={bed.type}>
                    {bed.count}{" "}
                    {formatCount(locale, bed.count, messages.bedTypes[bed.type])}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div
            // Price and CTA come right after the description on phones, and sit
            // in the right column (spanning both rows) from `lg`.
            className="lg:col-start-3 lg:row-span-2 lg:row-start-1"
          >
            <section className="flex flex-col gap-4 rounded-md border border-border bg-surface p-6 lg:sticky lg:top-6">
              <SectionTitle className={sectionTitleClasses}>
                {detail.priceTitle}
              </SectionTitle>
              <PriceLabel
                locale={locale}
                price={apartment.price}
                messages={card}
                size="lg"
              />
              <p className="text-small text-text-muted">{detail.priceNote}</p>
              <ButtonLink
                href={localizedPath(locale, "/#rezervacije")}
                className="w-full"
              >
                {detail.cta}
              </ButtonLink>
            </section>
          </div>

          <section className="lg:col-span-2">
            <SectionTitle className={sectionTitleClasses}>
              {detail.amenitiesTitle}
            </SectionTitle>
            <div className="mt-4">
              <AmenityList
                amenities={apartment.amenities}
                messages={messages}
                headingLevel={group}
              />
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};
