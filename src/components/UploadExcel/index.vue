<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getHeaderRow, isExcel } from './utils'
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 上传成功回调
  onSuccess: Function
})

const loading = ref(false)
const uploadInput = ref(null)

// 点击上传按钮
const handlUploadBtn = () => {
  uploadInput.value.click()
}

// 选择文件
const handlChange = (e) => {
  const file = e.target.files[0] // 获取文件
  if (!file) return
  upload(file)
}

// 上传事件
const upload = (file) => {
  uploadInput.value.value = null

  // 没有 beforeUpload 方法, 直接读取
  if (!props.beforeUpload) {
    readExcel(file)
    return
  }

  // 有 beforeUpload 方法, 先执行 beforeUpload 方法, 再读取
  const before = props.beforeUpload(file)
  if (before) {
    readExcel(file)
  }
}

// 读取 excel 文件
const readExcel = (file) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()

    reader.onload = (e) => {
      // 1. 读取文件内容
      const data = e.target.result
      // 2. 解析 Excel 文件
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一个工作表的名称
      const firstsheetName = workbook.SheetNames[0]
      // 4. 获取第一个工作表的数据的数据
      const worksheet = workbook.Sheets[firstsheetName]
      // 5. 解析数据表头
      const headerRow = getHeaderRow(worksheet)
      // 6. 解析数据
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析的数据
      generateData({ headerRow, results })
      loading.value = false
      resolve()
    }

    reader.readAsArrayBuffer(file)
  })
}

// 根据导入内容, 生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

// 拖拽上传
const handleDrop = (e) => {
  // 如果有文件上传，则不执行
  if (loading.value) return

  // 获取文件数组
  const files = e.dataTransfer.files

  // 判断是否有文件
  if (files.length < 1) {
    ElMessage.error('必须要有一个文件')
    return
  }

  // 判断是否为 excel 文件
  const file = files[0]
  if (!isExcel(file)) {
    ElMessage.error('文件必须是：.xls 或 .xlsx 格式')
    return
  }

  // 上传文件
  upload(file)
}
const handleDragover = (e) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<template>
  <div class="upload-excel">
    <!-- 点击上传 -->
    <div class="upload-btn">
      <el-button type="primary" :loading="loading" @click="handlUploadBtn">
        {{ $t('uploadExcel.upload') }}
      </el-button>
    </div>
    <!-- 隐藏按钮 -->
    <div class="upload-input">
      <input
        class="excel-upload-input"
        accept=".xls,.xlsx"
        ref="uploadInput"
        type="file"
        @change="handlChange"
      />
    </div>
    <!-- 拖拽区域 -->
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="upload-drag"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <div>
        <upload-filled class="upload-drag-icon" />
      </div>
      <div class="upload-drag-text">
        <span>{{ $t('uploadExcel.drop') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-excel {
  margin-top: 100px;
  display: flex;
  justify-content: center;

  // 上传按钮
  .upload-btn {
    width: 350px;
    height: 160px;
    border: 1px dashed #bbb;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // 上传隐藏输入框
  .upload-input {
    display: none;
  }

  // 拖拽区域
  .upload-drag {
    width: 350px;
    height: 160px;
    border: 1px dashed #bbb;
    border-left: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    // 拖拽图标
    .upload-drag-icon {
      width: 50px;
      height: 50px;
      color: #bbb;
    }

    // 拖拽文字
    .upload-drag-text {
      color: #bbb;
    }
  }
}
</style>
