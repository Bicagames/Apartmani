type ClassValue = string | false | null | undefined;

/**
 * Joins the truthy class names. It does not resolve conflicting Tailwind
 * utilities (no tailwind-merge): a caller's `className` adds to the defaults,
 * so only pass classes that do not fight the primitive's own utilities.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
