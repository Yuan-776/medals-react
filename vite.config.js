import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/medals-react/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://medals-api-6.azurewebsites.net',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
