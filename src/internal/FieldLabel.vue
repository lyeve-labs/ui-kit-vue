<script setup lang="ts">
/**
 * A field's label with its required marker. The marker is hidden from
 * assistive technology, because the control states the requirement itself.
 * With `for` it is a label, and without it a span.
 */
import { computed } from 'vue';
import { FIELD_LABEL } from './field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    text: string;
    required?: boolean;
    for?: string;
    id?: string;
    /** Kept for assistive technology and not drawn. */
    hidden?: boolean;
    /** Replaces the field label class, for a choice label. */
    labelClass?: string;
  }>(),
  { labelClass: FIELD_LABEL },
);

const cls = computed(() => (props.hidden ? `${props.labelClass} sr-only` : props.labelClass));
</script>

<template>
  <label v-if="props.for !== undefined" :id="id" :for="props.for" :class="cls"
    >{{ text }}<span v-if="required" class="ms-0.5 text-danger" aria-hidden="true">*</span></label
  >
  <span v-else :id="id" :class="cls"
    >{{ text }}<span v-if="required" class="ms-0.5 text-danger" aria-hidden="true">*</span></span
  >
</template>
