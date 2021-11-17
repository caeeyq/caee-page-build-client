export type UploadState = 'ready' | 'success' | 'loading' | 'error'

export interface UploadResp {
  fileid: string
  download_url: string
}
