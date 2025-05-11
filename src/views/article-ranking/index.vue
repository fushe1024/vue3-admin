<script setup>
import { ref, watch, onActivated } from 'vue'
import { getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { relativeTime } from '@/utils/format.js'

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

// 监听语言切换
watchSwitchLang(getArticleListData)
// 监听路由变化
onActivated(getArticleListData)

// 监听分页器变化
watch(
  reqData,
  () => {
    getArticleListData()
  },
  { deep: true }
)
</script>

<template>
  <div class="article-ranking-container">
    <el-card class="btns">
      <h2>测试</h2>
    </el-card>
    <el-card>
      <!-- table -->
      <el-table :data="articleListData" border>
        <el-table-column
          prop="ranking"
          :label="$t('article.ranking')"
          width="100"
        />
        <el-table-column prop="title" :label="$t('article.title')" />
        <el-table-column prop="author" :label="$t('article.author')" />
        <el-table-column :label="$t('article.publicDate')">
          <template #default="{ row }">
            {{ relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="$t('article.desc')" />
        <el-table-column :label="$t('article.action')">
          <template #default>
            <el-button type="primary" size="small">
              {{ $t('article.show') }}
            </el-button>
            <el-button type="danger" size="small">
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
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
