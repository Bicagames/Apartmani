import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale } from "./config";
import { loadMessages, type Messages } from "./load-messages";

export type { Messages };

/**
 * Messages for the current route's locale. Server Components only.
 * Call once per page/layout and pass slices (e.g. `messages.site.nav`) down.
 */
export async function getMessages(): Promise<Messages> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return loadMessages(locale);
}
