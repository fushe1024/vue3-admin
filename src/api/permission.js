import service from '@/utils/request'

/**
 * 获取权限列表
 * @returns 权限列表
 */
export const getPermissionList = () => service.get('/permission/list')
