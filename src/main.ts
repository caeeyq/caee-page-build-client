import { createApp } from 'vue'
import App from './App.vue'
import setupDriective from './directive'
import { setupStore } from './store'

async function bootstrap() {
  const app = createApp(App)

  // 配置store
  setupStore(app)

  // 配置全局指令
  setupDriective(app)

  app.mount('#app')
}

bootstrap()
