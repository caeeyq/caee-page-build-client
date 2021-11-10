import { _ActionsTree, _GettersTree } from 'pinia'

export interface LoadingState {
  requestNumber: number
  opNames: { [key: string]: boolean }
}

export interface LoadingGetter extends _GettersTree<LoadingState> {
  isLoading: (state: LoadingState) => boolean
  isOpLoading: (state: LoadingState) => (opName: string) => boolean
}

export interface LoadingAction extends _ActionsTree {
  startLoading: (payload?: { opName?: string }) => void
  finishLoading: (payload?: { opName?: string }) => void
}
