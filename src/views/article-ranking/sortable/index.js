import Sortable from 'sortablejs'
import { ref } from 'vue'
import { updateArticleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

// 表格实例
export const tableRef = ref(null)

// initSortable 初始化
export const initSortable = (articleListData, cb) => {
  const el = tableRef.value.$el.querySelector(
    '.el-table__body-wrapper table tbody'
  )

  Sortable.create(el, {
    ghostClass: 'sortable-ghost',
    onEnd(evt) {
      const { oldIndex, newIndex } = evt

      // 发送请求更新排序
      updateArticleSort({
        initRanking: articleListData.value[oldIndex].ranking,
        finalRanking: articleListData.value[newIndex].ranking
      })
        .then(() => {
          ElMessage.success(i18n.global.t('article.sortSuccess'))
          articleListData.value = []

          // 重新获取文章列表数据
          cb && cb()
        })
        .catch(() => {})
    }
  })
}
