// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'       // ← make sure you have this
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // load your .env vars
  const env = loadEnv(mode, process.cwd())
  const API_KEY = env.VITE_API_SPORTS_KEY
  if (!API_KEY) {
    console.warn('[vite.config] Missing VITE_API_SPORTS_KEY')
  }

  return {
    plugins: [
      react(),        // ← add React plugin if you haven’t already
      tailwindcss(),
    ],
    server: {
      port: 5173,
      proxy: {
        // 1) ESPN proxy (yours already)
        '/api/espn': {
          target: 'https://site.api.espn.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/espn/, '/apis/site/v2/sports'),
        },
        // 2) Payload CMS proxy
        //    your React code can now fetch('/cms-api/pages') → http://localhost:3000/api/pages
        '/cms-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/cms-api/, '/api'),
        },
        // 3) your existing backend
        '/api': {
          target: 'http://localhost:5002',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
