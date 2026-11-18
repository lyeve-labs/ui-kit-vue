/**
 * How a form control looks and announces itself, ported from the kit's
 * internal module of the same name. Only what the ported components read is
 * here.
 */

/** Vertical rhythm inside a labeled field: label, control, hint or error. */
export const FIELD_WRAP = 'flex flex-col gap-1.5';

/** The label above a control. */
export const FIELD_LABEL = 'text-sm font-medium text-fg';

/** Hint text below a control. Shown only when there is no error. */
export const FIELD_HINT = 'text-xs text-faint';

/** Error text below a control. Replaces the hint rather than stacking with it. */
export const FIELD_ERROR = 'text-xs text-danger';

const CONTROL_DEPTH = 'inset-shadow-well';

/**
 * The focus mark of a field in error, whose red border cannot turn the focus
 * color, so a 1px inset ring repeats the border while it has focus. Any other
 * field shows focus by its border alone.
 */
const CONTROL_FOCUS_RING = 'focus-visible:ring-1 focus-visible:ring-inset';

/** Everything a single-line control needs except its border color. */
export const CONTROL_BASE =
  'w-full h-control rounded-lg bg-surface-2 border px-3 text-sm text-fg ' +
  'placeholder:text-faint transition-colors outline-none ' +
  `${CONTROL_DEPTH} ` +
  'disabled:opacity-50 disabled:cursor-not-allowed';

/** As CONTROL_BASE, for controls whose height is driven by their content. */
export const CONTROL_MULTILINE =
  'w-full min-h-control rounded-lg bg-surface-2 border px-3 py-2 text-sm text-fg ' +
  'placeholder:text-faint transition-colors outline-none ' +
  `${CONTROL_DEPTH} ` +
  'disabled:opacity-50 disabled:cursor-not-allowed';

/**
 * The border a control carries at rest, under the pointer and on focus. The
 * kit also paints a suggested value violet, which needs its form assistant, so
 * that branch is not ported.
 */
export function controlBorder(error: boolean): string {
  return error
    ? `border-danger focus:border-danger ${CONTROL_FOCUS_RING} focus-visible:ring-danger`
    : 'border-line hover:border-line-strong focus:border-focus';
}

/**
 * Wires a control to whichever of its hint or error is on screen. Undefined
 * when neither is present, so the attribute is left off rather than pointing
 * at an element that was never rendered.
 */
export function describedBy(
  id: string | undefined,
  error?: string,
  hint?: string,
): string | undefined {
  if (!id) return undefined;
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/** Joins a control's own message id with the ids its caller names. */
export function joinIds(...ids: (string | undefined)[]): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined;
}
