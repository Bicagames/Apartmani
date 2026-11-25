import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "on-dark"
  | "on-dark-outline";

type VariantProps = {
  variant?: ButtonVariant;
};

// Only transform/colour/opacity transition. The hover lift is `motion-safe:`.
// Letter-spacing 0.08em comes from docs/style-guide.md (no theme token for it).
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border px-6 py-3 text-center text-small tracking-[0.08em] uppercase " +
  "transition-[color,background-color,border-color,opacity,translate] duration-(--duration-fast) ease-out " +
  "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-60 " +
  "[&_svg]:size-5 [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-brand text-on-dark hover:bg-brand-hover",
  secondary:
    "border-brand text-brand hover:bg-brand hover:text-on-dark",
  "on-dark":
    "border-transparent bg-on-dark text-bg-dark hover:bg-bg-alt",
  "on-dark-outline":
    "border-on-dark text-on-dark hover:bg-on-dark hover:text-bg-dark",
};

function buttonClasses(variant: ButtonVariant, className?: string) {
  return cn(base, variants[variant], className);
}

const externalHref = /^(tel:|mailto:|https?:|viber:|tg:)/i;

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> &
  VariantProps & {
    href: string;
  };

/**
 * Link styled as a button. Internal paths (also with a hash, e.g. `/sr#kontakt`)
 * use `next/link`; `tel:`, `mailto:` and `http(s):` render a plain anchor.
 * Icons (lucide) go in as children, before or after the label.
 */
export function ButtonLink({
  variant = "primary",
  href,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);

  if (externalHref.test(href)) {
    return <a href={href} className={classes} {...props} />;
  }

  return <Link href={href} className={classes} {...props} />;
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & VariantProps;

export function Button({
  variant = "primary",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}
