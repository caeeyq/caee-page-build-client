<template>
  <div class="caee-uploader">
    <button @click="triggleUpload" :disabled="isLoading">
      {{ isLoading ? '上传中' : '点击上传' }}
    </button>
    <input
      style="display: none"
      ref="fileInput"
      type="file"
      @change="handleFileChange"
    />
    <ul>
      <li
        v-for="file in fileList"
        :key="file.uuid"
        :class="`caee-uploader__list-item caee-uploader__list-item--${file.status}`"
      >
        <span class="caee-uploader__list-item-name">{{ file.name }}</span>
        <button @click="delFile(file)" class="caee-uploader__del-icon">
          删除
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from 'axios'
import { computed, reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { FileItem, UploadResp } from './types'

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
const fileList = ref<FileItem[]>([])

const isLoading = computed(() =>
  fileList.value.some((file) => file.status === 'loading')
)

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
    const fileItem = reactive<FileItem>({
      name: uploadFile.name,
      uuid: uuidv4(),
      size: uploadFile.size,
      status: 'loading',
      row: uploadFile,
    })
    fileList.value.push(fileItem)
    const formData = new FormData()
    formData.append(uploadFile.name, uploadFile)
    axios
      .post<AxiosResponse<UploadResp>>(props.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        fileItem.status = 'success'
        emits('update:fileUrl', res.data.download_url)
      })
      .catch(() => {
        fileItem.status = 'error'
      })
      .finally(() => {
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      })
  }
}
const delFile = (file: FileItem) => {
  fileList.value = fileList.value.filter(
    (fileItem) => fileItem.uuid !== file.uuid
  )
}
</script>

<style lang="scss" scoped>
.caee-uploader {
  .caee-uploader__list-item {
    &.caee-uploader__list-item--success {
      color: green;
    }
    &.caee-uploader__list-item--loading {
      color: yellow;
    }
    &.caee-uploader__list-item--error {
      color: red;
    }
  }
}
</style>
