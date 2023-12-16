// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  base: '/targetx-website/',
  build: {
    assetsInlineLimit: 0, // Disable inlining assets
  },
  plugins: [react(), svgr()],
  // Copy the images from 'src' to 'dist' during the build process
  copy: {
    patterns: [
      { from: 'src/assets', to: 'assets' }, // Update the folder paths accordingly
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Add an alias for easier import paths
    },
  },
});
