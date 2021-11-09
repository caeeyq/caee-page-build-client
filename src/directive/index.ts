import { App } from 'vue'
import { ElLoading } from 'element-plus'

export default function setupDriective(app: App) {
  app.use(ElLoading)
}
