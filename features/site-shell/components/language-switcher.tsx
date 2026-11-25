"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  htmlLang,
  localeNativeName,
  localeShortName,
  locales,
  localizedPath,
  pathWithoutLocale,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/shared/lib/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  /** Accessible name of the navigation, e.g. "Language". */
  label: string;
  tone?: "default" | "on-dark";
  /** Called after a language link is chosen, e.g. to close the mobile menu. */
  onNavigate?: () => void;
};

/**
 * Links to the same path in every language. The href is built from the current
 * URL so an apartment page stays on that apartment. Crawlers and guests both
 * need these links: `hreflang` alone does not let a person change language.
 */
export const LanguageSwitcher = ({
  locale,
  label,
  tone = "default",
  onNavigate,
}: LanguageSwitcherProps) => {
  const pathname = usePathname();
  const path = pathWithoutLocale(pathname);

  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1">
        {locales.map((code) => {
          const current = code === locale;

          return (
            <li key={code}>
              <Link
                href={localizedPath(code, path)}
                hrefLang={htmlLang[code]}
                lang={htmlLang[code]}
                aria-current={current ? "page" : undefined}
                aria-label={localeNativeName[code]}
                onClick={onNavigate}
                className={cn(
                  "inline-flex min-h-11 items-center px-1.5 text-small tracking-wide",
                  current
                    ? "font-semibold underline underline-offset-4"
                    : tone === "on-dark"
                      ? "text-on-dark-muted hover:text-on-dark"
                      : "text-text-muted hover:text-text",
                )}
              >
                {localeShortName[code]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
