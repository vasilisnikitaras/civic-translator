import { defineConfig } from 'vite';

export default defineConfig({
  root: 'CivicTranslator',
  publicDir: 'CivicTranslator/assets',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});
