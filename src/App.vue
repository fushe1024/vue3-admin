<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { writeNewStyle, generateNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'
import { useStore } from 'vuex'
const store = useStore()

generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

watchSwitchLang(() => {
  store.dispatch('user/getInfo')
})
</script>

<template>
  <el-config-provider :locale="store.getters.language === 'zh' ? zhCn : en">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
