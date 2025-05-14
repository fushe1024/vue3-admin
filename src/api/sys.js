import service from '@/utils/request'

/**
 * 登录
 * @param {*} data 用户名和密码 { username: 用户名, password: 密码}
 * @returns token
 */
export const login = (data) => service.post('/sys/login', data)

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getUserInfo = () => service.get('/sys/profile')
