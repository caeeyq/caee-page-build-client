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
