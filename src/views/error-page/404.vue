<script setup>
import { useRouter } from 'vue-router'
import { resetDbData } from '@/api/reset-data'
const router = useRouter()

// 临时测试
const resetData = async () => {
  await resetDbData()
  router.push('/')
}
// 临时测试
</script>

<template>
  <div class="error-page">
    <el-result
      icon="warning"
      title="Warning Tip"
      sub-title="Please follow the instructions"
    >
      <template #extra>
        <el-button type="primary" @click="resetData">Back</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="scss" scoped></style>
