import { createStore } from 'vuex'

// Import the user module
import user from './modules/user'
import app from './modules/app'

// Import the getters
import getters from './getters'

// Create a new Vuex store instance
export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    user,
    app
  }
})
