/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * TS类型守卫工具函数封装//和一些通用变量
 *
 * @author 俞杰
 * @email 158392613@qq.com
 */

const toString = Object.prototype.toString

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T extends Function>(val: any): val is T =>
  typeof val === 'function'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'
export const isWindow = (val: any): val is Window =>
  typeof window !== 'undefined' && toString.call(val) === '[object Window]'
export const isRegExp = (val: any): val is RegExp => val instanceof RegExp

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}
export type Noop = () => void
export const noAlink = 'javascript:void(0)'
