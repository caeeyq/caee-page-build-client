<template>
  <div class="caee-uploader">
    <el-button @click="triggleUpload">{{ uploadStateText }}</el-button>
    <input
      class="caee-uploader__fileinput"
      ref="fileInput"
      type="file"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError, AxiosResponse } from 'axios'
import { computed, ref } from 'vue'
import { UploadResp, UploadState } from './types'

const props = withDefaults(
  defineProps<{
    action: string
    fileUrl?: string
  }>(),
  {
    fileUrl: '',
  }
)

const emits = defineEmits<{
  (e: 'update:fileUrl', url: string): void
}>()

const fileInput = ref<null | HTMLInputElement>(null)
const uploadState = ref<UploadState>('ready')
const stateMap: Record<UploadState, string> = {
  ready: '点击上传',
  success: '上传成功',
  loading: '上传中',
  error: '上传失败',
}

const uploadStateText = computed(() => stateMap[uploadState.value])

const triggleUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    const uploadFile = files[0]
    const formData = new FormData()
    formData.append(uploadFile.name, uploadFile)
    uploadState.value = 'loading'
    axios
      .post<AxiosResponse<UploadResp>>(props.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        uploadState.value = 'success'
        if (fileInput.value) {
          fileInput.value.value = ''
        }
        emits('update:fileUrl', res.data.download_url)
      })
      .catch((err: AxiosError) => {
        uploadState.value = 'error'
        console.error(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.caee-uploader {
  .caee-uploader__fileinput {
    display: none;
  }
}
</style>
