import service from '@/utils/request'

// 获取用户列表
export const getUserManageList = (params) =>
  service.get('/user-manage/list', { params })

// 导入excel
export const importExcel = (data) =>
  service.post('/user-manage/batch/import', data)
