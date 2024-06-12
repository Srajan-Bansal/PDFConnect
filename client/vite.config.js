import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Manually load environment variables from config.env
dotenv.config({ path: resolve(__dirname, './config.env') });

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		chunkSizeWarningLimit: 2000,
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendors': ['react', 'react-dom'],
					'pdfmake-vendors': [
						'pdfmake/build/pdfmake',
						'pdfmake/build/vfs_fonts',
					],
				},
			},
		},
	},
	publicDir: 'public',
	server: {
		host: '0.0.0.0',
		port: 5173,
	},
});
