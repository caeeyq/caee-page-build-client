import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export { default as CText } from './BusinessComps/CText/index.vue'
export { default as ShowCompsList } from './List/ShowCompsList/index.vue'

export function setupGlobalComponents(app: App) {
  app.use(ElementPlus)
}
