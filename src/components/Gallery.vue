<script setup lang="ts">
/**
 * Images in a grid, or in a row that scrolls sideways and stops on each one,
 * with no script. The row is a scrolling region, so it takes keyboard focus
 * and a name, and a reader moves it with the arrow keys.
 */
import type { GalleryImage } from '../types';
import Image from './Image.vue';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    images: GalleryImage[];
    layout?: 'grid' | 'row';
    /** The row's name for a screen reader. */
    label?: string;
  }>(),
  { layout: 'grid', label: 'Gallery' },
);

const LAYOUT = {
  grid: 'grid gap-gutter grid-cols-[repeat(auto-fill,minmax(min(100%,var(--spacing-column-min)),1fr))]',
  row: 'relative flex snap-x snap-mandatory gap-gutter overflow-x-auto overscroll-x-contain pb-site-sm',
} as const;
</script>

<template>
  <!-- A list without its markers loses the list role in WebKit, and with it
       the row's name, so the role is stated. -->
  <ul
    v-if="images.length > 0"
    role="list"
    :class="['m-0 list-none p-0', LAYOUT[layout], $attrs.class]"
    :tabindex="layout === 'row' ? 0 : undefined"
    :aria-label="layout === 'row' ? label : undefined"
  >
    <li
      v-for="(image, i) in images"
      :key="i"
      :class="layout === 'row' ? 'shrink-0 basis-[min(80%,22rem)] snap-start' : 'min-w-0'"
    >
      <Image :src="image.src" :alt="image.alt" :caption="image.caption" ratio="4/3" />
    </li>
  </ul>
</template>
