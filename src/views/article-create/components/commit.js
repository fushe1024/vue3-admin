import { createArticle, editArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const t = i18n.global.t

// 提交文章
export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('article.createSuccess'))
  return res
}

// 编辑文章
export const commitArticleEdit = async (data) => {
  const res = await editArticle(data)
  ElMessage.success(t('article.editorSuccess'))
  return res
}
