import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'url';

// Set the base public path for the build.
// This tells Vite to prefix all asset paths (like /assets/...) 
// with the repository name, making them relative to the root 
// of the GitHub Pages site.
const REPO_NAME = 'scouts_program_planning_app'; 

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Scouts Program Planning App',
        short_name: 'ScoutsPlanner',
        description: 'An application for planning scout programs.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: `/${REPO_NAME}/`,
  // base: './',
  build: {
    outDir: 'dist',
  },
});