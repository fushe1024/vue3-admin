<script setup>
import Editor from '@toast-ui/editor' // Editor
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import '@toast-ui/editor/dist/i18n/zh-cn' // Editor's Language
import { watchSwitchLang } from '@/utils/i18n'
import { ref, defineProps, onMounted, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
import { commitArticle, commitArticleEdit } from './commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

const markdownRef = ref(null) // markdown 渲染区域
let mkEditor // Editer 实列

// 初始化 Editor
const store = useStore()
const initEditer = () => {
  mkEditor = new Editor({
    el: markdownRef.value,
    height: '500px',
    initialValue: '',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en-US'
  })
  // 渲染 markdown 内容
  mkEditor.getMarkdown()
}

// 挂载完毕后初始化 Editor
onMounted(() => {
  initEditer()
})

// 监听语言切换
watchSwitchLang(() => {
  const htmlStr = mkEditor.getHTML() // 获取 html 内容
  mkEditor.destroy() // 销毁 Editor
  initEditer() // 初始化 Editor
  mkEditor.setHTML(htmlStr) // 设置 html 内容
})

// 监听是否有文章数据（回显数据）
watch(
  () => props.detail,
  (newVal) => {
    if (newVal && newVal.content) {
      mkEditor.setHTML(newVal.content) // 设置 html 内容
    }
  },
  {
    immediate: true
  }
)

// 提交按钮逻辑
const onSubmitBtn = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await commitArticleEdit({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }

  // 清空内容
  mkEditor.reset()
  // 提交成功
  emits('onSuccess')
}
</script>

<template>
  <div class="markdown-container">
    <!-- markdown 渲染区域 -->
    <div ref="markdownRef" id="markdown-main"></div>
    <div class="btns">
      <el-button type="primary" @click="onSubmitBtn">
        {{ $t('article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.markdown-container {
  .btns {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
}
</style>
