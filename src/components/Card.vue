<script setup lang="ts">
/**
 * A surface holding one piece of content, with an optional image, heading
 * band and footer band. A clickable card is a button to assistive technology,
 * so it also answers Enter and Space.
 */
import type { Component } from 'vue';
import {
  CARD_FOOTER,
  CARD_HEADER,
  CARD_PAD,
  CARD_SURFACE,
  sectionHeading,
} from '../internal/layout';
import type { ImageRatio } from '../types';
import Image from './Image.vue';

type Pad = 'none' | 'sm' | 'md' | 'lg';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    /**
     * The card's own heading. The `header` slot wins over `heading`, and
     * `heading` over `title`.
     */
    heading?: string;
    /** 2 under a page title, 3 inside another card. */
    headingLevel?: 2 | 3;
    /** Drawn before the heading. Decorative, so it carries no name of its own. */
    icon?: Component;
    /** A count, a status or a timestamp, at the end of the heading row. */
    meta?: string;
    /** Drawn edge to edge above the heading. */
    image?: { src: string; alt: string; width?: number; height?: number; ratio?: ImageRatio };
    pad?: Pad;
    hover?: boolean;
    onClick?: (e: MouseEvent) => void;
    onKeydown?: (e: KeyboardEvent) => void;
  }>(),
  { headingLevel: 3, pad: 'md' },
);

function activate(e: KeyboardEvent) {
  props.onKeydown?.(e);
  if (!props.onClick || e.defaultPrevented) return;
  if (e.key !== 'Enter' && e.key !== ' ') return;
  // Space scrolls the page on an element that is not a button.
  e.preventDefault();
  (e.currentTarget as HTMLElement).click();
}
</script>

<template>
  <div
    data-print="keep"
    :class="[
      CARD_SURFACE,
      pad === 'none' ? 'overflow-hidden' : '',
      'transition-colors',
      hover || onClick ? 'hover:border-brand/50' : '',
      onClick ? 'cursor-pointer' : '',
      $attrs.class,
    ]"
    :role="onClick ? 'button' : undefined"
    :tabindex="onClick ? 0 : undefined"
    :onClick="onClick"
    :onKeydown="onClick ? activate : onKeydown"
  >
    <div v-if="image" class="overflow-hidden rounded-t-card [&_img]:w-full [&_img]:rounded-none">
      <Image
        :src="image.src"
        :alt="image.alt"
        :width="image.width"
        :height="image.height"
        :ratio="image.ratio"
      />
    </div>

    <div v-if="$slots.header || heading || title" :class="CARD_HEADER">
      <slot v-if="$slots.header" name="header" />
      <template v-else-if="heading">
        <div class="flex items-center gap-2">
          <component :is="icon" v-if="icon" :size="16" class="shrink-0 text-faint" />
          <h2 v-if="headingLevel === 2" :class="sectionHeading(2)">{{ heading }}</h2>
          <h3 v-else :class="sectionHeading(3)">{{ heading }}</h3>
          <span v-if="meta" class="ms-auto shrink-0 text-xs text-faint">{{ meta }}</span>
        </div>
        <p v-if="description" class="text-sm text-muted mt-0.5">{{ description }}</p>
      </template>
      <template v-else>
        <h3 class="font-heading font-semibold text-fg">{{ title }}</h3>
        <p v-if="description" class="text-sm text-muted mt-0.5">{{ description }}</p>
      </template>
    </div>

    <div :class="CARD_PAD[pad]">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="CARD_FOOTER">
      <slot name="footer" />
    </div>
  </div>
</template>
