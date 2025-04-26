import service from '@/utils/request'

// 登录
export const login = (data) => service.post('/sys/login', data)

// 获取用户信息
export const getUserInfo = () => service.get('/sys/profile')
