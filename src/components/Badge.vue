<script setup lang="ts">
/**
 * A short label in a tinted pill. It never breaks inside itself, and the
 * label sits in a truncating span so a capped badge ends in an ellipsis.
 */
import { CHIP_TONE, type AccentTone } from '../internal/tone';

type Size = 'sm' | 'md';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    tone?: AccentTone;
    size?: Size;
    /** Draws a dot of the badge's tone before the label. */
    dot?: boolean;
  }>(),
  { tone: 'neutral', size: 'sm' },
);

const dotColor: Record<AccentTone, string> = {
  neutral: 'bg-muted ring-2 ring-muted/20',
  brand: 'bg-brand ring-2 ring-brand/25',
  violet: 'bg-violet ring-2 ring-violet/25',
  success: 'bg-success ring-2 ring-success/25',
  warn: 'bg-warn ring-2 ring-warn/25',
  danger: 'bg-danger ring-2 ring-danger/25',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs px-2 py-0.5 gap-1.5',
  md: 'text-sm px-2.5 py-1 gap-1.5',
};
</script>

<template>
  <span
    :class="[
      'inline-flex max-w-full items-center font-medium whitespace-nowrap rounded-full border',
      CHIP_TONE[tone],
      sizes[size],
      $attrs.class,
    ]"
  >
    <span v-if="dot" :class="['w-1.5 h-1.5 shrink-0 rounded-full', dotColor[tone]]"></span>
    <span class="min-w-0 truncate [&>svg]:inline [&>svg]:align-middle"><slot /></span>
  </span>
</template>
