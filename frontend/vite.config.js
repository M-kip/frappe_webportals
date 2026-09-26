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
			lucideIcons: true,
		}),
		vue(),
	],
	build: {
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
		include: [
			"engine.io-client",
			"highlight.js/lib/core",
		],
		exclude: [
			"frappe-ui",
		],
	},
});