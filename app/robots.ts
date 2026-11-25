import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/config/site";
import { locales } from "@/i18n/config";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable || !siteUrl) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Dev-only style guide. The page is also `noindex`. Disallow does not
      // replace noindex: a disallowed URL can still be indexed from off-site links.
      disallow: locales.map((locale) => `/${locale}/styleguide`),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteUrl).host,
  };
}
