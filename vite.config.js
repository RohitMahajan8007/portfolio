import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Make SCSS resolve ~ as src/ for SCSS @use statements
        loadPaths: [resolve(__dirname, 'src')],
      },
    },
  },
})
