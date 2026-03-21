import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/docs/faturas': {
        target: 'https://8aiu9icxgorbs3k4.public.blob.vercel-storage.com',
        changeOrigin: true,
      },
    },
  },
})
