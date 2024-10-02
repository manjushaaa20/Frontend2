import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Base URL for deployment
  base: '/grocery-management/', // Replace with your GitHub repository name if deploying on GitHub Pages
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for the build files
    sourcemap: true, // Generate source maps for easier debugging
  },
  server: {
    open: true, // Automatically open the app in the browser when running the dev server
  },
});
