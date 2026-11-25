import type { Metadata } from "next";
import { isIndexable, siteName, siteUrl } from "@/config/site";
import {
  hreflangLanguages,
  locales,
  ogLocale,
  localizedPath,
  type Locale,
} from "@/i18n/config";

export type BuildMetadataImage = {
  /** Site-relative path (e.g. `/images/...`) or already-absolute URL. */
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type BuildMetadataInput = {
  title: string;
  description: string;
  /** Internal path without locale prefix, e.g. `/` or `/apartmani/x`. */
  path: string;
  locale: Locale;
  image?: BuildMetadataImage;
  /**
   * When true, `title` bypasses the layout `title.template`
   * (use for the home page whose title already includes the brand).
   */
  absoluteTitle?: boolean;
};

function resolveImageUrl(url: string): string | undefined {
  if (/^https?:\/\//i.test(url)) return url;
  if (!siteUrl) return undefined;
  return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

/**
 * Shared page metadata. Relative canonical / hreflang / OG URLs are only
 * emitted when `metadataBase` is available (`SITE_URL` set) — Next.js errors
 * on relative URL metadata fields without a base.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale,
  image,
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const localized = localizedPath(locale, path);
  const canEmitUrls = Boolean(siteUrl);

  // `generateMetadata` openGraph replaces file-convention images, so fall back
  // to the app/opengraph-image route when the page has no specific photo.
  const resolvedImage = image
    ? {
        url: resolveImageUrl(image.url),
        width: image.width,
        height: image.height,
        alt: image.alt,
      }
    : canEmitUrls
      ? {
          url: resolveImageUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteName} Subotica`,
        }
      : undefined;

  const absoluteImage = resolvedImage?.url;

  const ogImages =
    absoluteImage && resolvedImage
      ? [
          {
            url: absoluteImage,
            ...(resolvedImage.width !== undefined
              ? { width: resolvedImage.width }
              : {}),
            ...(resolvedImage.height !== undefined
              ? { height: resolvedImage.height }
              : {}),
            ...(resolvedImage.alt !== undefined
              ? { alt: resolvedImage.alt }
              : {}),
          },
        ]
      : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    robots: { index: isIndexable, follow: isIndexable },
    ...(canEmitUrls
      ? {
          alternates: {
            canonical: localized,
            languages: hreflangLanguages(path),
          },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((code) => code !== locale)
        .map((code) => ogLocale[code]),
      siteName,
      title,
      description,
      ...(canEmitUrls ? { url: localized } : {}),
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(absoluteImage ? { images: [absoluteImage] } : {}),
    },
  };
}
