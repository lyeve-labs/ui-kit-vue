<script setup lang="ts">
/**
 * A label for a control. The required marker is decorative, so set
 * `required` on the control as well: its own attribute is what a screen
 * reader reports.
 */
import { FIELD_LABEL } from '../internal/field';

defineOptions({ inheritAttrs: false });

const props = defineProps<{ for?: string; required?: boolean; hint?: string }>();
</script>

<template>
  <label :for="props.for" :class="['flex items-center gap-1', FIELD_LABEL, $attrs.class]">
    <slot />
    <span v-if="required" class="text-danger font-bold leading-none" aria-hidden="true">*</span>
    <span v-if="hint" class="text-faint normal-case font-normal ms-0.5">({{ hint }})</span>
  </label>
</template>
