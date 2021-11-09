import { createPinia } from 'pinia'
import { App } from 'vue'

export { useLoadingStore } from './loading'

export function setupStore(app: App) {
  app.use(createPinia())
}
