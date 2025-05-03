import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ No need for vercel.json if this is set correctly
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    historyApiFallback: true  // <-- this is what Vercel needs
  }
})
