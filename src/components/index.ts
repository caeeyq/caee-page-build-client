import { App } from 'vue'
import ElementPlus from 'element-plus'
import CaeeBuildComponents from '@caee/caee-page-build-components'
import '@/style/tools/element/index.scss'
import '@caee/caee-page-build-components/dist/style/caee.css'

import ImageProcess from './FormItem/Uploader/ImageProcess.vue'

export { default as ShowCompsList } from './List/ShowCompsList/index.vue'
export { default as PropFormList } from './List/PropFormList/index.vue'

export { default as RoundCheckBox } from './FormItem/RoundCheckBox/index.vue'
export { default as Uploader } from './FormItem/Uploader/index.vue'

export function setupGlobalComponents(app: App) {
  app.use(ElementPlus, { size: 'small' })
  app.use(CaeeBuildComponents)
  app.component('c-image-process', ImageProcess)
}
