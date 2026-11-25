import type { Apartment } from "@/features/apartments/types";
import { amenityGroupOrder } from "@/features/apartments/types";
import type { Messages } from "@/i18n/load-messages";
import { absoluteUrl } from "../absolute-url";
import type { JsonLdNode } from "./types";

type ApartmentItemMessages = Messages["apartments"]["items"][keyof Messages["apartments"]["items"]];

type BuildApartmentSchemaInput = {
  apartment: Apartment;
  item: ApartmentItemMessages;
  amenityLabels: Messages["apartments"]["amenities"];
  bedTypeLabels: Messages["apartments"]["bedTypes"];
  /** Locale-prefixed path, e.g. `/sr/apartmani/suit-deluxe-1`. */
  path?: string;
};

function amenityFeatures(
  apartment: Apartment,
  amenityLabels: Messages["apartments"]["amenities"],
): JsonLdNode[] {
  return amenityGroupOrder.flatMap((group) =>
    apartment.amenities[group].map((id) => ({
      "@type": "LocationFeatureSpecification",
      name: amenityLabels[id],
      value: true,
    })),
  );
}

function bedDetails(
  apartment: Apartment,
  bedTypeLabels: Messages["apartments"]["bedTypes"],
): JsonLdNode[] {
  return apartment.beds.map((bed) => ({
    "@type": "BedDetails",
    typeOfBed: bedTypeLabels[bed.type].one,
    numberOfBeds: bed.count,
  }));
}

/**
 * Schema.org `Apartment` for a lodging unit. Omits `url` / `image` when
 * `SITE_URL` is unset so we never emit a wrong absolute URL.
 */
export function buildApartmentSchema({
  apartment,
  item,
  amenityLabels,
  bedTypeLabels,
  path,
}: BuildApartmentSchemaInput): JsonLdNode {
  const url = path ? absoluteUrl(path) : undefined;
  const [firstImage] = apartment.images;
  const image = firstImage ? absoluteUrl(firstImage.src) : undefined;

  return {
    "@type": "Apartment",
    name: item.name,
    description: item.description,
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    numberOfRooms: apartment.bedrooms > 0 ? apartment.bedrooms : 1,
    floorSize: {
      "@type": "QuantitativeValue",
      value: apartment.areaM2,
      unitCode: "MTK",
    },
    occupancy: {
      "@type": "QuantitativeValue",
      value: apartment.maxGuests,
    },
    bed: bedDetails(apartment, bedTypeLabels),
    amenityFeature: amenityFeatures(apartment, amenityLabels),
  };
}
