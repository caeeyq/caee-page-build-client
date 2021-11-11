import { createApp } from 'vue'
import '@/style/index.scss'

import setupDriective from '@/directive'
import { setupStore } from '@/store'
import { setupRoute } from '@/router'

import App from './App.vue'

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
