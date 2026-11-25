import Link from "next/link";
import { copyrightYear, email } from "@/config/site";
import { LanguageSwitcher } from "@/features/site-shell/components/language-switcher";
import { Wordmark } from "@/features/site-shell/components/wordmark";
import {
  getNavItems,
  getReservationsItem,
} from "@/features/site-shell/nav-items";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import { Container } from "@/shared/ui/container";

type SiteFooterProps = {
  locale: Locale;
  messages: Messages["site"];
};

const linkClasses =
  "inline-flex min-h-11 items-center underline-offset-4 hover:underline";

const headingClasses = "eyebrow eyebrow-on-dark";

export const SiteFooter = ({ locale, messages }: SiteFooterProps) => {
  const { footer } = messages;
  const navItems = [
    ...getNavItems(locale, messages.nav),
    getReservationsItem(locale, messages.nav),
  ];

  return (
    <footer className="bg-bg-dark text-on-dark">
      <Container className="py-(--space-section)">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <div className="flex flex-col items-start gap-3">
            <Wordmark
              name={messages.name}
              href={localizedPath(locale, "/")}
              label={messages.homeLabel}
              onDark
            />
            <p className="text-on-dark-muted">{footer.tagline}</p>
            <LanguageSwitcher
              locale={locale}
              label={messages.languages.label}
              tone="on-dark"
            />
            <a href={`mailto:${email}`} className={linkClasses}>
              {email}
            </a>
          </div>

          <nav aria-label={footer.navLabel} className="flex flex-col gap-4">
            <h2 className={headingClasses}>{footer.menuTitle}</h2>
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-on-dark-muted/25 pt-6 text-small text-on-dark-muted">
          &copy; {copyrightYear} {messages.name}. {footer.rights}.
        </p>
      </Container>
    </footer>
  );
};
