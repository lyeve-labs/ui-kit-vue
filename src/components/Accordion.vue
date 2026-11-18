<script setup lang="ts">
/**
 * A set of disclosures. Each item is a `details` element, so the browser
 * opens and closes it and a page rendered on the server needs no script.
 * Unless `multiple` is set the items share one `name`, and opening one closes
 * the others. The name comes from `useId`, so a page put together from
 * several server renders gives each app its own `idPrefix`.
 */
import { provide, useId } from 'vue';
import { ACCORDION } from '../internal/accordion';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  /** Lets more than one item stay open. By default opening one closes the others. */
  multiple?: boolean;
  /** Drops the outer border and rounding, for an accordion inside a card or panel. */
  flush?: boolean;
}>();

const uid = useId();

provide(ACCORDION, {
  get name() {
    return props.multiple ? undefined : `accordion-${uid}`;
  },
});
</script>

<template>
  <div
    :class="[
      flush ? 'divide-y divide-line' : 'divide-y divide-line rounded-xl border border-line overflow-hidden',
      $attrs.class,
    ]"
  >
    <slot />
  </div>
</template>
