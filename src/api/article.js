import service from '@/utils/request'

/**
 * 获取文章列表
 * @param {*} params 分页参数 { page: 页码, size: 每页条数}
 * @returns 文章列表
 */
export const getArticleList = (params) =>
  service.get('/article/list', { params })
