import Link from "next/link";
import type { Messages } from "@/i18n/load-messages";

type NotFoundViewProps = {
  messages: Messages["site"]["notFound"];
  homeHref: string;
};

// Content only, no landmark: inside app/[lang]/layout.tsx it sits in
// `<main id="main">`, and app/global-not-found.tsx wraps it in its own
// `<main>`. The top padding clears the fixed header where there is one.
export const NotFoundView = ({ messages, homeHref }: NotFoundViewProps) => (
  <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-4 px-(--space-gutter) pt-[calc(var(--header-h)+var(--space-section)/2)] pb-(--space-section)">
    <p className="eyebrow">{messages.eyebrow}</p>
    <h1 className="font-display text-h1">{messages.title}</h1>
    <p className="text-lead text-text-muted">{messages.text}</p>
    <Link
      href={homeHref}
      className="inline-flex min-h-11 items-center text-small text-accent underline underline-offset-4"
    >
      {messages.homeLink}
    </Link>
  </div>
);
