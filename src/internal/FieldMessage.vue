<script setup lang="ts">
/**
 * The line under a field: the error when there is one, else the hint. The ids
 * are the ones `describedBy` points the control at.
 */
import { FIELD_ERROR, FIELD_HINT } from './field';

defineProps<{ base: string; error?: string; hint?: string }>();
</script>

<template>
  <p v-if="error" :id="`${base}-error`" :class="FIELD_ERROR">{{ error }}</p>
  <p v-else-if="hint" :id="`${base}-hint`" :class="FIELD_HINT">{{ hint }}</p>
</template>
