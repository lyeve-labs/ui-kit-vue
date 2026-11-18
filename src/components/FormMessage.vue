<script setup lang="ts">
/**
 * The outcome of a submit, under the form. A failure takes role="alert" and
 * interrupts, and a confirmation waits for a pause. The glyph says the tone
 * in a shape as well as a color.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ToneGlyph from '../internal/ToneGlyph.vue';

/** The two outcomes a submit has. Anything else is a hint, not a result. */
type Tone = 'danger' | 'success';

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ tone?: Tone }>(), { tone: 'danger' });

const tones: Record<Tone, string> = {
  danger: 'text-danger',
  success: 'text-success',
};

// A live region that arrives with its text already inside is not a change, so
// nothing is read out. In the browser the text goes in two frames after the
// region, because Firefox builds its accessibility tree after the first
// frame's callbacks. The server renders it at once, so a page delivered
// without script still carries the outcome.
const filled = ref(typeof window === 'undefined');
let frame = 0;

onMounted(() => {
  frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => (filled.value = true));
  });
});

onBeforeUnmount(() => cancelAnimationFrame(frame));
</script>

<template>
  <div
    :class="['flex items-start gap-2 text-sm', tones[tone], $attrs.class]"
    :role="tone === 'danger' ? 'alert' : undefined"
    :aria-live="tone === 'danger' ? 'assertive' : 'polite'"
    :aria-atomic="tone === 'danger' ? undefined : 'true'"
  >
    <template v-if="filled">
      <ToneGlyph :tone="tone" />
      <p class="min-w-0 flex-1"><slot /></p>
    </template>
  </div>
</template>
