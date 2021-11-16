import { defineComponent, PropType, VNode } from 'vue'
export default defineComponent({
  props: {
    content: {
      type: Object as PropType<VNode | string | boolean | number>,
      required: true,
    },
  },
  setup(props) {
    return () => props.content
  },
})
