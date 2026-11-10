<script setup lang="ts">
/**
 * An image whose box is reserved before its bytes arrive, so the text under
 * it never moves. With its own width and height the browser works the box
 * out from them, and without them the image is cropped to `ratio`. Every
 * attribute on the `img` is written out by name, and no handler is bound.
 */
import { computed } from 'vue';
import type { ImageRatio } from '../types';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    src: string;
    /** What the image shows. An empty string marks it decorative. */
    alt: string;
    /** The image's own size in pixels. Both, or the ratio reserves the box. */
    width?: number;
    height?: number;
    /** The box an image of unknown size is cropped to. */
    ratio?: ImageRatio;
    /** Drawn under the image, which then sits in a figure. */
    caption?: string;
    /** `eager` for an image a reader sees before scrolling. */
    loading?: 'lazy' | 'eager';
  }>(),
  { ratio: '16/9', loading: 'lazy' },
);

const RATIO: Record<ImageRatio, string> = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '16/9': 'aspect-video',
};

const imgClass = computed(() =>
  props.width !== undefined && props.height !== undefined
    ? 'block h-auto max-w-full rounded-md'
    : `block w-full rounded-md object-cover ${RATIO[props.ratio]}`,
);
</script>

<template>
  <figure v-if="caption" :class="['m-0', $attrs.class]">
    <img
      :class="imgClass"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      decoding="async"
    />
    <figcaption class="mt-site-xs text-sm text-muted">{{ caption }}</figcaption>
  </figure>
  <img
    v-else
    :class="[imgClass, $attrs.class]"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    decoding="async"
  />
</template>
