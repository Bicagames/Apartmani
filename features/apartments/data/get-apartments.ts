import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Apartment } from "../types";
import { apartments } from "./apartments";

/*
 * The ONLY module that knows where apartment data comes from. Components and
 * routes must read apartments through these functions.
 *
 * Planned Supabase swap (plan section 3, docs/plans/2026-11-16-family-resort-skeleton.md):
 * - query with a public anon, cookie-less client so the data stays static;
 * - admin writes call `revalidateTag('apartments')`;
 * - `images[].src` becomes a Supabase Storage URL, so add `images.remotePatterns`
 *   to next.config.ts.
 *
 * `'use cache'` notes: arguments and return values must be serializable (plain
 * objects, arrays, primitives). Return a fresh array, never the module-level one.
 */

/** All apartments, sorted by `order`. */
export async function getApartments(): Promise<Apartment[]> {
  "use cache";
  cacheLife("days");
  cacheTag("apartments");

  return [...apartments].sort((a, b) => a.order - b.order);
}

/** One apartment by slug, or `null` when the slug is unknown. */
export async function getApartmentBySlug(
  slug: string,
): Promise<Apartment | null> {
  "use cache";
  cacheLife("days");
  cacheTag("apartments");

  return apartments.find((apartment) => apartment.slug === slug) ?? null;
}

/** Slugs of all apartments in display order, e.g. for `generateStaticParams`. */
export async function getApartmentSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("apartments");

  return [...apartments]
    .sort((a, b) => a.order - b.order)
    .map((apartment) => apartment.slug);
}
