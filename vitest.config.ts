import { svelte } from '@sveltejs/vite-plugin-svelte';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

// The Svelte plugin is here only so the parity test can render the kit's
// originals beside the ports. Nothing under src imports Svelte.
export default defineConfig({
  plugins: [vue(), svelte()],
  test: {
    include: ['test/**/*.test.ts'],
  },
});
