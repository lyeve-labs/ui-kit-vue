import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// The library build: one ES module with Vue left to the consumer. Declarations
// come from vue-tsc, and the stylesheet is the kit's own, copied after.
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
    },
    sourcemap: false,
    minify: false,
  },
});
