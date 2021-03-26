import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arr: [
      { id: 1, val: 0 },
      { id: 2, val: 1 },
      { id: 3, val: 2 },
      { id: 4, val: 3 },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    sum: (state) =>
      state.arr.map((item) => item.val).reduce((x, y) => x * 10 + Number(y)),
  },
  modules: {},
})
