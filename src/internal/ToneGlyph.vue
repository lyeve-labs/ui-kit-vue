<script setup lang="ts">
/** The glyph that says a message's tone in a shape as well as a color, drawn bare. */
import { TONE_GLYPH, type StatusTone } from './tone';

defineProps<{ tone: StatusTone }>();
</script>

<template>
  <svg
    class="mt-0.5 shrink-0"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="TONE_GLYPH[tone]" />
  </svg>
</template>
