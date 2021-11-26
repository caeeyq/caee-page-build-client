<template>
  <div class="show-comps-list">
    <div
      v-for="(comp, index) in compList"
      :key="index"
      class="show-comps-list__item-wrapper"
      @click.capture.stop="addText(comp)"
    >
      <c-text v-bind="comp" />
    </div>
    <Uploader action="http://caee-cli.edityj.top/upload" @success="addImage" />
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Uploader } from '@/components'
import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { UploadResp } from '@/components/FormItem/Uploader/types'
import { ComponentData } from '@/store/editor/types'

defineProps<{
  compList: Partial<TextComponentProps>[]
}>()

const emits = defineEmits<{
  (e: 'addComp', item: ComponentData): void
}>()

const addImage = (respData: UploadResp) => {
  const resData: ComponentData = {
    id: uuidv4(),
    name: 'c-image',
    props: {
      src: respData.download_url,
      width: '100%'
    },
  }
  emits('addComp', resData)
}
const addText = (textComp: Partial<TextComponentProps>) => {
  const resData: ComponentData = {
    id: uuidv4(),
    name: 'c-text',
    props: textComp,
  }
  emits('addComp', resData)
}
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
