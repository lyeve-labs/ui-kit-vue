<script setup lang="ts">
/**
 * The painted box of a checkbox. Both marks are stroked paths on one 10 by 8
 * grid, so they swap without the box shifting.
 */
import { computed } from 'vue';
import { CHOICE_MARK, checkboxBox, type ChoiceSize } from './choice';

const props = defineProps<{ size: ChoiceSize; checked: boolean; indeterminate: boolean }>();

const on = computed(() => props.checked || props.indeterminate);
</script>

<template>
  <span :class="[checkboxBox(size, checked, indeterminate), 'mt-0.5']">
    <svg v-if="on" width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path
        :d="indeterminate ? CHOICE_MARK.mixed : CHOICE_MARK.check"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>
