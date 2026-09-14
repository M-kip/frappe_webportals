import vue from "@vitejs/plugin-vue";
import frappeui from "frappe-ui/vite";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
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
    strictPort: true, // 👈 Ensure it enforces port 8080
		allowedHosts: true,
		proxy: {
			"^/(?!(?:frontend|app|desk|login|api|assets|files|private|pages|src|node_modules)(?:[/?#]|$)|@|__)(?![^?]*\\.)[^/?#].*":
				{
					target: `http://127.0.0.1:${process.env.FRAPPE_WEB_SERVER_PORT || 8000}`,
					router: (req) =>
						`http://${req.headers.host.split(":")[0]}:${process.env.FRAPPE_WEB_SERVER_PORT || 8000}`,
				},
		},
	},
	optimizeDeps: {
		include: ["frappe-ui > feather-icons", "engine.io-client", "interactjs", "highlight.js/lib/core"],
	},
});