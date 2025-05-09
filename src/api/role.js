import service from '@/utils/request'

/**
 * 获取角色列表
 */
export const getRoleList = () => service.get('/role/list')

/**
 * 获取指定角色的权限
 * @param {*} roleId 角色id
 */
export const getRolePermission = (roleId) =>
  service.get(`/role/permission/${roleId}`)

/**
 * 为角色分配权限
 * @param {*} data  { roleId: 角色id, permissionIds: 权限id数组 }
 */
export const setRolePermission = (data) =>
  service.post('/role/distribute-permission', data)
