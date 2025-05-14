<script setup>
import { ref, defineOptions } from 'vue'
import { articleDetail } from '@/api/article'
import { useRoute, useRouter } from 'vue-router'
import { relativeTime } from '@/utils/format'

defineOptions({
  name: 'ArticleDetail'
})

// 获取路由参数
const route = useRoute()
const articleId = route.params.id

// 获取文章详情
const detail = ref({})
const getArticleDetail = async () => {
  const res = await articleDetail(articleId)
  detail.value = res
}
getArticleDetail()

// 编辑按钮点击事件
const router = useRouter()
const onEditClick = () => {
  router.push(`/article/editor/${articleId}`)
}
</script>

<template>
  <div class="article-detail-container">
    <!-- title -->
    <h2 class="title">{{ detail.title }}</h2>

    <!-- header -->
    <div class="header">
      <span class="author">
        {{ $t('article.author') }}: {{ detail.author }}
      </span>
      <span class="time">
        {{ $t('article.publicDate') }}:
        {{ relativeTime(detail.publicDate) }}
      </span>
      <el-button text class="edit" @click="onEditClick">
        {{ $t('article.edit') }}
      </el-button>
    </div>

    <!-- content -->
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
