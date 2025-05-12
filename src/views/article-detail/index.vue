<script setup>
import { ref } from 'vue'
import { getArticleDetail } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { useRoute } from 'vue-router'
import { relativeTime } from '@/utils/format'

// 获取路由参数
const route = useRoute()
const articleId = route.params.id

// 获取文章详情
const articleDetail = ref({})
const getArticleDetailData = async () => {
  const res = await getArticleDetail(articleId)
  articleDetail.value = res
}
getArticleDetailData()

// 监听语言变化
watchSwitchLang(getArticleDetailData)

// 编辑文章
const onEditClick = () => {
  console.log('编辑文章')
}
</script>

<template>
  <div class="article-detail-container">
    <!-- title -->
    <h2 class="title">{{ articleDetail.title }}</h2>

    <!-- header -->
    <div class="header">
      <span class="author">
        {{ $t('article.author') }}: {{ articleDetail.author }}
      </span>
      <span class="time">
        {{ $t('article.publicDate') }}:
        {{ relativeTime(articleDetail.publicDate) }}
      </span>
      <el-button text class="edit" @click="onEditClick">
        {{ $t('article.edit') }}
      </el-button>
    </div>

    <!-- content -->
    <div class="content" v-html="articleDetail.content"></div>
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
