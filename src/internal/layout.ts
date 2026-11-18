/**
 * How a card and a section heading are spaced, ported from the kit's internal
 * layout module. Only what the ported components read is here.
 */

/** The treatment a section heading takes, independent of its level. */
export type SectionVariant = 'default' | 'eyebrow';

/** The card surface, without its padding. */
export const CARD_SURFACE =
  'bg-surface bg-card border border-line rounded-card shadow-card inset-shadow-highlight';

/** Card padding by name. */
export const CARD_PAD: Record<'none' | 'sm' | 'md' | 'lg', string> = {
  none: '',
  sm: 'p-card-sm',
  md: 'p-card',
  lg: 'p-page-x',
};

/** The band above a card's content. */
export const CARD_HEADER = 'px-card py-card-sm border-b border-line';

/** The band below a card's content. CARD_HEADER's inset, with the rule on top. */
export const CARD_FOOTER = 'px-card py-card-sm border-t border-line bg-surface-2/40 rounded-b-card';

/**
 * A section heading's classes. The eyebrow is a label for the band under it,
 * so it reads the same at both levels.
 */
export function sectionHeading(level: 2 | 3, variant: SectionVariant = 'default'): string {
  if (variant === 'eyebrow') return 'text-xs font-semibold uppercase tracking-wider text-muted';
  return level === 2
    ? 'font-heading text-h3 leading-h3 tracking-h3 font-semibold text-fg'
    : 'font-heading text-sm font-semibold text-fg';
}
