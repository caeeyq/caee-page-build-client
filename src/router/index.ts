import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: import('@/view/editor.vue'),
    },
  ],
})

export function setupRoute(app: App) {
  app.use(router)
}
