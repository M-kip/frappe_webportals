/* Frappe UI base styles */
import './index.css'
import { createApp } from 'vue'
import { DataLoaderPlugin } from 'vue-router/experimental'
import { createPinia } from 'pinia'
import { PiniaColada, PiniaColadaQueryHooksPlugin  } from '@pinia/colada'
import { PiniaColadaAutoRefetch } from '@pinia/colada-plugin-auto-refetch'
import { PiniaColadaRetry } from '@pinia/colada-plugin-retry'
import { PiniaColadaDelay } from '@pinia/colada-plugin-delay'
import { PiniaColadaCachePersister } from '@pinia/colada-plugin-cache-persister'
import router from './router.ts'
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin, FrappeUI, toast } from 'frappe-ui'

let app = createApp(App)
const pinia = createPinia()

setConfig('resourceFetcher', frappeRequest)
app.use(DataLoaderPlugin, { router }) 
app.use(router)
app.use(FrappeUI)
app.use(resourcesPlugin)

app.use(pinia)
app.use(PiniaColada, {
  // Optionally provide global options here for queries
  queryOptions: {
    gcTime: 300_000, // 5 minutes, the default
  },
  plugins: [
    PiniaColadaQueryHooksPlugin({
        onError(_error, entry) {
            if (entry.meta?.errorMessage) {
                toast.error(entry.meta.errorMessage as string)
            }
      },
    }),
    PiniaColadaAutoRefetch({
      // global default (can be overridden per-query)
      autoRefetch: true,
    }),
    PiniaColadaRetry({
      // global defaults
      retry: 3,
      // delay can be a number or a function
      // delay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
    }),
    PiniaColadaDelay({
      delay: false, // global default (can be overridden per-query)
    }),
    PiniaColadaCachePersister({
      // optional
      key: 'flair-dental-cache',
      debounce: 1000,
      // storage: localStorage,
      // filter: { key: ['todos'] },
      // stringify: JSON.stringify,
      // parse: JSON.parse,
    }),
  ],
})
app.component('Button', Button)
app.mount('#app')
