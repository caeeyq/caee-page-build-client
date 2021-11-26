<template>
  <div class="caee-uploader">
    <div class="caee-uploader__upload-area" @click="triggleUpload">
      <slot v-if="isLoading" name="loading">
        <el-button disabled> 上传中 </el-button>
      </slot>
      <slot
        v-else-if="lastFileData && lastFileData.status === 'success'"
        name="uploaded"
        :uploadedData="lastFileData.respData"
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
    <ul v-if="showUploadList">
      <li
        v-for="file in fileList"
        :key="file.uuid"
        :class="`caee-uploader__list-item caee-uploader__list-item--${file.status}`"
      >
        <img
          class="caee-uploader__list-item-img"
          v-if="file.previewUrl"
          :src="file.previewUrl"
        />
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
import { Delete } from '@element-plus/icons'

import { useFileInput } from './hooks/useFileInput'
import { useFileList } from './hooks/useFileList'

import { BeforeUpload, FileItem, UploadResp } from './types'
import { isBoolean } from 'lodash'
import { generateBase64 } from '@/utils/file'

const props = withDefaults(
  defineProps<{
    /** 上传的地址 */
    action: string
    beforeUpload?: BeforeUpload
    /** 发到后台的文件参数名 */
    keyName?: string
    /** 请求头 */
    headers?: Record<string, string>
    /** 是否携带cookie */
    withCredentials?: boolean
    /** 是否展示文件列表 */
    showUploadList?: boolean | { showImg: boolean }
  }>(),
  {
    keyName: 'file',
    withCredentials: false,
    showUploadList: false,
    headers: () => ({
      'Content-Type': 'multipart/form-data',
    }),
  }
)

const emits = defineEmits<{
  (e: 'success', respData: UploadResp): void
}>()

const { fileInput, triggleUpload, clearFileInput } = useFileInput()
const { fileList, isLoading, lastFileData, delFile, addFile } = useFileList()

const postFile = async (formData: FormData, fileItem: FileItem) => {
  if (!isBoolean(props.showUploadList) && props.showUploadList.showImg) {
    fileItem.previewUrl = await generateBase64(fileItem.row)
  }
  axios
    .post<AxiosResponse<UploadResp>>(props.action, formData, {
      withCredentials: props.withCredentials,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...props.headers,
      },
    })
    .then((res) => {
      fileItem.status = 'success'
      fileItem.resp = res.data
      emits('success', res.data)
    })
    .catch(() => {
      fileItem.status = 'error'
    })
    .finally(clearFileInput)
}

const uploadFiles = (files: FileList) => {
  if (!files) return
  const fileItem = addFile(files[0])
  const formData = new FormData()
  formData.append(props.keyName, fileItem.row, fileItem.row.name)

  if (props.beforeUpload) {
    const beforeHandleRes = props.beforeUpload(fileItem.row)
    if (beforeHandleRes instanceof Promise) {
      beforeHandleRes
        .then((file) => {
          if (!(file instanceof File))
            throw new Error('beforeUpload 应该返回 Promise<File> 类型')
          fileItem.row = file
          postFile(formData, fileItem)
        })
        .catch((e) => {
          console.error(e)
        })
    } else if (beforeHandleRes === true) {
      postFile(formData, fileItem)
    }
  } else {
    postFile(formData, fileItem)
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  uploadFiles(target.files)
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
    .caee-uploader__list-item-img {
      width: 80px;
      height: 80px;
      object-fit: cover;
    }
    .caee-uploader__del-icon {
      cursor: pointer;
    }
  }
}
</style>
