<script setup>
import { getPermissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

// 获取权限列表
const permissionList = ref([])
const getPermissionListData = async () => {
  const res = await getPermissionList()
  permissionList.value = res
}
getPermissionListData()

// 监听语言切换
watchSwitchLang(getPermissionListData)
</script>

<template>
  <div class="">
    <el-card>
      <el-table
        :data="permissionList"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="permissionName" :label="$t('permission.name')" />
        <el-table-column prop="permissionMark" :label="$t('permission.mark')" />
        <el-table-column prop="permissionDesc" :label="$t('permission.desc')" />
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
