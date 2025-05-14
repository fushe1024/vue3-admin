import service from '@/utils/request'

/**
 * 获取文章列表
 * @param {*} params 分页参数 { page: 页码, size: 每页条数}
 * @returns 文章列表
 */
export const getArticleList = (params) =>
  service.get('/article/list', { params })

/**
 * 获取文章详情
 * @param {*} id 文章id
 * @returns 文章详情
 */
export const articleDetail = (id) => service.get(`/article/${id}`)

/**
 * 删除文章
 * @param {*} id 文章id
 * @returns 结果
 */
export const deleteArticle = (id) => service.get(`/article/delete/${id}`)

/**
 * 修改文章顺序
 * @param {*} data { initRanking: 初始顺序, finalRanking: 最终顺序  }
 * @returns 结果
 */
export const updateArticleSort = (data) => service.post('/article/sort', data)

/**
 * 创建文章
 * @param {*} data 文章数据 { title: 标题, content: 内容 }
 * @returns 结果
 */
export const createArticle = (data) => service.post('/article/create', data)

/**
 * 编辑文章
 * @param {*} data 文章数据 { id: 文章id, title: 标题, content: 内容 }
 * @returns 结果
 */
export const editArticle = (data) => service.post('/article/edit', data)
