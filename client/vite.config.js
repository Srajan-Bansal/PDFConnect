import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'build',
	},
	publicDir: 'public',
	server: {
		host: '0.0.0.0',
		port: 5173,
	},
});
