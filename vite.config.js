import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getRouteMetadata } from './src/seo/siteMetadata.js'
import { renderSeoBlock } from './scripts/seoHtml.js'

function seoHtmlPlugin() {
  return {
    name: 'mile-high-mashup-seo-html',
    transformIndexHtml(html) {
      return html.replace(
        '<!-- SEO_TAGS -->',
        renderSeoBlock(getRouteMetadata('/'))
      )
    },
  }
}

export default defineConfig(({ mode }) => {
  // load your .env vars
  const env = loadEnv(mode, process.cwd())
  const API_KEY = env.VITE_API_SPORTS_KEY
  if (!API_KEY) {
    console.warn('[vite.config] Missing VITE_API_SPORTS_KEY')
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      seoHtmlPlugin(),
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
