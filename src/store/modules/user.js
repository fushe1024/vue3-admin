// user module
import { login, getUserInfo } from '@/api/sys'
import { setTimeStamp } from '@/utils/auth'
import md5 from 'md5'
import storage from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'

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
    CLEAR_TOKEN(state) {
      state.token = ''
      storage.remove(TOKEN)
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    CLEAR_USER_INFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    /**
     * 登录
     */
    login({ commit }, userInfo) {
      // 解构用户名和密码
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username: username,
          password: md5(password)
        })
          .then((response) => {
            commit('SET_TOKEN', response.token)
            setTimeStamp()
            router.replace('/')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /**
     * 获取用户信息
     */
    async getInfo({ commit }) {
      const res = await getUserInfo()
      commit('SET_USER_INFO', res)
    },
    /**
     * 退出登录
     */
    logout({ commit }) {
      commit('CLEAR_TOKEN')
      commit('CLEAR_USER_INFO')
      storage.clear()
      router.replace('/login')
    }
  }
}
