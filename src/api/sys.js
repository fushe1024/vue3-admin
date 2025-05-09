import service from '@/utils/request'

/**
 * 登录
 * @param {*} data 用户名和密码
 * @returns
 */
export const login = (data) => service.post('/sys/login', data)

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = () => service.get('/sys/profile')
