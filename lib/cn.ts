import { twMerge } from "tailwind-merge";

/**
 * Class-name joiner. Filters out falsy values so components can write
 * `cn("base", condition && "extra", className)`, then pipes the result
 * through `tailwind-merge` so a later conflicting utility (e.g. a
 * caller-supplied `className`) always wins over an earlier one — regardless
 * of the order Tailwind happens to emit the two classes in its generated
 * stylesheet.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return twMerge(classes.filter(Boolean).join(" "));
}

export default cn;
