<template>
  <div class="show-comps-list">
    <div
      v-for="(comp, index) in compList"
      :key="index"
      class="show-comps-list__item-wrapper"
      @click.capture.stop="$emit('addComp', comp)"
    >
      <CText v-bind="comp" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CText } from '@/components'
import { TextComponentProps } from '@/components/BusinessComps/CText/types'
export default defineComponent({
  name: 'show-comps-list',
  components: { CText },
  props: {
    compList: {
      type: Array as PropType<Partial<TextComponentProps>[]>,
      default: () => [],
    },
  },
  emits: {
    addComp: (item: Partial<TextComponentProps>) => item,
  },
})
</script>

<style lang="scss" scoped>
.show-comps-list {
  width: 100%;
  @include flex-center(column);
  row-gap: 12px;
  .show-comps-list__item-wrapper {
    cursor: pointer !important;
  }
}
</style>
