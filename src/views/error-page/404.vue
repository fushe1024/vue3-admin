<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="error-page">
    <el-result
      icon="warning"
      title="Warning Tip"
      sub-title="Please follow the instructions"
    >
      <template #extra>
        <el-button type="primary" @click="router.push('/')">Back</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="scss" scoped></style>
