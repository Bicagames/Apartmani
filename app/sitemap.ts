import type { MetadataRoute } from "next";
import { contentUpdatedAt, isIndexable, siteUrl } from "@/config/site";
import { galleryImages } from "@/features/apartments/data/gallery";
import { getApartments } from "@/features/apartments/data/get-apartments";
import {
  defaultLocale,
  hreflangLanguages,
  locales,
  localizedPath,
} from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexable || !siteUrl) {
    return [];
  }

  const apartments = await getApartments();
  const lastModified = contentUpdatedAt;

  const languageAlternates = (path: string) => ({
    languages: Object.fromEntries(
      Object.entries(hreflangLanguages(path)).map(([code, localized]) => [
        code,
        `${siteUrl}${localized}`,
      ]),
    ),
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const homePath = localizedPath(locale, "/");
    entries.push({
      url: `${siteUrl}${homePath}`,
      lastModified,
      changeFrequency: "weekly",
      priority: locale === defaultLocale ? 1 : 0.8,
      alternates: languageAlternates("/"),
      images: galleryImages.map((image) => `${siteUrl}${image.src}`),
    });

    for (const apartment of apartments) {
      const path = `/apartmani/${apartment.slug}`;
      entries.push({
        url: `${siteUrl}${localizedPath(locale, path)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: languageAlternates(path),
        images: apartment.images.map((image) => `${siteUrl}${image.src}`),
      });
    }
  }

  return entries;
}
