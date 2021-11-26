import { ref } from 'vue'

export function useFileInput() {
  const fileInput = ref<null | HTMLInputElement>(null)
  const triggleUpload = () => {
    if (fileInput.value) {
      fileInput.value.click()
    }
  }
  const clearFileInput = () => {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  return { fileInput, triggleUpload, clearFileInput }
}
