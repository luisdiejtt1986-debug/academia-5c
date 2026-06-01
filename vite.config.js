import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // 👈 AGREGA ESTA LÍNEA
    port: 5173       // (opcional, si quieres forzar un puerto fijo)
  }
})

