import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      // "5173/api" becomes "3000/api"
      '/api': 'http://localhost:3000',
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
