import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { AppImage } from "@/shared/ui/image";

type WordmarkProps = {
  /** Visible text, from `messages.site.name`. */
  name: string;
  /** Renders a link when set (header, footer); plain text otherwise. */
  href?: string;
  /** Accessible name of the link. Must contain the visible text. */
  label?: string;
  /** Invert the black silhouette for a dark background. */
  onDark?: boolean;
  className?: string;
};

const classes =
  "inline-flex min-h-11 items-center gap-3 font-display text-[1.5rem] leading-[1.2] font-semibold lg:text-h3 tracking-[0.14em] whitespace-nowrap uppercase";

const Logo = ({ onDark }: { onDark?: boolean }) => (
  <AppImage
    src="/images/logo.png"
    alt=""
    width={156}
    height={303}
    className={cn(
      "h-9 w-auto md:h-11",
      onDark && "brightness-0 invert",
    )}
  />
);

export const Wordmark = ({
  name,
  href,
  label,
  onDark,
  className,
}: WordmarkProps) => {
  if (href) {
    return (
      <Link href={href} aria-label={label} className={cn(classes, className)}>
        <Logo onDark={onDark} />
        {name}
      </Link>
    );
  }

  return (
    <span className={cn(classes, className)}>
      <Logo onDark={onDark} />
      {name}
    </span>
  );
};
