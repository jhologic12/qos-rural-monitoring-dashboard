import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE')

  return {
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
      sourcemap: true,
    },
  }
})