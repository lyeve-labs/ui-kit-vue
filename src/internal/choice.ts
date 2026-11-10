/**
 * How a checkbox looks and announces itself, ported from the kit's internal
 * choice module. Only what Checkbox reads is here.
 */
import { FIELD_HINT } from './field';
import { HIT_AREA } from './touch';

/** The scale of the painted box: sm 14px, md 16px, lg 20px. */
export type ChoiceSize = 'sm' | 'md' | 'lg';

/** Inline is a box beside a label. Card is a bordered option surface. */
export type ChoiceVariant = 'inline' | 'card';

const CHOICE_SQUARE: Record<ChoiceSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const WRAP_INLINE = `${HIT_AREA} inline-flex select-none items-start gap-2.5`;

const WRAP_CARD = 'flex select-none items-start gap-2.5 rounded-lg border p-3 transition-colors';

/**
 * The clickable wrapper. The cursor is a ternary because two cursor utilities
 * on one element resolve by stylesheet order, not by the order written.
 */
export function choiceWrap(variant: ChoiceVariant, checked: boolean, disabled: boolean): string {
  const cursor = disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';
  if (variant === 'card') {
    const paint = checked ? 'border-brand bg-brand/8' : 'border-line-strong bg-surface-2';
    return `${WRAP_CARD} ${paint} ${cursor}`;
  }
  return `${WRAP_INLINE} ${cursor}`;
}

/** The transparent input that covers the painted box and carries every native semantic. */
export const CHOICE_INPUT =
  'peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed';

const BOX_BASE = 'pointer-events-none flex shrink-0 items-center justify-center transition-colors';

/** The focus ring, outside every checked branch so choosing an option keeps it. */
export const CHOICE_FOCUS =
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand peer-focus-visible:outline-offset-2';

/** The painted box. A part-checked box paints exactly what a checked one paints. */
export function checkboxBox(size: ChoiceSize, checked: boolean, mixed: boolean): string {
  const paint = checked || mixed ? 'border-brand bg-brand text-ink' : 'border-line-strong bg-surface-2';
  return `${BOX_BASE} ${CHOICE_SQUARE[size]} rounded-xs border ${paint} ${CHOICE_FOCUS}`;
}

/** The label stack beside or under the box. */
export const CHOICE_LABEL_STACK = 'flex flex-col gap-0.5';

/** The label text, sized with the control. */
export function choiceLabel(size: ChoiceSize): string {
  const scale: Record<ChoiceSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  return `${scale[size]} text-fg`;
}

/** Secondary line under the label, the class a text field's hint uses. */
export const CHOICE_DESCRIPTION = FIELD_HINT;

/** The icon slot ahead of the label, fixed to the box size. */
export function choiceIcon(size: ChoiceSize): string {
  return `flex shrink-0 items-center justify-center ${CHOICE_SQUARE[size]}`;
}

/** Pixel size for an icon at each size, the same the slot reserves. */
export const CHOICE_ICON_PX: Record<ChoiceSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

/** The check and the mixed marks, as SVG path data on the box's 10 by 8 grid. */
export const CHOICE_MARK: { check: string; mixed: string } = {
  check: 'M1 4l3 3 5-6',
  mixed: 'M1.5 4h7',
};

