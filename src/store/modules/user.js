// user module
import { login, getUserInfo } from '@/api/sys'
import { setTimeStamp } from '@/utils/auth'
import { TOKEN } from '@/constant'
import storage from '@/utils/storage'
import router from '@/router'
import md5 from 'md5'

export default {
  namespaced: true,
  state: {
    token: storage.get(TOKEN) || '',
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      storage.set(TOKEN, token)
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) })
          .then((response) => {
            commit('SET_TOKEN', response.token)
            setTimeStamp()
            router.replace('/')
            resolve()
          })
          .catch((error) => reject(error))
      })
    },
    async getInfo({ commit }) {
      const res = await getUserInfo()
      commit('SET_USER_INFO', res)
    },
    logout({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_USER_INFO', {})
      storage.clear()
      router.replace('/login')
    }
  }
}
