<script setup lang="ts">
/**
 * A site's navigation: its name or logo, its links and one call to action.
 * The links wrap onto more lines as the page narrows, so every one stays in
 * reach on a phone without a menu that needs script.
 */
import { computed } from 'vue';
import type { NavLink } from '../types';
import Button from './Button.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The site's name, drawn beside the logo. */
    brand?: string;
    /** Drawn 32px tall. Its width and height reserve its box. */
    logo?: { src: string; alt: string; width: number; height: number };
    links?: NavLink[];
    /** The one button at the end of the bar. */
    action?: { label: string; href: string };
    /** The landmark's name for a screen reader. */
    label?: string;
  }>(),
  { links: () => [], label: 'Main' },
);

// The name beside a logo already says what the logo shows.
const logoAlt = computed(() => (props.brand ? '' : (props.logo?.alt ?? '')));
</script>

<template>
  <nav
    :aria-label="label"
    :class="['flex flex-wrap items-center gap-x-site-md gap-y-site-sm', $attrs.class]"
  >
    <span
      v-if="brand || logo"
      class="me-auto inline-flex items-center gap-site-sm font-heading text-xl font-bold text-fg"
    >
      <img
        v-if="logo"
        class="h-8 w-auto"
        :src="logo.src"
        :alt="logoAlt"
        :width="logo.width"
        :height="logo.height"
        decoding="async"
      />
      {{ brand ?? '' }}
    </span>
    <ul v-if="links.length > 0" class="m-0 flex list-none flex-wrap gap-x-site-md gap-y-site-xs p-0">
      <li v-for="(link, i) in links" :key="i" class="shrink-0">
        <a
          v-if="link.href"
          :href="link.href"
          :aria-current="link.current ? 'page' : undefined"
          class="text-fg no-underline underline-offset-4 transition-colors hover:text-brand hover:underline aria-[current=page]:text-brand aria-[current=page]:underline"
          >{{ link.label }}</a
        >
        <span v-else class="text-fg">{{ link.label }}</span>
      </li>
    </ul>
    <Button v-if="action" :href="action.href">{{ action.label }}</Button>
  </nav>
</template>
