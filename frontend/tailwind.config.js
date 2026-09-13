// config.js
import preset, { content as frappeUIContent } from 'frappe-ui/tailwind'

export default {
  presets: [
    preset
  ],
  content: [
    ...Array.isArray(frappeUIContent) ? frappeUIContent : [], // Automatically include all necessary frappe-ui components path
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
