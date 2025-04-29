<script setup>
import { ref, defineExpose } from 'vue'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'
const store = useStore()

// 主题颜色
const themeColor = ref(store.getters.mainColor)
// 预设颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])

// 打开对话框
const dialogVisible = ref(false)
const openDialog = () => {
  dialogVisible.value = true
}

// 确认按钮
const handleConfirm = async () => {
  // 生成新的样式，写入新的样式
  const newStyle = await generateNewStyle(themeColor.value)
  writeNewStyle(newStyle)
  store.commit('theme/setMainColor', themeColor.value)
  dialogVisible.value = false
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('theme.themeChange')"
    width="22%"
  >
    <!-- color-select -->
    <div class="color-block">
      <span class="demonstration">{{ $t('theme.themeColorChange') }}:</span>
      <el-color-picker v-model="themeColor" :predefine="predefineColors" />
    </div>
    <!-- footer -->
    <template #footer>
      <div class="dialog-footer">
        <!-- 取消 -->
        <el-button @click="dialogVisible = false">
          {{ $t('universal.cancel') }}
        </el-button>
        <!-- 确认 -->
        <el-button type="primary" @click="handleConfirm">
          {{ $t('universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.color-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 30px;

  .demonstration {
    margin-right: 10px;
  }
}
</style>
