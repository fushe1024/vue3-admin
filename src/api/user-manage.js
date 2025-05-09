import service from '@/utils/request'

/**
 * 获取用户列表
 * @param {*} params 查询参数 { page: 页码, size: 每页条数}
 * @returns
 */
export const getUserManageList = (params) =>
  service.get('/user-manage/list', { params })

/**
 * 导入用户
 * @param {*} data 导入的数据
 * @returns
 */
export const importExcel = (data) =>
  service.post('/user-manage/batch/import', data)

/**
 * 删除用户
 * @param {*} id 用户id
 * @returns
 */
export const deleteUser = (id) => service.get(`/user-manage/detele/${id}`)

/**
 * 导出所有用户
 * @returns
 */
export const exportAllUser = () => service.get('/user-manage/all-list')

/**
 * 获取用户详情
 * @param {*} id 用户id
 * @returns
 */
export const userDetail = (id) => service.get(`/user-manage/detail/${id}`)

/**
 * 获取指定用户的角色
 * @param {*} id 用户id
 */
export const getUserRole = (id) => service.get(`/user-manage/role/${id}`)

/**
 * 分配用户角色
 * @param {*} roles 分配的角色数组
 * @returns
 */
export const assignUserRole = (id, roles) =>
  service.post(`/user-manage/update-role/${id}`, { roles })
