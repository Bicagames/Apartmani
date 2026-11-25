import { absoluteUrl } from "../absolute-url";
import type { JsonLdNode } from "./types";

export type BreadcrumbItem = {
  name: string;
  /** Locale-prefixed path. Omit on the final (current) crumb when preferred. */
  path?: string;
};

/**
 * Schema.org `BreadcrumbList`. Item URLs are absolute only when `SITE_URL` is set.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const url = item.path ? absoluteUrl(item.path) : undefined;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(url ? { item: url } : {}),
      };
    }),
  };
}
