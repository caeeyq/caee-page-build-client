/* eslint-disable @typescript-eslint/no-explicit-any */
export type KeyO<T extends string> = {
  [key in T]: any
}
