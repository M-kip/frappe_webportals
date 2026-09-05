# Flair Smile Dental Care Portal

A modern clinic website portal for **Flair Smile Dental Care**, built on the [Frappe Framework](https://github.com/frappe/frappe). It provides patients with information about the clinic, its services, doctors, and a way to book appointments — all integrated with **Frappe Healthcare** for practitioner management.

---

## Project Overview

### Frontend
- **Vue 3** + **Vite** SPA served as a standalone frontend
- **TailwindCSS** for styling
- **Frappe UI** for UI components (Button, Card, Feather Icons, Toast, etc.)
- Dynamic content pulled from **Frappe Healthcare** (Healthcare Practitioners)

### Key Pages & Features
| Page / Section | Description |
|---|---|
| **Hero** | Full-bleed hero with clinic name, tagline, and CTA buttons |
| **Trust Stats Bar** | Key metrics (years, patients, rating, emergency support) |
| **Services** | Grid of 6 dental services with icons and descriptions |
| **Why Choose Us** | 6 feature cards highlighting clinic strengths |
| **Our Dentists** | Dynamic list of active practitioners from Frappe Healthcare |
| **Testimonials** | 3 patient reviews with star ratings |
| **Contact** | Address, phone numbers, email, working hours, and Google Maps embed |
| **Footer** | Brand info, services, contact, and quick links |
| **Floating WhatsApp** | Fixed WhatsApp button with pre-filled booking message |

---

## Installation

### 1. Install the Frappe App

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app https://github.com/your-org/frappe_webportals --branch develop
bench install-app frappe_webportals
bench --site your-site.com install-app frappe_webportals
```

> **Note:** In development, add `"ignore_csrf": 1` to your `site_config.json` to avoid CSRF token errors with the Vite dev server.

### 2. Set up the Frontend

```bash
cd frappe_webportals/frontend
yarn install
yarn dev
```

The Vite dev server starts on **port 8080** by default. Open `http://your-site.test:8080` in your browser. The app is served at the `/frontend` base path.

### 3. Build for Production

```bash
cd frappe_webportals/frontend
yarn build
```

The build command automatically:
- Compiles the Vue SPA with Vite
- Outputs to `frontend/dist` with assets path `/assets/frappe_webportals/frontend/`
- Copies the HTML entry point to `frappe_webportals/www/frontend.html`

---

## Frontend Commands

| Command | Description |
|---|---|
| `yarn dev` | Start Vite dev server on port 8080 |
| `yarn build` | Build for production (includes copy-html-entry) |
| `yarn preview` | Preview production build locally |
| `yarn copy-html-entry` | Manually copy HTML entry to Frappe www folder |

---

## Contact Information

```
Flair Smile Dental Care
Laxmi Plaza, 5th Floor, Office No. 1
Biashara Street, Nairobi CBD
Kenya

Phone:  0746 721 164 / 0711 842 836
Email:  flairsmiledentalcare@gmail.com
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Frappe Framework, Frappe Healthcare |
| Frontend | Vue 3, Vite, TailwindCSS, Frappe UI |
| Icons | Feather Icons |
| Typography | Inter via Google Fonts CDN |
| Styling | Tailwind CSS utility classes |

---

## Resources

- [Frappe Framework](https://frappeframework.com/docs)
- [Frappe Healthcare](https://github.com/frappe/healthcare)
- [Frappe UI](https://github.com/frappe/frappe-ui)
- [Vue 3](https://vuejs.org/guide/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/)

---

## Contributing

This project uses **pre-commit** for linting and formatting. Please install and enable it before contributing:

```bash
cd apps/frappe_webportals
pre-commit install
```

Tools configured: `ruff`, `eslint`, `prettier`, `pyupgrade`.

---

## License

MIT
