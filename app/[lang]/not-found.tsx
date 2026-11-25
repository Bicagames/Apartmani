import { lang } from "next/root-params";
import { NotFoundView } from "@/features/site-shell/components/not-found-view";
import { defaultLocale, hasLocale, localizedPath } from "@/i18n/config";
import { loadMessages } from "@/i18n/load-messages";

export default async function NotFound() {
  const requested = await lang();
  // Fall back to the default locale: this also renders for unsupported `lang`.
  const locale = hasLocale(requested) ? requested : defaultLocale;
  const messages = await loadMessages(locale);

  return (
    <NotFoundView
      messages={messages.site.notFound}
      homeHref={localizedPath(locale, "/")}
    />
  );
}
