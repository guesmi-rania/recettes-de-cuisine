import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Si tu déploies avec le backend
  },
  server: {
    port: 3000,
  },
  // 👉 Solution : Ajoute ça
  resolve: {
    alias: {
      'react-router-dom': require.resolve('react-router-dom'),
    }
  }
});
