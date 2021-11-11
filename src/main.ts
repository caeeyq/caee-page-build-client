import { createApp } from 'vue'
import App from './App.vue'
import setupDriective from '@/directive'
import { setupStore } from '@/store'
import '@/style/index.scss'
import { setupRoute } from '@/router'

async function bootstrap() {
  const app = createApp(App)

  // 配置store
  setupStore(app)

  setupRoute(app)

  // 配置全局指令
  setupDriective(app)

  app.mount('#app')
}

bootstrap()
