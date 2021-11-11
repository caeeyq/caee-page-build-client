import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus({ useSource: true })],
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
