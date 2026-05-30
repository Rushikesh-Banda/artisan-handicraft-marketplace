import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:5002', // corrected backend port
        changeOrigin: true,
        // No rewrite needed; keep /api prefix
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
