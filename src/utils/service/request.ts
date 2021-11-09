/**
 * 封装 axios
 *
 * @author 俞杰
 * @email 158392613@qq.com
 */

import axios, { AxiosError } from 'axios'
import config from '@/config'
import { useLoadingStore } from '@/store'
import StorageUtil from '../storage'
import {
  handleCommonNetworkError,
  handleRespError,
  NetworkCode,
} from './networkCode'

export interface ApiResponse<T = null> {
  code: NetworkCode
  data: T
  msg: string
}

const service = axios.create({
  baseURL: config.BASE_URL,
  isAuth: true,
  timeout: 5000,
})

service.interceptors.request.use((requestConfig) => {
  useLoadingStore().startLoading({ opName: requestConfig.url })

  // 请求是否使用 mock， 生产环境不能使用 mock
  if (requestConfig.isMock && config.env != 'prod') {
    requestConfig.baseURL = config.MOCK_BASE_URL
  }

  const userInfo = StorageUtil.getItem('currentUser')
  if (
    requestConfig.headers &&
    !requestConfig.headers?.Authorization &&
    userInfo &&
    requestConfig.isAuth
  ) {
    requestConfig.headers.Authorization = `Bearer ${userInfo.token}`
  }

  return requestConfig
})

service.interceptors.response.use(
  (resp) => {
    useLoadingStore().finishLoading({ opName: resp.config.url })

    return handleRespError(resp.data)
  },
  (err: AxiosError) => {
    useLoadingStore().finishLoading({ opName: err.config.url })

    handleCommonNetworkError(err)
    return Promise.reject(err)
  }
)

/**
 * 返回 axios 实例
 * 1. 判断是否是 mock 环境，如果是生产环境则绝对不会使用 mockApi
 * @param options Axios配置对象
 * @returns 请求结果
 */
function generateAxiosInstance() {
  const { env, BASE_URL, MOCK_BASE_URL, isMock } = config
  service.defaults.baseURL = isMock ? MOCK_BASE_URL : BASE_URL
  if (env === 'prod') {
    service.defaults.baseURL = BASE_URL
  }
  return service
}

export default generateAxiosInstance()
