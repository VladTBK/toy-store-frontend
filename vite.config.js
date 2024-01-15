import { defineConfig } from 'vite';
export default defineConfig({
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		port: 8000,
	},
});
