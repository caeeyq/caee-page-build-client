/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

type EnvironmentType = 'dev' | 'test' | 'prod'
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_ENV: EnvironmentType
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
