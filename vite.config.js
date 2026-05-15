import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'LibreriaComponentes',
      formats: ['es', 'umd'],
      fileName: (format) => `libreria-componentes.${format}.js`,
    },
    outDir: 'dist',
    sourcemap: true,
  },
});
