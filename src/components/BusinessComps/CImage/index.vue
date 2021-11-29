<template>
  <img class="c-image" :src="src" @click="compClick" :style="styleProps" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'
import { imageDefaultProps, imageStyleProps } from './types'

export default defineComponent({
  name: 'c-image',
  props: {
    ...imageDefaultProps,
  },
  setup(props) {
    const { styleProps, compClick } = useComponentCommon(props, imageStyleProps)

    return { styleProps, compClick }
  },
})
</script>

<style scoped lang="scss">
.c-image {
  position: relative !important;
  vertical-align: middle;
}
</style>
