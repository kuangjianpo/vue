import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  username: ''
}
const mutations = {
  setUsername (state, name) {
    state.username = name
    localStorage.setItem('temp', name)
  }
  // getUsername (state) {
  //   return state.username
  // }
}
const actions = {
  setUsernameAction: ({commit}, name) => {
    commit('setUsername', name)
  }
  // getUsernameAction: ({commit}) => {
  //   commit('getUsername')
  // }
}
const getters = {
  getUserName: (state) => {
    return localStorage.getItem('temp')
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
