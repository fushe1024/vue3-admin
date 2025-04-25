// user module
import { login } from '@/api/sys'
import md5 from 'md5'
import storage from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: storage.get(TOKEN) || ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      storage.set(TOKEN, token)
    }
  },
  actions: {
    async login({ commit }, userInfo) {
      // 解构用户名和密码
      const { username, password } = userInfo

      return new Promise((resolve, reject) => {
        login({
          username: username,
          password: md5(password)
        })
          .then((response) => {
            commit('SET_TOKEN', response.token)
            router.replace('/')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
