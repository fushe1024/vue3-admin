import service from '@/utils/request'

// 获取用户列表
export const getUserManageList = (params) =>
  service.get('/user-manage/list', { params })

// 导入用户
export const importExcel = (data) =>
  service.post('/user-manage/batch/import', data)

// 删除用户
export const deleteUser = (id) => service.get(`/user-manage/detele/${id}`)

// 导出所有用户
export const exportAllUser = () => service.get('/user-manage/all-list')

// 获取用户详情
export const userDetail = (id) => service.get(`/user-manage/detail/${id}`)
