import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Source files are in the src directory
  build: {
    outDir: '../public', // Build output goes to the public directory
    emptyOutDir: true,
  },
});
