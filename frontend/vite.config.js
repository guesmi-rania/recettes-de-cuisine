// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './', // ✅ Garder './' si ton frontend est servi par le backend
  plugins: [react()],
  build: {
    outDir: 'dist', // 📁 Cela va générer le dossier dist dans le frontend
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      // ✅ Résout les erreurs d'import (souvent utile si React Router ne fonctionne pas)
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom')
    }
  }
});
