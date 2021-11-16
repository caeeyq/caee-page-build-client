/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 定义属性到form表单的转换基本信息
 */
import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { VNode } from 'vue'

export interface PropForm {
  /** 表单名称 */
  label?: string
  /** 一级表单组件名称 */
  component: string
  /** 一级表单值的属性名称 */
  valuePropName?: string
  /** 表单值的值变化事件名 */
  emitName?: string
  /** 一级表单的其他属性 */
  extraProps?: Record<string, any>
  /** 初始化值转换函数 */
  initValue?: (v: any) => any
  /** 输出值转换函数 */
  outInitValue?: (v: any) => any
  /** 二级表单组件 */
  subComponent?: string
  /** 二级表单值的属性名称 */
  subValuePropName?: string
  /** 二级表单信息数组 */
  options?: {
    text: string | number | boolean | VNode
    value: string | number | boolean
    extraProps: Record<string, any>
  }[]
}

export interface RealPropForm extends PropForm {
  /** 一级表单值 */
  value: string
  valuePropName: string
  emitName: string
  subValuePropName: string
  emits: Record<string, (e: any) => void>
}

export type PropsForms = {
  [key in keyof TextComponentProps]?: PropForm
}

const fontList = [
  { text: '无', value: '' },
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' },
]
const fontFamilyOptions = fontList.map((item) => {
  return {
    value: item.value,
    text: (
      <span style={{ fontFamily: item.value }}>{item.text}</span>
    ) as VNode,
    extraProps: { value: item.value, label: item.text },
  }
})

export const propsFormMap: PropsForms = {
  text: {
    label: '内容',
    component: 'el-input',
    emitName: 'input',
    extraProps: {
      type: 'textarea',
      placeholder: 'Please input',
      rows: 2,
    },
  },
  fontSize: {
    label: '字体大小',
    component: 'el-input-number',
    initValue: (v: string) => parseInt(v),
    outInitValue: (v: number) => `${v}px`,
    extraProps: {
      min: 12,
      max: 42,
    },
  },
  lineHeight: {
    label: '行高',
    component: 'el-slider',
    emitName: 'input',
    initValue: (v: string) => parseFloat(v),
    outInitValue: (v: number) => `${v}`,
    extraProps: {
      min: 1,
      max: 3,
      step: 0.1,
    },
  },
  textAlign: {
    label: '对齐',
    component: 'el-radio-group',
    subComponent: 'el-radio-button',
    subValuePropName: 'label',
    options: [
      { value: 'left', text: '左', extraProps: { label: 'left' } },
      { value: 'center', text: '中', extraProps: { label: 'center' } },
      { value: 'right', text: '右', extraProps: { label: 'right' } },
    ],
  },
  fontFamily: {
    label: '字体',
    component: 'el-select',
    subComponent: 'el-option',
    options: fontFamilyOptions,
  },
  fontWeight: {
    label: '字重',
    component: 'el-slider',
    emitName: 'input',
    initValue: (v: string) => parseInt(v),
    outInitValue: (v: number) => `${v}`,
    extraProps: {
      min: 100,
      max: 900,
      step: 100,
      marks: {
        400: '正常',
        700: '加粗',
      },
    },
  },
}
