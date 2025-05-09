<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { getPermissionList } from '@/api/permission'
import { getRolePermission, setRolePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

// 定义props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// tree 组件引用
const treeRef = ref(null)

// 获取所有权限列表
const allPermission = ref([])
const getAllPermission = async () => {
  const res = await getPermissionList()
  allPermission.value = res
}
getAllPermission()

// 获取角色已有权限
const rolePermission = ref([])
const getRolePermissionData = async () => {
  const res = await getRolePermission(props.userId)
  // 回显角色已有权限
  treeRef.value.setCheckedKeys(res)
}

// 监听 userId 变化
watch(
  () => props.userId,
  (val) => {
    if (val) {
      getRolePermissionData()
    }
  }
)

// 监听语言切换
watchSwitchLang(getAllPermission)

// 关闭
const onClose = () => {
  emits('update:modelValue', false)
}

// 确认逻辑
const i18n = useI18n()
const onConfirm = () => {
  // 获取选中的权限数组
  const checkedKeys = treeRef.value.getCheckedKeys()

  // 调用接口设置角色权限
  setRolePermission({
    roleId: props.userId,
    permissions: checkedKeys
  }).then(() => {
    ElMessage.success(i18n.t('role.assignPermissions') + '成功')
  })

  onClose()
}
</script>

<template>
  <el-dialog
    @close="onClose"
    :model-value="modelValue"
    :title="$t('role.assignPermissions')"
    width="50%"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      node-key="id"
      :checked-keys="rolePermission"
      default-expand-all
      :props="defaultProps"
    />
    <template #footer>
      <el-button @click="onClose">{{ $t('universal.cancel') }}</el-button>
      <el-button type="primary" @click="onConfirm">
        {{ $t('universal.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
