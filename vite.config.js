import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Apuntamos al archivo barril que acabas de crear
      entry: resolve(__dirname, 'src/index.js'),
      name: 'LibreriaComponentes',
      // El nombre de los archivos compilados que irán a la carpeta dist/
      fileName: (format) => `libreria-componentes.${format}.js`
    },
    rollupOptions: {
      // Aseguramos que dependencias externas no se empaqueten en tu librería
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});