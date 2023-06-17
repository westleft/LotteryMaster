import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  css: {
    // css 前處理器
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "./src/styles/main.scss";',
      },
    },
  },
})
