import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'dist',
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
