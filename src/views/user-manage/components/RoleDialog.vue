<script setup>
import { defineProps, defineModel, defineEmits, ref, watch } from 'vue'
import { getRoleList } from '@/api/role'
import { getUserRole, assignUserRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

// 接收父组件传过来的userId
const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})
// 定义事件
const emits = defineEmits(['updateRole'])

// 对话框是否可见
const dialogVisible = defineModel('role-dialog-visible')

// 所有角色列表
const allRoleList = ref([])
// 获取所有角色列表
const getAllRoleList = async () => {
  const res = await getRoleList()
  allRoleList.value = res
}
getAllRoleList()

// 用户角色列表
const userRoleList = ref([])
// 获取用户角色列表
const getUserRoleList = async () => {
  const res = await getUserRole(props.userId)
  userRoleList.value = res.role.map((item) => item.title)
}

// 监听
watch(
  () => props.userId,
  (val) => {
    if (val) {
      getUserRoleList()
    }
  }
)

// 监听语言切换
watchSwitchLang(getAllRoleList)

// 关闭
const handleClose = () => {
  dialogVisible.value = false
  userRoleList.value = []
}

// 确认
const i18n = useI18n()
const onConfirm = async () => {
  // 转换提交需要的数据
  const roles = userRoleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })

  // 调用接口
  await assignUserRole(props.userId, roles)

  ElMessage.success(i18n.t('role.updateRoleSuccess'))

  handleClose()

  // 触发事件
  emits('updateRole')
}
</script>

<template>
  <el-dialog :title="$t('excel.roleDialogTitle')" v-model="dialogVisible">
    <!-- checkbox -->
    <el-checkbox-group v-model="userRoleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
        :value="item.title"
      />
    </el-checkbox-group>
    <!-- footer -->
    <template #footer>
      <div class="btns">
        <el-button @click="handleClose">{{ $t('universal.cancel') }}</el-button>
        <el-button @click="onConfirm" type="primary">
          {{ $t('universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
