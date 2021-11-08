import createStore from '@/utils/vuex4'

const store = createStore({
  state: {
    count: 1,
  },
  getters: {
    getCount(state) {
      return state.count
    },
  },
  mutations: {
    setCount(state, num) {
      state.count = num
    },
  },
  actions: {
    getNumFormNet(ctx) {
      setTimeout(() => {
        ctx.commit('setCount', 50)
      }, 2000)
    },
  },
})

export default store
