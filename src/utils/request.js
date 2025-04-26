import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // 设置基础 URL
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = 'helloqianduanxunlianying' // 设置请求头中的 icode
    // 在请求头中添加 token
    const token = store.getters.token
    if (token) {
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
    // 处理响应错误
    console.error('Response error:', error)
    return Promise.reject(error)
  }
)

export default service
