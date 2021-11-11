import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: import('@/view/home.vue'),
    },
    {
      path: '/demo',
      component: import('@/view/demo.vue'),
    },
  ],
})

export function setupRoute(app: App) {
  app.use(router)
}
