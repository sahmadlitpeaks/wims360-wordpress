/**
 * Tiny class-name joiner. Filters out falsy values so components can write
 * `cn("base", condition && "extra", className)` without pulling in clsx.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export default cn;
