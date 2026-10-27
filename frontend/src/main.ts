/* Frappe UI base styles */
import './index.css'
import { createApp } from 'vue'
import { DataLoaderPlugin } from 'vue-router/experimental'
import { createPinia } from 'pinia'
import { PiniaColada, PiniaColadaQueryHooksPlugin  } from '@pinia/colada'
import router from './router.ts'
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin, FrappeUI, toast } from 'frappe-ui'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)
app.use(DataLoaderPlugin, { router }) 
app.use(router)
app.use(FrappeUI)
app.use(resourcesPlugin)
const pinia = createPinia()
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
  ],
})
app.component('Button', Button)
app.mount('#app')
