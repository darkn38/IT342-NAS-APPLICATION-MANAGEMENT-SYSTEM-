import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',         // Ensure this matches vercel.json
  },
  base: '/',                // Ensures proper routing for React Router
})
