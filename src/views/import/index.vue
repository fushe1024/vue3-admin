<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { importExcel } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { USER_RELATIONS, formatDate } from './utils'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const i18n = useI18n()

// 上传成功回调
const onSuccess = async ({ headerRow, results }) => {
  const uploadData = generateData(results)
  await importExcel(uploadData)

  // 上传成功提示信息
  ElMessage({
    message: results.length + i18n.t('excel.importSuccess'),
    type: 'success'
  })

  router.push('/user/manage')
}

// 转换要上传数据
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<template>
  <upload-excel :onSuccess="onSuccess" />
</template>

<style lang="scss" scoped></style>
