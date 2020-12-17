import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      userId: 0,
      username: 123
    },
    todoList: [
      { todoId: 0, fulfilled: false },
      { todoId: 1, fulfilled: true },
      { todoId: 2, fulfilled: true },
      { todoId: 3, fulfilled: false },
      { todoId: 4, fulfilled: true }
    ]
  },
  getters: {

  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
