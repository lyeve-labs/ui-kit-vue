<script setup lang="ts">
/**
 * The chevron the kit draws from its icon library, inlined so the package
 * has no runtime dependency. The markup equals what that library renders for
 * the same size, class and attributes.
 */
withDefaults(defineProps<{ size?: number }>(), { size: 24 });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide-icon lucide lucide-chevron-down"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
</template>
