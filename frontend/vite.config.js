import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Forward API calls to the Python backend during development.
      '/api': 'http://localhost:8000'
    }
  }
})
