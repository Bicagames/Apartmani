import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { email, mapQuery, phone } from "@/config/site";
import { galleryImages } from "@/features/apartments/data/gallery";
import { ApartmentsSection } from "@/features/apartments/components/apartments-section";
import { getApartments } from "@/features/apartments/data/get-apartments";
import { ContactSection } from "@/features/contact/components/contact-section";
import { Hero } from "@/features/hero/components/hero";
import { FaqSection } from "@/features/faq/components/faq-section";
import { PlaceInfoSection } from "@/features/place-info/components/place-info-section";
import { JsonLd } from "@/features/seo/json-ld";
import { buildMetadata } from "@/features/seo/metadata";
import { buildFaqSchema } from "@/features/seo/schema/faq";
import { buildLodgingBusinessSchema } from "@/features/seo/schema/lodging-business";
import { buildWebSiteSchema } from "@/features/seo/schema/website";
import { hasLocale, htmlLang, localizedPath } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};

  const messages = await getMessages();

  const [heroImage] = galleryImages;

  return buildMetadata({
    title: messages.seo.home.title,
    description: messages.seo.home.description,
    path: "/",
    locale,
    absoluteTitle: true,
    image: heroImage
      ? {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: messages.hero.imageAlt,
        }
      : undefined,
  });
}

export default async function HomePage() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [messages, apartments] = await Promise.all([
    getMessages(),
    getApartments(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org" as const,
    "@graph": [
      buildLodgingBusinessSchema({
        locale,
        description: messages.seo.home.description,
        apartments,
        apartmentMessages: messages.apartments,
        imagePaths: galleryImages.map((image) => image.src),
      }),
      buildFaqSchema(messages.faq.items),
      buildWebSiteSchema({
        path: localizedPath(locale, "/"),
        inLanguage: htmlLang[locale],
      }),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero
        locale={locale}
        title={messages.site.name}
        messages={messages.hero}
      />
      <ApartmentsSection messages={messages.apartments} />
      <PlaceInfoSection messages={messages.placeInfo} />
      <FaqSection messages={messages.faq} />
      <ContactSection
        messages={messages.contact}
        phone={phone}
        email={email}
        mapQuery={mapQuery}
      />
    </>
  );
}
