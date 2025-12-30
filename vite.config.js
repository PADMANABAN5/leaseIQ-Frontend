import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
    allowedHosts: [
      'leaseiq-frontend-ew2h.onrender.com',
      '.onrender.com',
      'localhost',
      '127.0.0.1',
    ],
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
    allowedHosts: [
      'leaseiq-frontend-ew2h.onrender.com',
      '.onrender.com',
      'localhost',
      '127.0.0.1',
    ],
  },
})
