import { siteName } from "@/config/site";
import { absoluteUrl } from "../absolute-url";
import type { JsonLdNode } from "./types";

type BuildWebSiteSchemaInput = {
  /** Locale-prefixed home path, e.g. `/sr`. */
  path: string;
  /** BCP 47 tag for this page, e.g. `sr-Latn`, `en`, `de`, `ru`. */
  inLanguage: string;
};

/** Schema.org `WebSite` for the showcase origin. */
export function buildWebSiteSchema({
  path,
  inLanguage,
}: BuildWebSiteSchemaInput): JsonLdNode {
  const url = absoluteUrl(path);

  return {
    "@type": "WebSite",
    name: siteName,
    inLanguage,
    ...(url ? { url } : {}),
  };
}
