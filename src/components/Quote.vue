<script setup lang="ts">
/**
 * A quotation and who said it, set off by a rule in the site's second color.
 * The rule carries no information, so it is held to no contrast floor.
 */
defineOptions({ inheritAttrs: false });

defineProps<{
  /** Who said it, drawn under the quotation. */
  source?: string;
}>();
</script>

<template>
  <figure :class="['m-0 border-s-4 border-brand-2 ps-site-md', $attrs.class]">
    <blockquote class="m-0 font-heading text-xl text-fg">
      <p class="m-0"><slot /></p>
    </blockquote>
    <figcaption v-if="source" class="mt-site-xs text-sm text-muted">{{ source }}</figcaption>
  </figure>
</template>
