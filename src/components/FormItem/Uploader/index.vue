<template>
  <div class="caee-uploader">
    <div class="caee-uploader__upload-area" @click="triggleUpload">
      <slot v-if="isLoading" name="loading">
        <el-button disabled> 上传中 </el-button>
      </slot>
      <slot
        v-else-if="lastFileData && lastFileData.status === 'success'"
        name="uploaded"
      >
        <el-button> 点击上传 </el-button>
      </slot>
      <slot v-else name="default">
        <el-button> 点击上传 </el-button>
      </slot>
    </div>

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
        <el-icon
          class="caee-uploader__del-icon"
          @click="delFile(file)"
          color="#f56c6c"
        >
          <Delete />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from 'axios'
import { computed, reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { FileItem, UploadResp } from './types'
import { Delete } from '@element-plus/icons'

const props = defineProps<{
  action: string
}>()

const fileInput = ref<null | HTMLInputElement>(null)
const fileList = ref<FileItem[]>([])

const isLoading = computed(() =>
  fileList.value.some((file) => file.status === 'loading')
)
const lastFileData = computed(() => {
  const lastFile = fileList.value[fileList.value.length - 1]
  if (lastFile && lastFile.status === 'success') {
    return {
      status: lastFile.status,
      respData: lastFile.resp,
    }
  }
  return false
})

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
        fileItem.resp = res.data
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
    font-size: 14px;
    line-height: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.caee-uploader__list-item--success {
      color: $color-success;
    }
    &.caee-uploader__list-item--loading {
      color: $color-warning;
    }
    &.caee-uploader__list-item--error {
      color: $color-danger;
    }
    .caee-uploader__del-icon {
      cursor: pointer;
    }
  }
}
</style>
