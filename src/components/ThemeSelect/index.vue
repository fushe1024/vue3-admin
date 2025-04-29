<script setup>
import SelectColor from './components/SelectColor.vue'
import { ref } from 'vue'

// 颜色选择框的引用
const colorRef = ref(null)
// 打开对话框
const handleSetTheme = () => {
  colorRef.value.openDialog()
}
</script>

<template>
  <el-dropdown v-bind="$attrs" trigger="click" @command="handleSetTheme">
    <!-- icon -->
    <div>
      <el-tooltip :content="$t('navBar.themeChange')">
        <svg-icon icon="change-theme" />
      </el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- select-color -->
  <select-color ref="colorRef" />
</template>

<style scoped lang="scss"></style>
