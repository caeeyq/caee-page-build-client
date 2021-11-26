import { isString } from 'lodash'

export function generateBase64(file: Blob) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result as string)
    })
    fileReader.addEventListener('error', reject)
  })
}

export function getImageDimensions(targetImage: string | File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image()
    if (isString(targetImage)) {
      image.src = targetImage
    } else {
      image.src = URL.createObjectURL(targetImage)
    }
    image.addEventListener('load', () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
    })
    image.addEventListener('error', () => {
      reject('图片尺寸读取出了点问题...')
    })
  })
}
