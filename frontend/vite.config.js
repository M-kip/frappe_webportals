import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { getProxyOptions } from 'frappe-ui/src/utils/vite-dev-server'

// Resolve path to common_site_config.json
const configPath = path.resolve(__dirname, '../../../sites/common_site_config.json')

// Read webserver_port or fallback to default Frappe port 8000
let webserverPort = 8000
if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  webserverPort = config.webserver_port || 8000
}

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: getProxyOptions({ port: webserverPort }),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: `../${path.basename(path.resolve('..'))}/public/frontend`,
    emptyOutDir: true,
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['frappe-ui > feather-icons', 'showdown', 'engine.io-client'],
  },
})