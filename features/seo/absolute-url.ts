import { siteUrl } from "@/config/site";

/**
 * Join `siteUrl` with a site-relative path. Returns `undefined` when no
 * canonical origin is configured (site stays non-indexable).
 */
export function absoluteUrl(path: string): string | undefined {
  if (!siteUrl) return undefined;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}
