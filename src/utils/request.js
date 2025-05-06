import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from './auth.js'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // 设置基础 URL
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 设置请求头中的 icode
    config.headers.icode = 'helloqianduanxunlianying'
    // 设置国际化
    config.headers['Accept-Language'] = store.getters.language
    // 在请求头中添加 token
    const token = store.getters.token
    if (token) {
      // 判断 token 是否过期
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token 超时了'))
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 处理响应数据
    const { success, message, data } = response.data

    // 根据 success 判断是否请求成功
    if (success) {
      return data
    } else {
      ElMessage.success(message)
    }
    return data
  },
  (error) => {
    // 单一用户登录逻辑
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
      router.replace('/login')
      ElMessage.error(error.message || '您的账号在其他地方登录')
    }
    // 处理响应错误
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
