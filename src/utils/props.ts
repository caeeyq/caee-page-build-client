import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { mapValues } from 'lodash-es'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformObjToProps(obj: TextComponentProps) {
  return mapValues(obj, (value: any) => {
    return {
      type: value.constructor,
      default: value,
    }
  })
}
