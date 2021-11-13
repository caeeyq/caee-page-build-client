import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/style/tools/element/index.scss" as *;
          @use "@/style/tools/_index.scss" as *;
        `,
      },
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
