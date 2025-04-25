import service from '@/utils/request'

// 登录
export const login = (data) => service.post('/sys/login', data)
