import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { mapValues } from 'lodash-es'

export function transformObjToProps(obj: TextComponentProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return mapValues(obj, (value: any) => {
    return {
      type: value.constructor,
      default: value,
    }
  })
}