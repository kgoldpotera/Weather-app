import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      // Aliases for cleaner imports
      $lib: path.resolve('./src/lib'),
      $routes: path.resolve('./src/routes'),
      $components: path.resolve('./src/components')
    }
  },
  server: {
    port: 5173, // Default port for the development server
    strictPort: false // If true, Vite will fail if the port is not available
  }
};

export default config;
