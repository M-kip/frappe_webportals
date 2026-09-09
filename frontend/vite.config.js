import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { getProxyOptions } from 'frappe-ui/src/utils/vite-dev-server.js'

// Resolve paths safely using import.meta.url directly
const currentDir = path.dirname(fileURLToPath(import.meta.url))

// Load site config dynamically
const configPath = path.resolve(currentDir, '../../../sites/common_site_config.json')
const commonSiteConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
const webserver_port = commonSiteConfig.webserver_port || 8000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: getProxyOptions({ port: webserver_port }),
  },
  resolve: {
    alias: {
      '@': path.resolve(currentDir, 'src'),
    },
  },
  build: {
    // Using currentDir ensures the output path stays predictable
    outDir: path.resolve(currentDir, '../public/frontend'),
    emptyOutDir: true,
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['frappe-ui > feather-icons', 'showdown', 'engine.io-client'],
  },
})
