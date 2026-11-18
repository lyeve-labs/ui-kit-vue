<script setup lang="ts">
/**
 * One disclosure. The browser opens and closes it, so it works before any
 * script runs. The title is plain text, never a heading: a screen reader
 * treats a summary as a button, and a heading inside one hides the item's
 * state.
 */
import { inject } from 'vue';
import ChevronDown from '../internal/ChevronDown.vue';
import { ACCORDION } from '../internal/accordion';

defineOptions({ inheritAttrs: false });

defineProps<{
  /** The item's id on the page, so a link can point at it. Unique on the page. */
  id: string;
  title: string;
}>();

const ctx = inject(ACCORDION, undefined);
</script>

<template>
  <details :id="id" :name="ctx?.name" :class="['bg-surface', $attrs.class]">
    <summary
      class="flex w-full cursor-pointer list-none items-center justify-between px-5 py-4 text-start text-sm font-medium text-fg transition-colors hover:bg-surface-2/50 [[open]>&]:bg-surface-2/40 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus [&::-webkit-details-marker]:hidden"
    >
      <span>{{ title }}</span>
      <ChevronDown
        :size="16"
        class="shrink-0 text-faint transition-transform duration-base [[open]>summary>&]:rotate-180"
        aria-hidden="true"
      />
    </summary>
    <div class="[[open]>&]:animate-popover-in px-5 pb-4 pt-1 text-sm text-muted">
      <slot />
    </div>
  </details>
</template>
