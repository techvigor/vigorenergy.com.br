import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Injeta src/lib/lp-economize/h1-map.json (fonte única) no script inline do index.html
// que faz a troca de H1 por utm_content antes da hidratação do React. Evita duplicar a
// lista de mensagens por anúncio em dois lugares (config do app + HTML estático).
function injectLpH1Map(): Plugin {
  const h1MapPath = path.resolve(dirname, 'src/lib/lp-economize/h1-map.json')
  return {
    name: 'inject-lp-h1-map',
    transformIndexHtml(html) {
      const h1Map = fs.readFileSync(h1MapPath, 'utf-8')
      return html.replace('"__LP_H1_MAP__"', h1Map)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), injectLpH1Map()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/docs': {
        target: 'https://8aiu9icxgorbs3k4.public.blob.vercel-storage.com',
        changeOrigin: true,
      },
    },
  },
})
