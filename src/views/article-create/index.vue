<script setup>
import Markdown from './components/MarkDown.vue'
import Editer from './components/Editer.vue'
import { ref, defineOptions } from 'vue'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'

defineOptions({
  name: 'ArticleCreate'
})

const title = ref('')
const activeName = ref('markdown')

// 提交成功回调
const successCallback = () => {
  title.value = ''
  // getArticleDetail()
}

// 编辑相关数据
const route = useRoute()
const articleId = route.params.id
const detail = ref({})

// 获取文章详情 => 回显数据
const getArticleDetail = async () => {
  const res = await articleDetail(articleId)
  detail.value = res
  title.value = detail.value.title
}

// 如果有文章 id，则获取文章详情
if (articleId) {
  getArticleDetail()
}
</script>

<template>
  <div class="article-create">
    <el-card>
      <!-- title -->
      <div class="title-input">
        <el-input
          v-model="title"
          :placeholder="$t('article.titlePlaceholder')"
          maxlength="20"
          clearable
        />
      </div>
      <!-- tabs -->
      <el-tabs v-model="activeName" class="demo-tabs">
        <!-- markdown -->
        <el-tab-pane :label="$t('article.markdown')" name="markdown">
          <Markdown
            :title="title"
            :detail="detail"
            @onSuccess="successCallback"
          />
        </el-tab-pane>
        <!-- richText -->
        <el-tab-pane :label="$t('article.richText')" name="editer">
          <Editer
            :title="title"
            :detail="detail"
            @onSuccess="successCallback"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.article-create {
  .title-input {
    margin-bottom: 20px;
  }
}
</style>
