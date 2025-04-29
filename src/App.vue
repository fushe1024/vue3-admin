<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { writeNewStyle, generateNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'
const store = useStore()

// 设置主题色
generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})
</script>

<template>
  <el-config-provider :locale="store.getters.language === 'zh' ? zhCn : en">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
