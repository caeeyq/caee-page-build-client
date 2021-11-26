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
import { FileItem } from '@/components/FormItem/Uploader/types'
import { ComponentData } from '@/store/editor/types'
import { getImageDimensions } from '@/utils/file'

defineProps<{
  compList: Partial<TextComponentProps>[]
}>()

const emits = defineEmits<{
  (e: 'addComp', item: ComponentData): void
}>()

const addImage = async (fileItem: FileItem) => {
  const { width } = await getImageDimensions(fileItem.row)
  const resData: ComponentData = {
    id: uuidv4(),
    name: 'c-image',
    props: {
      src: fileItem.resp?.download_url,
      width: `${width > 350 ? 350 : width}px`,
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
