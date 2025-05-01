<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 实现全屏
const onToggle = () => {
  screenfull.toggle()
}

// 状态改变
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 绑定监听
onMounted(() => {
  screenfull.on('change', change)
})

// 取消监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<template>
  <div @click="onToggle">
    <el-tooltip :content="$t('navBar.screenfull')">
      <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
    </el-tooltip>
  </div>
</template>
