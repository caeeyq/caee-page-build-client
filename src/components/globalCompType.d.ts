declare module 'vue' {
  export interface GlobalComponents {
    'c-image-process': typeof import('./FormItem/Uploader/ImageProcess.vue')['default']
  }
}

export {}
