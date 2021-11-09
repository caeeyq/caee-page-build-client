import { defineStore, _ActionsTree, _GettersTree } from 'pinia'

interface LoadingState {
  requestNumber: number
  opNames: { [key: string]: boolean }
}

interface LoadingGetter extends _GettersTree<LoadingState> {
  isLoading: (state: LoadingState) => boolean
  isOpLoading: (state: LoadingState) => (opName: string) => boolean
}

interface LoadingAction extends _ActionsTree {
  startLoading: (payload?: { opName?: string }) => void
  finishLoading: (payload?: { opName?: string }) => void
}

export const useLoadingStore = defineStore<
  'loading',
  LoadingState,
  LoadingGetter,
  LoadingAction
>('loading', {
  state: () => {
    return {
      requestNumber: 0,
      opNames: {},
    }
  },
  getters: {
    isLoading(state) {
      return state.requestNumber > 0
    },
    isOpLoading(state) {
      return (opName) => state.opNames[opName] || false
    },
  },
  actions: {
    startLoading(payload) {
      this.requestNumber++
      if (payload && payload.opName) {
        this.opNames[payload.opName] = true
      }
    },
    finishLoading(payload) {
      this.requestNumber--
      if (payload && payload.opName) {
        delete this.opNames[payload.opName]
      }
    },
  },
})
