import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import { cn } from "@/shared/lib/cn";
import { formatPrice } from "../format-price";
import type { Apartment } from "../types";

type PriceLabelProps = {
  locale: Locale;
  price: Apartment["price"];
  messages: Messages["apartments"]["card"];
  /** `lg` sets the euro amount in the display font (detail price block). */
  size?: "sm" | "lg";
  className?: string;
};

/** "od 60 € / 7.000 RSD po noći": both currencies, whole units. */
export const PriceLabel = ({
  locale,
  price,
  messages,
  size = "sm",
  className,
}: PriceLabelProps) => (
  <p className={cn("text-small text-text-muted", className)}>
    <span>{messages.from}</span>{" "}
    <span
      className={cn(
        "text-text",
        size === "lg" ? "font-display text-h3 lining-nums" : "font-semibold",
      )}
    >
      {formatPrice(locale, price.fromEur, "EUR")}
    </span>{" "}
    <span>
      / {formatPrice(locale, price.fromRsd, "RSD")} {messages.perNight}
    </span>
  </p>
);
