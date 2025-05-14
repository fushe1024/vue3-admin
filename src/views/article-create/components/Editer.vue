<script setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { i18nChangeLanguage } from '@wangeditor/editor'
import { watchSwitchLang } from '@/utils/i18n'
import richTextConfig from './config/richtext-editor'
import {
  onBeforeUnmount,
  ref,
  defineProps,
  defineEmits,
  shallowRef,
  watch
} from 'vue'
import { commitArticle, commitArticleEdit } from './commit'

// 监听语言切换
watchSwitchLang((lang) => {
  i18nChangeLanguage(lang === 'zh' ? 'zh-CN' : 'en')
})

// 接收父组件传递的 props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

// 接收父组件传递的事件
const emits = defineEmits(['onSuccess'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 监听是否有文章数据（回显数据）
watch(
  () => props.detail,
  (newVal) => {
    if (newVal && newVal.content) {
      valueHtml.value = newVal.content
    }
  },
  {
    immediate: true
  }
)

// 提交按钮点击事件
const onSubmitBtn = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await commitArticleEdit({
      id: props.detail._id,
      title: props.title,
      content: valueHtml.value
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: valueHtml.value
    })
  }
  editorRef.value.clear()
  emits('onSuccess')
}

// 组件销毁时，销毁编辑器
onBeforeUnmount(() => {
  if (editorRef.value == null) return
  editorRef.value.destroy()
})
</script>

<template>
  <div class="editer-container">
    <!-- editer 渲染区域 -->
    <div class="editer-main">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="richTextConfig.toolbarConfig"
        :mode="richTextConfig.mode"
      />
      <Editor
        style="height: 450px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="richTextConfig.editorConfig"
        :mode="richTextConfig.mode"
        @onCreated="handleCreated"
      />
    </div>
    <div class="btns">
      <el-button type="primary" @click="onSubmitBtn">
        {{ $t('article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.editer-container {
  .editer-main {
    border: 1px solid #ccc;
  }

  .btns {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
}
</style>
