import type { Metadata, Viewport } from "next";
import { lang } from "next/root-params";
import { isIndexable, siteName, siteUrl } from "@/config/site";
import { SiteFooter } from "@/features/site-shell/components/site-footer";
import { SiteHeader } from "@/features/site-shell/components/site-header";
import { defaultLocale, hasLocale, htmlLang, locales } from "@/i18n/config";
import { loadMessages } from "@/i18n/load-messages";
import { fontVariables } from "@/shared/fonts";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const requested = await lang();
  const locale = hasLocale(requested) ? requested : defaultLocale;
  const messages = await loadMessages(locale);

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: messages.seo.home.title,
      template: `%s | ${siteName}`,
    },
    description: messages.seo.home.description,
    robots: { index: isIndexable, follow: isIndexable },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F2822",
};

export default async function RootLayout({
  children,
  modal,
}: LayoutProps<"/[lang]">) {
  const requested = await lang();
  // Unsupported locales are rejected by the page (`getMessages()` calls
  // `notFound()`), which renders app/[lang]/not-found.tsx inside this layout.
  // Calling `notFound()` here would give an empty 404 document, because
  // nothing above the root layout can render UI. For the same reason the
  // layout uses `loadMessages(locale)` with the fallback locale instead of
  // `getMessages()`.
  const locale = hasLocale(requested) ? requested : defaultLocale;
  const { site } = await loadMessages(locale);

  return (
    <html lang={htmlLang[locale]} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only rounded-pill bg-on-dark px-6 py-3 text-small text-bg-dark shadow-lg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-skip-link"
        >
          {site.skipLink}
        </a>
        <SiteHeader locale={locale} messages={site} />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        {/* Apartment lightbox (intercepted route). A <dialog> renders in the
            top layer, so its position in the DOM only matters for reading order. */}
        {modal}
        <SiteFooter locale={locale} messages={site} />
      </body>
    </html>
  );
}
