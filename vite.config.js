import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

// Set the base public path for the build.
// This tells Vite to prefix all asset paths (like /assets/...) 
// with the repository name, making them relative to the root 
// of the GitHub Pages site.
const REPO_NAME = 'scouts_program_planning_app'; 

export default defineConfig({
  plugins: [vue()],
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