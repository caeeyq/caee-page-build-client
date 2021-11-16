import {
  CommonComponentProps,
  commonDefaultProps,
} from '@/components/BusinessComps/types'
import { without } from 'lodash-es'
import { transformObjToProps } from '@/utils/props'

export interface TextComponentProps extends CommonComponentProps {
  /** 文字 */
  text: string
  tag: string
  /** 以下为样式属性 */
  fontSize: string
  fontFamily: string
  fontWeight: string
  fontStyle: string
  textDecoration: string
  lineHeight: string
  textAlign: string
  color: string
  backgroundColor: string
}

export const textDefaultObj: TextComponentProps = {
  text: '正文内容',
  tag: 'div',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps,
}

export const textDefaultProps = transformObjToProps(textDefaultObj)

export const textStyleProps = without(
  Object.keys(textDefaultObj),
  'tag',
  'text',
  'actionType',
  'url'
)
