<template>
  <component :is="tag" @click="compClick" class="c-text" :style="styleProps">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'
import { textDefaultProps, textStyleProps } from './types'

export default defineComponent({
  name: 'c-text',
  props: {
    ...textDefaultProps,
  },
  setup(props) {
    const { styleProps, compClick } = useComponentCommon(props, textStyleProps)

    return { styleProps, compClick }
  },
})
</script>

<style scoped lang="scss">
.c-text {
  position: relative !important;
}
</style>
