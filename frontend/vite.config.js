import vue from "@vitejs/plugin-vue";
import frappeui from "frappe-ui/vite";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
	},
	plugins: [
		frappeui({
			siteName: "flairdentalcare.localhost",
			siteList: ["flairdentalcare.localhost"],
			frontendRoute: "/app",
			frappeProxy: {
				port: 8000,
				source: "^/(app|desk|login|api|assets|files|pages)",
			},
		}),
		vue(),
	],
	css: {
		postcss: path.resolve(import.meta.dirname, "postcss.config.js"),
	},
	build: {
		outDir: path.resolve(import.meta.dirname, "../public/frontend"),
		emptyOutDir: true,
		target: "esnext",
		commonjsOptions: {
			include: [/node_modules/],
		},
		chunkSizeWarningLimit: 1500,
	},
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "src"),
		},
	},
	server: {
		port: 8080,
		strictPort: true,
		allowedHosts: true,
	},
	optimizeDeps: {
		include: ["frappe-ui > feather-icons", "engine.io-client", "interactjs", "highlight.js/lib/core"],
	},
});