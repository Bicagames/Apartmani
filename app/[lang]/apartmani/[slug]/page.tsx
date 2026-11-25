import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { Suspense } from "react";
import { ApartmentBreadcrumb } from "@/features/apartments/components/apartment-breadcrumb";
import { ApartmentDetails } from "@/features/apartments/components/apartment-details";
import { ApartmentDetailsSkeleton } from "@/features/apartments/components/apartment-details-skeleton";
import {
  getApartmentBySlug,
  getApartmentSlugs,
} from "@/features/apartments/data/get-apartments";
import { getApartmentItem } from "@/features/apartments/item-messages";
import { JsonLd } from "@/features/seo/json-ld";
import { buildMetadata } from "@/features/seo/metadata";
import { buildApartmentSchema } from "@/features/seo/schema/apartment";
import { buildBreadcrumbSchema } from "@/features/seo/schema/breadcrumb";
import { hasLocale, localizedPath } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { Container } from "@/shared/ui/container";

type ApartmentRouteProps = PageProps<"/[lang]/apartmani/[slug]">;

export async function generateStaticParams() {
  const slugs = await getApartmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ApartmentRouteProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, lang()]);
  if (!hasLocale(locale)) return {};

  const [messages, apartment] = await Promise.all([
    getMessages(),
    getApartmentBySlug(slug),
  ]);
  if (!apartment) return {};

  const item = getApartmentItem(messages.apartments, slug);
  const [firstImage] = apartment.images;

  return buildMetadata({
    title: messages.seo.apartmentTitle.replaceAll("{name}", item.name),
    description: item.summary,
    path: `/apartmani/${slug}`,
    locale,
    image: firstImage
      ? {
          url: firstImage.src,
          width: firstImage.width,
          height: firstImage.height,
          alt: item.imageAlts[0],
        }
      : undefined,
  });
}

/*
 * Full page for one apartment (direct visit, refresh, shared link, search
 * engines). On a client navigation from the home page the lightbox in
 * @modal/(.)apartmani/[slug] intercepts this route instead.
 *
 * `params` stay inside Suspense. Awaiting them in this component ties the
 * shared app shell to one URL, so Partial Prefetching cannot navigate here
 * instantly (Next logs `instant-shell-url-data`). The shell is the header
 * offset plus a skeleton the same shape as the gallery card.
 */
export default function ApartmentPage({ params }: ApartmentRouteProps) {
  return (
    // The fixed header is solid by default on pages without a hero; the page
    // offsets itself by the header height.
    <div className="pt-(--header-h)">
      <Container className="pt-4 pb-(--space-section) md:pt-6">
        {/* Same 64rem width as the lightbox panel, which the gallery `sizes` assume. */}
        <div className="mx-auto flex max-w-5xl flex-col gap-2">
          <Suspense fallback={<ApartmentPageFallback />}>
            <ApartmentPageContent params={params} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}

const ApartmentPageFallback = () => (
  <>
    <div
      aria-hidden="true"
      className="h-11 w-64 max-w-full rounded-sm bg-border motion-safe:animate-pulse"
    />
    <div className="overflow-hidden rounded-lg border border-border bg-bg shadow-sm">
      <ApartmentDetailsSkeleton />
    </div>
  </>
);

async function ApartmentPageContent({
  params,
}: Pick<ApartmentRouteProps, "params">) {
  const [{ slug }, locale] = await Promise.all([params, lang()]);
  if (!hasLocale(locale)) notFound();

  const [messages, apartment] = await Promise.all([
    getMessages(),
    getApartmentBySlug(slug),
  ]);
  if (!apartment) notFound();

  const item = getApartmentItem(messages.apartments, slug);
  const apartmentPath = localizedPath(locale, `/apartmani/${slug}`);

  const jsonLd = {
    "@context": "https://schema.org" as const,
    "@graph": [
      buildApartmentSchema({
        apartment,
        item,
        amenityLabels: messages.apartments.amenities,
        bedTypeLabels: messages.apartments.bedTypes,
        path: apartmentPath,
      }),
      buildBreadcrumbSchema([
        {
          name: messages.seo.breadcrumb.home,
          path: localizedPath(locale, "/"),
        },
        {
          name: messages.seo.breadcrumb.apartments,
          path: localizedPath(locale, "/#apartmani"),
        },
        {
          name: item.name,
          path: apartmentPath,
        },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ApartmentBreadcrumb
        locale={locale}
        name={item.name}
        messages={messages.apartments.detail.breadcrumb}
      />
      <div className="overflow-hidden rounded-lg border border-border bg-bg shadow-sm">
        <ApartmentDetails
          apartment={apartment}
          messages={messages.apartments}
          locale={locale}
          headingLevel={1}
        />
      </div>
    </>
  );
}
