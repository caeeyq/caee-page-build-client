import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { EditorLayout } from '@/layout'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/editor',
      component: EditorLayout,
      children: [
        {
          path: '',
          component: import('@/view/editor.vue'),
        },
      ],
    },
  ],
})

export function setupRoute(app: App) {
  app.use(router)
}
