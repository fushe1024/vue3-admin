<script setup>
import { ref, watch, onActivated, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { relativeTime } from '@/utils/format'
import { dynamicData, checkedDynamicData, tableColumns } from './dynamic'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { tableRef, initSortable } from './sortable/index'

// 定义数据
const articleListData = ref([])
const total = ref(0)
const reqData = ref({
  page: 1,
  size: 10
})

// 获取文章列表
const getArticleListData = async () => {
  const res = await getArticleList(reqData.value)
  articleListData.value = res.list
  total.value = res.total
}
getArticleListData()

// 监听语言切换，监听组件激活， 重新获取文章列表
watchSwitchLang(getArticleListData)
onActivated(getArticleListData)
onMounted(() => {
  initSortable(articleListData, getArticleListData)
})

// 监听分页器变化，重新获取文章列表
watch(
  reqData,
  () => {
    getArticleListData()
  },
  { deep: true }
)

// 删除用户
const i18n = useI18n()
const delArticle = (row) => {
  ElMessageBox.confirm(
    i18n.t('article.dialogTitle1') + row.title + i18n.t('article.dialogTitle2'),
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteArticle(row._id)
      getArticleListData()
      ElMessage.success(i18n.t('article.removeSuccess'))
    })
    .catch(() => {})
}

// 查看文章详情
const router = useRouter()
const onShowArticleDetail = (row) => {
  router.push({
    name: 'articleDetail',
    params: {
      id: row._id
    }
  })
}
</script>

<template>
  <div class="article-ranking-container">
    <el-card class="btns">
      <div class="title">{{ $t('article.dynamicTitle') }}</div>
      <!-- checkbox-group -->
      <el-checkbox-group v-model="checkedDynamicData">
        <el-checkbox
          v-for="(item, index) in dynamicData"
          :key="index"
          :label="item.label"
          :value="item.prop"
        />
      </el-checkbox-group>
    </el-card>
    <el-card>
      <!-- table -->
      <el-table ref="tableRef" :data="articleListData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 'auto'"
        >
          <!-- 时间处理 -->
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ relativeTime(row.publicDate) }}
          </template>

          <!-- 按钮处理 -->
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              @click="onShowArticleDetail(row)"
            >
              {{ $t('article.show') }}
            </el-button>
            <el-button type="danger" size="small" @click="delArticle(row)">
              {{ $t('article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagination -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="reqData.page"
          v-model:page-size="reqData.size"
          :page-sizes="[5, 10, 20, 30]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.article-ranking-container {
  .btns {
    margin-bottom: 20px;
    .title {
      margin-right: 20px;
      font-size: 14px;
      font-weight: 700;
    }

    &:deep(.el-card__body) {
      display: flex;
      align-items: center;
    }
  }

  // 表格
  &:deep(.el-table__body-wrapper table tbody) {
    cursor: pointer;
  }

  // 拖拽元素样式
  &:deep(.sortable-ghost) {
    opacity: 0.6;
    color: #fff !important;
    background-color: #304156 !important;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
