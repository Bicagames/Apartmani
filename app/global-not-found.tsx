import type { Metadata } from "next";
import { NotFoundView } from "@/features/site-shell/components/not-found-view";
import { defaultLocale, htmlLang, localizedPath } from "@/i18n/config";
import { loadMessages } from "@/i18n/load-messages";
import { fontVariables } from "@/shared/fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const messages = await loadMessages(defaultLocale);
  return { title: messages.site.notFound.title };
}

// Renders for URLs that match no route (e.g. /xx/yy, /sr/zzz). It bypasses
// layouts, so html/body, fonts and CSS are repeated here.
export default async function GlobalNotFound() {
  const messages = await loadMessages(defaultLocale);

  return (
    <html lang={htmlLang[defaultLocale]} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <main className="flex flex-1 flex-col">
          <NotFoundView
            messages={messages.site.notFound}
            homeHref={localizedPath(defaultLocale, "/")}
          />
        </main>
      </body>
    </html>
  );
}
