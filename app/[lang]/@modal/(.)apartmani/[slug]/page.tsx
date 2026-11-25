import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { Suspense } from "react";
import {
  ApartmentDetails,
  apartmentTitleId,
} from "@/features/apartments/components/apartment-details";
import { ApartmentDetailsSkeleton } from "@/features/apartments/components/apartment-details-skeleton";
import { ApartmentModal } from "@/features/apartments/components/apartment-modal";
import {
  getApartmentBySlug,
  getApartmentSlugs,
} from "@/features/apartments/data/get-apartments";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";

export async function generateStaticParams() {
  const slugs = await getApartmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

type ModalRouteProps = PageProps<"/[lang]/apartmani/[slug]">;

/*
 * Lightbox version of /[lang]/apartmani/[slug]. Only rendered on client
 * navigations from the home page; a hard load of the URL shows the full page.
 * `params` are read inside Suspense so this slot's shell is not tied to one
 * slug (Partial Prefetching). The dialog still needs the slug for
 * `aria-labelledby` — hidden dialogs from Cache Components stay in the DOM —
 * so the dialog itself is inside that boundary. Apartment data sits behind a
 * second Suspense with a skeleton shaped like the gallery, for the case where
 * it is not cached yet.
 */
export default function ApartmentModalPage({ params }: ModalRouteProps) {
  return (
    <Suspense fallback={null}>
      <ModalShell params={params} />
    </Suspense>
  );
}

async function ModalShell({ params }: Pick<ModalRouteProps, "params">) {
  const [{ slug }, messages] = await Promise.all([params, getMessages()]);

  return (
    <ApartmentModal
      titleId={apartmentTitleId(slug)}
      closeLabel={messages.apartments.detail.close}
    >
      <Suspense fallback={<ApartmentDetailsSkeleton />}>
        <ModalContent slug={slug} />
      </Suspense>
    </ApartmentModal>
  );
}

async function ModalContent({ slug }: { slug: string }) {
  const [locale, messages, apartment] = await Promise.all([
    lang(),
    getMessages(),
    getApartmentBySlug(slug),
  ]);
  if (!hasLocale(locale)) notFound();
  if (!apartment) notFound();

  return (
    <ApartmentDetails
      apartment={apartment}
      messages={messages.apartments}
      locale={locale}
      headingLevel={2}
    />
  );
}
