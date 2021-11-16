import { App } from 'vue'
import ElementPlus from 'element-plus'
import '@/style/tools/element/index.scss'

export { default as CText } from './BusinessComps/CText/index.vue'
export { default as RenderJsx } from './BusinessComps/RenderJsx'

export { default as ShowCompsList } from './List/ShowCompsList/index.vue'
export { default as PropFormList } from './List/PropFormList/index.vue'

export { default as RoundCheckBox } from './FormItem/RoundCheckBox/index.vue'

export function setupGlobalComponents(app: App) {
  app.use(ElementPlus, { size: 'small' })
}
