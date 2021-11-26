declare module 'vue' {
  export interface GlobalComponents {
    'c-text': typeof import('./CText/index.vue')['default']
  }
}

export {}
