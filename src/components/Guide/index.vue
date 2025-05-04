<script setup>
import { watchSwitchLang } from '@/utils/i18n'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { onMounted } from 'vue'
import steps from './steps'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

// driver 配置
let driverObj = null
const initDriver = () => {
  driverObj = driver({
    showButtons: ['next', 'previous', 'close'],
    nextBtnText: i18n.t('guide.next'),
    prevBtnText: i18n.t('guide.prev')
  })
  driverObj.setSteps(steps(i18n))
}

onMounted(() => {
  initDriver()
})

// 点击引导按钮
const onGuideBtn = () => {
  driverObj.drive()
}

// 监听语言切换
watchSwitchLang(() => {
  initDriver()
})
</script>

<template>
  <div>
    <el-tooltip :content="$t('navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onGuideBtn" />
    </el-tooltip>
  </div>
</template>

<style scoped></style>
