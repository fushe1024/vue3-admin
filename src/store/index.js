import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import getters from './getters'

// modules
const modules = {
  user,
  app,
  theme
}

export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules
})
