<script setup lang="ts">
/**
 * A heading for a section of a page, with an optional row of controls beside
 * it. Taking the level rather than a free-form class means the type treatment
 * cannot disagree with the element.
 */
import { sectionHeading, type SectionVariant } from '../internal/layout';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    /** 2 under a page title, 3 inside a card. The element, not the treatment. */
    level?: 2 | 3;
    /** `eyebrow` is the small uppercase label above a band, at either level. */
    variant?: SectionVariant;
  }>(),
  { level: 2, variant: 'default' },
);
</script>

<template>
  <div :class="['flex flex-wrap items-center justify-between gap-4', $attrs.class]">
    <h2 v-if="level === 2" :class="sectionHeading(2, variant)"><slot /></h2>
    <h3 v-else :class="sectionHeading(3, variant)"><slot /></h3>
    <div v-if="$slots.actions" class="ms-auto flex min-w-0 flex-wrap items-center justify-end gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
