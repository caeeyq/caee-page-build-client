import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { pick } from 'lodash-es'
import { computed } from 'vue'

export default function useComponentCommon(
  props: Readonly<Partial<TextComponentProps>>,
  picks: string[]
) {
  const styleProps = computed(() => pick(props, picks))

  const compClick = () => {
    if (props.actionType === 'url' && props.url) {
      window.location.href = props.url
    }
  }

  return { styleProps, compClick }
}
