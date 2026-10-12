import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': process.cwd() + '/src',
    },
    tsconfigPaths: true,
  },
  envPrefix: 'VITE',
  server: {
    port: 5173,
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
})