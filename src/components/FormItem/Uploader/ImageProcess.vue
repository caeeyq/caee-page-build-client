<template>
  <Uploader
    action="http://caee-cli.edityj.top/upload"
    class="image-process"
    @success="handleSuccessUp"
  >
    <template #default>
      <div class="image-process__content">
        <div class="image-process__image-wrapper">
          <img :src="value" />
        </div>
      </div>
    </template>
    <template #loading>
      <div class="image-process__content" v-loading="true">
        <div class="image-process__image-wrapper">
          <img :src="value" />
        </div>
      </div>
    </template>
    <template #uploaded>
      <div class="image-process__content">
        <div class="image-process__image-wrapper">
          <img :src="value" />
        </div>
      </div>
    </template>
  </Uploader>
</template>

<script setup lang="ts">
import { Uploader } from '@/components'
import { FileItem, UploadResp } from './types'

defineProps<{
  value: string
}>()

const emits = defineEmits<{
  (e: 'change', value: string): void
}>()

const handleSuccessUp = (fileItem: FileItem<UploadResp>) => {
  if (fileItem.resp) {
    emits('change', fileItem.resp.download_url)
  }
}
</script>

<style scoped lang="scss">
.image-process {
  .image-process__content {
    cursor: pointer;
    .image-process__image-wrapper {
      width: 150px;
      height: 100px;
      border: 1px $color-border-base dashed;
      text-align: center;
      border-radius: 2px;
      transition: 0.3s border ease;
      &:hover {
        border: 1px $color-primary dashed;
      }
      img {
        height: 100px;
        width: 150px;
        object-fit: contain;
      }
    }
  }
}
</style>
