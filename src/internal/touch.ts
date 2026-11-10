/**
 * The two ways a control reaches 44px under a finger. Both compile to nothing
 * under a mouse, because the stylesheet declares them inside `pointer: coarse`.
 */

/** The control grows, for a control whose visual may take the finger's size. */
export const TOUCH_GROW = 'coarse:min-h-control coarse:min-w-control';

/** The control stays as drawn and its hit box grows. The element must be positioned. */
export const HIT_AREA = 'relative hit-area';
