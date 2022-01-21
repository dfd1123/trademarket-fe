import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const dotenv = require('dotenv');
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': dotenv.config().parsed
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
