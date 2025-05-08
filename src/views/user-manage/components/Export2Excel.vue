<script setup>
import { ref, defineModel, watch } from 'vue'
import { USER_RELATIONS } from './constants'
import { ElMessage } from 'element-plus'
import { watchSwitchLang } from '@/utils/i18n'
import { exportAllUser } from '@/api/user-manage'
import { formatJsonData } from './utils'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

// 弹窗显示
const dialogVisible = defineModel('dialogVisible')

// 导出名称
let defaultName = i18n.t('excel.defaultName')
const excelName = ref(defaultName)

// 监听语言切换
watchSwitchLang(() => {
  defaultName = i18n.t('excel.defaultName')
  excelName.value = defaultName
})

// 监听弹窗显示
watch(
  dialogVisible,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        excelName.value = defaultName
      }, 300)
    }
  },
  { deep: true }
)

// 关闭弹窗
const closed = () => {
  dialogVisible.value = false
  loading.value = false
}

// 确认逻辑
const loading = ref(false)
const onConfirm = async () => {
  if (!excelName.value) {
    ElMessage.error('导出名称不能为空')
    return
  }
  // loading
  loading.value = true

  // 获取数据
  const { list } = await exportAllUser(excelName.value)

  // 格式化 Excel 数据
  const data = formatJsonData(USER_RELATIONS, list)

  // 导入文件下载工具 => 进行导出
  const excel = await import('@/utils/Export2Excel')

  excel.export_json_to_excel({
    // 表头
    header: Object.keys(USER_RELATIONS),
    // 数据
    data,
    filename: excelName.value || defaultName,
    // 是否自动宽度
    autoWidth: true,
    // 导出格式
    bookType: 'xlsx'
  })

  closed()
}
</script>

<template>
  <!-- dialog -->
  <el-dialog v-model="dialogVisible" :title="$t('excel.title')" width="30%">
    <!-- input -->
    <el-input v-model="excelName" :placeholder="$t('excel.placeholder')" />
    <!-- footer -->
    <template #footer>
      <div class="btns">
        <el-button @click="closed">{{ $t('excel.close') }}</el-button>
        <el-button @click="onConfirm" :loading="loading" type="primary">
          {{ $t('excel.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
