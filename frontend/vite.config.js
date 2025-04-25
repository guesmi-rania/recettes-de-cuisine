import { defineConfig } from 'vite';

export default defineConfig({
  // Configuration de base ici
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist', // Dossier de sortie
    sourcemap: true, // Générez un sourcemap pour le débogage
  }
});
