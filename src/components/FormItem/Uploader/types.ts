export type UploadState = 'ready' | 'success' | 'loading' | 'error'

export interface UploadResp {
  fileid: string
  download_url: string
}

export interface FileItem {
  uuid: string
  name: string
  size: number
  status: UploadState
  row: File
}
