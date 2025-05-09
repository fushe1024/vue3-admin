<script setup>
import PermissionDialog from './components/PermissionDialog'
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'

// 获取角色列表
const roleList = ref([])
const getRoleListData = async () => {
  const res = await getRoleList()
  roleList.value = res
}
getRoleListData()

// 监听语言切换
watchSwitchLang(getRoleListData)

// 分配权限逻辑
const dialogVisible = ref(false)
const userId = ref('')
const assignPermissions = (row) => {
  dialogVisible.value = true
  userId.value = row.id
}
</script>

<template>
  <div class="">
    <el-card>
      <el-table :data="roleList" border>
        <el-table-column type="index" :label="$t('role.index')" width="130" />
        <el-table-column prop="title" :label="$t('role.name')" />
        <el-table-column prop="describe" :label="$t('role.desc')" />
        <el-table-column :label="$t('role.action')">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="assignPermissions(row)"
            >
              {{ $t('role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <permission-dialog v-model="dialogVisible" :userId="userId" />
  </div>
</template>

<style lang="scss" scoped></style>
