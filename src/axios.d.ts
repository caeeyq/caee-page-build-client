/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 修改axios实例的部分类型
 * 主要因为在拦截器中我过滤了 axios 的原本的一些 response 信息，直接返回了 data 信息
 * 这些类型是要为了适配我在拦截器中的修改
 *
 * ***注：此类型的生效需要在 tsconfig 中配置 compilerOptions.typeRoots=["./src/types/"]***
 *
 * @author 俞杰
 * @email 158392613@qq.com
 */
import { ApiResponse } from './utils/service/request'

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>
  }

  export interface AxiosInterceptorManager<V> {
    use(
      onFulfilled?: (value: V) => ApiResponse<null> | Promise<string>,
      onRejected?: (error: any) => any
    ): number
    eject(id: number): void
  }

  export interface AxiosRequestConfig<D = any> {
    url?: string
    method?: Method
    baseURL?: string
    transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[]
    transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[]
    headers?: AxiosRequestHeaders
    params?: any
    paramsSerializer?: (params: any) => string
    data?: D
    timeout?: number
    timeoutErrorMessage?: string
    withCredentials?: boolean
    adapter?: AxiosAdapter
    auth?: AxiosBasicCredentials
    responseType?: ResponseType
    xsrfCookieName?: string
    xsrfHeaderName?: string
    onUploadProgress?: (progressEvent: any) => void
    onDownloadProgress?: (progressEvent: any) => void
    maxContentLength?: number
    validateStatus?: ((status: number) => boolean) | null
    maxBodyLength?: number
    maxRedirects?: number
    socketPath?: string | null
    httpAgent?: any
    httpsAgent?: any
    proxy?: AxiosProxyConfig | false
    cancelToken?: CancelToken
    decompress?: boolean

    /** 是否启用mock */
    isMock?: boolean
    /** 是否需要验证头 */
    isAuth?: boolean
  }
}
