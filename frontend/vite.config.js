import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import frappeui from "frappe-ui/vite"

const currentDir = path.dirname(fileURLToPath(import.meta.url))

const configPath = path.resolve(currentDir, '../../../sites/common_site_config.json')
let webserver_port = 8000

if (fs.existsSync(configPath)) {
  try {
    const commonSiteConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    webserver_port = commonSiteConfig.webserver_port || 8000
  } catch (e) {
    console.warn('Could not load common_site_config.json, defaulting to port 8000.')
  }
}

export default defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  plugins: [
    vue(),
    frappeui({
          siteName: 'flairdentalcare.localhost',
          frontendRoute: '/frontend',
          frappeProxy: {
            port: webserver_port,
            source: '^/(app|desk|login|api|assets|files|pages)',
          },
        }),
  ],
  css: {
    postcss: path.resolve(currentDir, 'postcss.config.cjs'),
  },
  server: {
    allowedHosts: true,
    proxy: {
      "^/(?!(?:app|desk|login|api|assets|files|private|pages|src|node_modules)(?:[/?#]|$)|@|__)(?![^?]*\\.)[^/?#].*":
        {
          target: `http://127.0.0.1:${process.env.FRAPPE_WEB_SERVER_PORT || webserver_port}`,
          router: (req) =>
            `http://${req.headers.host.split(":")[0]}:${process.env.FRAPPE_WEB_SERVER_PORT || webserver_port}`,
        },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(currentDir, 'src'),
    },
  },
  build: {
    outDir: path.resolve(currentDir, '../public/frontend'),
    emptyOutDir: true,
    target: 'esnext',
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: ['frappe-ui > feather-icons', "engine.io-client", "interactjs", "highlight.js/lib/core"],
  },
})