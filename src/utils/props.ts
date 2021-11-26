import { CommonComponentProps } from '@/components/BusinessComps/types'
import { mapValues } from 'lodash-es'

export function transformObjToProps<T extends CommonComponentProps>(obj: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return mapValues(obj, (value: any) => {
    return {
      type: value.constructor,
      default: value,
    }
  })
}
