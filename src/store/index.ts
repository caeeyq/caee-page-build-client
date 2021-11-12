import { createPinia } from 'pinia'
import { App } from 'vue'

export { useLoadingStore } from './loading'
export { useEditorStore } from './editor'

export function setupStore(app: App) {
  app.use(createPinia())
}
