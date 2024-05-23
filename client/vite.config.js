import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// Specify the public directory as the root
		base: './public',
		host: '0.0.0.0',
		port: 5173,
	},
});
