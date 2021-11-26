import { App } from 'vue'
import ElementPlus from 'element-plus'
import '@/style/tools/element/index.scss'

import CText from './BusinessComps/CText/index.vue'
import CImage from './BusinessComps/CImage/index.vue'
import ImageProcess from './FormItem/Uploader/ImageProcess.vue'

export { default as RenderJsx } from './BusinessComps/RenderJsx'

export { default as ShowCompsList } from './List/ShowCompsList/index.vue'
export { default as PropFormList } from './List/PropFormList/index.vue'

export { default as RoundCheckBox } from './FormItem/RoundCheckBox/index.vue'
export { default as Uploader } from './FormItem/Uploader/index.vue'

export function setupGlobalComponents(app: App) {
  app.use(ElementPlus, { size: 'small' })

  app.component('c-text', CText)
  app.component('c-image', CImage)
  app.component('c-image-process', ImageProcess)
}
