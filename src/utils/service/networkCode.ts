/**
 * 处理网络错误相关问题
 *
 * @author 俞杰
 * @email 158392613@qq.com
 */

import { ElMessage } from 'element-plus'
import { AxiosError } from 'axios'
import { ApiResponse } from './request'

export enum NetworkCode {
  EXTRA_SUCCESS = 200,
  /**
   * 请求成功
   */
  SUCCESS = 20000,
  /**
   * 令牌错误或已过期
   */
  TOKEN_INVALID = 10008,
}

export const networkCodeMap: { [value in NetworkCode]: string } = {
  200: '请求成功',
  20000: '请求成功',
  10008: '登录过期,请重新登陆！',
}

type HandleRespErrorFun = (
  respData: ApiResponse
) => Promise<string> | ApiResponse<null>

/**
 * 处理有正确返回的情况下的错误
 * 一般为入参错误或者接口内部逻辑错误
 *
 * @param respData
 * @returns
 */
export const handleRespError: HandleRespErrorFun = (respData: ApiResponse) => {
  // const { code, msg } = respData as ApiResponse
  // if (code === NetworkCode.SUCCESS || code === NetworkCode.EXTRA_SUCCESS) {
  return respData
  // }
  // // token 过期
  // if (code === NetworkCode.TOKEN_INVALID) {
  //   const tokenInvalidMsg = networkCodeMap[NetworkCode.TOKEN_INVALID]
  //   ElMessage.error(tokenInvalidMsg)
  //   return Promise.reject(tokenInvalidMsg)
  // }
  // ElMessage.error(msg || '网络错误')
  // return Promise.reject(msg)
}

/**
 * 处理在没有正确返回的情况下的网络错误
 *
 * @param err AxiosError
 */
export const handleCommonNetworkError = (err: AxiosError) => {
  if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
    ElMessage.error('请求超时, 请检查网络连接！')
  } else if (err.message === 'Network Error') {
    ElMessage.error('服务器错误或网络错误, 请联系网络管理员或后端开发人员！')
  } else if (err.response?.status === 503) {
    ElMessage.error('服务器错误, 请联系后端开发人员！')
  } else {
    ElMessage.error(err.message)
  }
}
