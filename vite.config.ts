import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@store': path.resolve(__dirname, './src/store/'),
    },
  },
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg" , "@ffmpeg/core"],
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "credentialless",
    }
  }
})
