import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import ViteRequireContext from '@originjs/vite-plugin-require-context';
import svgr from '@honkhonk/vite-plugin-svgr';
const dotenv = require('dotenv');
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginHtmlEnv(),
    ViteRequireContext(),
    svgr({
      svgrOptions: {
        icon: true,
        dimensions: false,
        // etc...
      },
    }),
  ],
  define: {
    'process.env': dotenv.config().parsed,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
