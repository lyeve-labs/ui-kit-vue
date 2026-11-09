<script setup lang="ts">
/**
 * A band of a page: an optional introduction, the content and an optional
 * footer, padded on the site spacing scale. A background image fills the band
 * behind the content, and an overlay between the two names its scheme in
 * `data-scheme`, so everything inside draws in that palette and stays
 * readable whatever the image shows. The layers stack by source order.
 */
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The band's name for a screen reader, which makes it a region. */
    label?: string;
    /** Drawn behind the content and cropped to the band. */
    image?: { src: string; alt?: string };
    overlay?: 'none' | 'light' | 'dark';
    /** `tall` is 60% of the window and `screen` all of it, content centered. */
    height?: 'auto' | 'tall' | 'screen';
  }>(),
  { overlay: 'none', height: 'auto' },
);

const HEIGHT = {
  auto: '',
  tall: 'min-h-band-tall justify-center',
  screen: 'min-h-svh justify-center',
} as const;

const layered = computed(() => props.image !== undefined || props.overlay !== 'none');
</script>

<template>
  <section
    :aria-label="label"
    :data-scheme="overlay === 'none' ? undefined : overlay"
    :class="[
      'relative isolate flex flex-col gap-site-md px-site-lg py-site-xl',
      HEIGHT[height],
      layered ? 'overflow-hidden rounded-md' : '',
      $attrs.class,
    ]"
  >
    <img
      v-if="image"
      class="absolute inset-0 size-full object-cover"
      :src="image.src"
      :alt="image.alt ?? ''"
      decoding="async"
    />
    <div v-if="overlay !== 'none'" class="absolute inset-0 bg-ink/85" aria-hidden="true"></div>
    <header v-if="$slots.intro" class="relative"><slot name="intro" /></header>
    <div v-if="$slots.default" class="relative"><slot /></div>
    <footer v-if="$slots.footer" class="relative"><slot name="footer" /></footer>
  </section>
</template>
