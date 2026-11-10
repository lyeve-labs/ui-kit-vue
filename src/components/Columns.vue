<script setup lang="ts">
/**
 * Each child is a column. Columns stand side by side while each keeps the
 * site's minimum column width and stack once one would fall under it, so they
 * need no breakpoint. `max` caps how many stand in one row by raising each
 * column's minimum to its share of the row.
 */
defineOptions({ inheritAttrs: false });

defineProps<{ max?: 2 | 3 | 4 }>();

const TRACKS = {
  auto: 'grid-cols-[repeat(auto-fit,minmax(min(100%,var(--spacing-column-min)),1fr))]',
  2: 'grid-cols-[repeat(auto-fit,minmax(min(100%,max(var(--spacing-column-min),calc((100%_-_var(--spacing-gutter))/2))),1fr))]',
  3: 'grid-cols-[repeat(auto-fit,minmax(min(100%,max(var(--spacing-column-min),calc((100%_-_2*var(--spacing-gutter))/3))),1fr))]',
  4: 'grid-cols-[repeat(auto-fit,minmax(min(100%,max(var(--spacing-column-min),calc((100%_-_3*var(--spacing-gutter))/4))),1fr))]',
} as const;
</script>

<template>
  <div :class="['grid gap-gutter', TRACKS[max ?? 'auto'], $attrs.class]">
    <slot />
  </div>
</template>
