import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";

type ApartmentBreadcrumbProps = {
  locale: Locale;
  /** Name of the current apartment (last, not a link). */
  name: string;
  messages: Messages["apartments"]["detail"]["breadcrumb"];
};

const linkClasses =
  "inline-flex min-h-11 items-center underline-offset-4 hover:underline";

export const ApartmentBreadcrumb = ({
  locale,
  name,
  messages,
}: ApartmentBreadcrumbProps) => (
  <nav aria-label={messages.label}>
    <ol className="flex flex-wrap items-center text-small text-text-muted">
      <li>
        <Link href={localizedPath(locale, "/")} className={linkClasses}>
          {messages.home}
        </Link>
      </li>
      <li className="flex items-center">
        <ChevronRight aria-hidden="true" className="mx-1 size-4 shrink-0" />
        <Link
          href={localizedPath(locale, "/#apartmani")}
          className={linkClasses}
        >
          {messages.apartments}
        </Link>
      </li>
      <li className="flex items-center">
        <ChevronRight aria-hidden="true" className="mx-1 size-4 shrink-0" />
        <span aria-current="page" className="text-text">
          {name}
        </span>
      </li>
    </ol>
  </nav>
);
