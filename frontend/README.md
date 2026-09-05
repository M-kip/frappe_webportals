# Flair Smile Dental Care — Frontend

The Vue 3 frontend for **Flair Smile Dental Care**, a modern dental clinic portal built on [Frappe](https://github.com/frappe/frappe).

This SPA is part of the `frappe_webportals` Frappe app and is served as a standalone Vue 3 application with its own build pipeline.

---

## Stack

- **Vue 3** with `<script setup>` Composition API
- **Vite** — fast dev server and production builds
- **TailwindCSS** — utility-first styling
- **Frappe UI** — Button, Card, FeatherIcon, Avatar, Toast, LoadingIndicator, createResource
- **Vue Router** — client-side routing (single route: `/`)
- **Frappe Healthcare** — fetches active practitioners via `createResource`

---

## Project Structure

```
frontend/
├── public/
│   ├── favicon.jpg          # App logo
│   ├── chair1.jpeg          # Hero background image
│   └── *.png               # Additional static assets
├── src/
│   ├── App.vue             # Root component
│   ├── main.ts             # App entry point
│   ├── router.js           # Vue Router config (base: /frontend)
│   ├── pages/
│   │   └── Home.vue        # Full homepage
│   ├── components/
│   │   ├── ServiceCard.vue     # Service feature card
│   │   ├── FeatureCard.vue     # Why Choose Us card
│   │   ├── DoctorCard.vue      # Dentist profile card
│   │   ├── TestimonialCard.vue # Patient testimonial card
│   │   ├── StatsBar.vue        # Trust metrics bar
│   │   └── WhatsAppButton.vue  # Floating WhatsApp CTA
│   ├── assets/
│   └── style.css           # Global styles + Tailwind directives
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Pages & Components

| Component | Purpose |
|---|---|
| `Home.vue` | Full clinic homepage |
| `StatsBar.vue` | Dark trust metrics bar (years, patients, rating, emergency) |
| `ServiceCard.vue` | Service card with icon, title, description |
| `FeatureCard.vue` | Feature highlight card with icon |
| `DoctorCard.vue` | Doctor profile with avatar, specialty, bio, and booking CTA |
| `TestimonialCard.vue` | Patient review card with star rating |
| `WhatsAppButton.vue` | Fixed floating button with pre-filled WhatsApp message |

---

## Development

```bash
# Install dependencies
yarn install

# Start dev server (http://localhost:8080/frontend)
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

> **CSRF note:** In development, add `"ignore_csrf": 1` to your Frappe site's `site_config.json` to prevent CSRF errors when the Vite dev server proxies requests to Frappe.

---

## Deployment

The built output (`dist/`) is served by Frappe as static files at the `/frontend` route. Run `yarn build` and ensure your Frappe app's `public/files/` (or equivalent static path) serves the output.

---

## Resources

- [Frappe UI Docs](https://frappeui.com/)
- [Vue 3 Docs](https://vuejs.org/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [Frappe Healthcare](https://github.com/frappe/healthcare)
