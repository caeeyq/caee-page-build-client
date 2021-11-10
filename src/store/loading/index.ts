import { defineStore } from 'pinia'
import { LoadingState, LoadingGetter, LoadingAction } from './types'

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
