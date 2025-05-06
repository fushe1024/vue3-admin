<script setup>
import { defineProps } from 'vue'

defineProps({
  feature: {
    type: Array,
    requied: true
  }
})
</script>

<template>
  <el-collapse>
    <el-collapse-item
      v-for="item in feature"
      :key="item.id"
      :title="item.title"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss">
:deep(.el-collapse-item__header) {
  font-weight: bold;
}

:deep(.el-collapse-item__content) {
  a {
    color: #2d62f7;
    margin: 0 5px;
  }
}
</style>
