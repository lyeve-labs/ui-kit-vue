/**
 * The characters a browser drops before it reads the scheme. A tab written
 * inside the word `javascript` still navigates, so the test runs on the value
 * with them removed.
 */
const IGNORED = /[\u0000- ]/g;

const DENIED = /^(?:javascript|data|vbscript):/i;

/** The href as given, or nothing when its scheme is one no component will emit. */
export function safeHref(href: string | undefined | null): string | undefined {
  if (!href) return undefined;
  return DENIED.test(href.replace(IGNORED, '')) ? undefined : href;
}
