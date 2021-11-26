declare module 'vue' {
  export interface GlobalComponents {
    'c-text': typeof import('./BusinessComps/CText/index.vue')['default']
    'c-image': typeof import('./BusinessComps/CImage/index.vue')['default']
    'c-image-process': typeof import('./FormItem/Uploader/ImageProcess.vue')['default']
  }
}

export {}
