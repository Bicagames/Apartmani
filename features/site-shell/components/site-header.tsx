import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import { LanguageSwitcher } from "@/features/site-shell/components/language-switcher";
import { MobileMenu } from "@/features/site-shell/components/mobile-menu";
import { Wordmark } from "@/features/site-shell/components/wordmark";
import {
  getNavItems,
  getReservationsItem,
} from "@/features/site-shell/nav-items";
import { ButtonLink } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

type SiteHeaderProps = {
  locale: Locale;
  messages: Messages["site"];
  /**
   * Forces the solid header. Without it the header is solid by default and,
   * while it sits over a `[data-hero]` section, shows a frosted blur instead
   * (see the "Site header" block in app/globals.css).
   */
  solid?: boolean;
};

export const SiteHeader = ({ locale, messages, solid }: SiteHeaderProps) => {
  const items = getNavItems(locale, messages.nav);
  const cta = getReservationsItem(locale, messages.nav);

  return (
    <header
      className="site-header fixed inset-x-0 top-0 z-header h-(--header-h) text-text"
      data-solid={solid ? "" : undefined}
    >
      {/* Blur sits under the solid layer. It is hidden unless the scroll-driven
          hero rule reveals it; the solid layer then fades in on top. */}
      <div
        aria-hidden="true"
        className="site-header-blur pointer-events-none absolute inset-0 border-b border-on-dark/25 bg-bg/65 opacity-0 shadow-sm backdrop-blur-2xl backdrop-saturate-150"
      />
      <div
        aria-hidden="true"
        className="site-header-bg absolute inset-0 border-b border-border bg-bg shadow-sm"
      />
      <Container className="relative grid h-full grid-cols-[1fr_auto] items-center gap-6 md:grid-cols-[auto_1fr_auto]">
        <Wordmark
          name={messages.name}
          href={localizedPath(locale, "/")}
          label={messages.homeLabel}
          className="justify-self-start"
        />

        <nav aria-label={messages.nav.label} className="hidden md:block">
          <ul className="flex items-center justify-center gap-6 lg:gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-small whitespace-nowrap underline-offset-8 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-start-2 flex items-center justify-self-end gap-2 md:col-start-3 lg:gap-4">
          <div className="hidden lg:block">
            <LanguageSwitcher locale={locale} label={messages.languages.label} />
          </div>
          <div className="hidden md:block">
            <ButtonLink href={cta.href} className="max-lg:px-4">
              {cta.label}
            </ButtonLink>
          </div>
          <MobileMenu
            items={items}
            cta={cta}
            brand={<Wordmark name={messages.name} onDark />}
            locale={locale}
            languageLabel={messages.languages.label}
            labels={{
              title: messages.menu.title,
              nav: messages.nav.label,
              open: messages.menu.open,
              close: messages.menu.close,
            }}
          />
        </div>
      </Container>
    </header>
  );
};
