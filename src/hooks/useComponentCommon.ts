import { CommonComponentProps } from '@/components/BusinessComps/types'
import { pick } from 'lodash-es'
import { computed, StyleValue } from 'vue'

export default function useComponentCommon(
  props: Readonly<Partial<CommonComponentProps>>,
  picks: string[]
) {
  const styleProps = computed<StyleValue>(
    () => pick(props, picks) as StyleValue
  )

  const compClick = () => {
    if (props.actionType === 'url' && props.url) {
      window.location.href = props.url
    }
  }

  return { styleProps, compClick }
}
