import { last } from 'lodash-es'
import { computed, reactive, ref } from 'vue'
import { FileItem } from '../types'
import { v4 as uuidv4 } from 'uuid'

export function useFileList() {
  const fileList = ref<FileItem[]>([])

  const isLoading = computed(() =>
    fileList.value.some((file) => file.status === 'loading')
  )

  const lastFileData = computed(() => {
    const lastFile = last(fileList.value)
    if (lastFile && lastFile.status === 'success') {
      return {
        status: lastFile.status,
        respData: lastFile.resp,
      }
    }
    return false
  })

  const delFile = (file: FileItem) => {
    fileList.value = fileList.value.filter(
      (fileItem) => fileItem.uuid !== file.uuid
    )
  }

  const addFile = (file: File) => {
    const fileItem = reactive<FileItem>({
      name: file.name,
      uuid: uuidv4(),
      size: file.size,
      status: 'loading',
      row: file,
    })
    fileList.value.push(fileItem)
    return fileItem
  }
  return { fileList, isLoading, lastFileData, delFile, addFile }
}
