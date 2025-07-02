// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ Correct : c’est bien pour un frontend servi par le backend
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ OK
    emptyOutDir: true // (facultatif) pour nettoyer le dossier dist avant chaque build
  },
});
