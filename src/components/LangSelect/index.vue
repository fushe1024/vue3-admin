<script setup>
import { defineProps, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

// Props 定义
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: (value) => {
      return ['dark', 'light'].includes(value)
    }
  }
})

// 动态获取语言模式
const store = useStore()
const language = computed(() => store.getters.language)

// 切换语言
const i18n = useI18n()
const handleSetLanguage = (value) => {
  i18n.locale.value = value
  store.commit('app/setLanguage', value)
  ElMessage.success(i18n.t('toast.switchLangSuccess'))
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <!-- icon -->
    <div>
      <el-tooltip :content="$t('navBar.lang')" :effect="effect">
        <svg-icon id="guide-lang" icon="language" />
      </el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >简体中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
