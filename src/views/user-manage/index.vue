<script setup>
import ExportToExcel from './components/Export2Excel.vue'
import { ref, watch, onActivated } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { formatTime } from '@/utils/format'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

// 定义数据
const userManageData = ref([])
const total = ref(0)
const reqData = ref({
  page: 1,
  size: 2
})

// 获取用户管理列表
const getUserManageData = async () => {
  const res = await getUserManageList(reqData.value)
  userManageData.value = res.list
  total.value = res.total
}
getUserManageData()

// 监听语言切换
watchSwitchLang(() => {
  getUserManageData()
})

// 监听分页器变化
watch(
  reqData,
  () => {
    getUserManageData()
  },
  { deep: true }
)

// 监听路由变化
onActivated(() => {
  getUserManageData()
})

// 导入按钮
const router = useRouter()
const onImport = () => {
  router.push('/user/import')
}

// 删除逻辑
const i18n = useI18n()
const delUser = async (row) => {
  ElMessageBox.confirm(
    i18n.t('excel.dialogTitle1') + row.username + i18n.t('excel.dialogTitle2'),
    i18n.t('excel.remove'),
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUser(row._id)
      getUserManageData()
      ElMessage.success(i18n.t('excel.removeSuccess'))
    })
    .catch(() => {})
}

// 导出按钮
const exportToExcelVisible = ref(false)
const onExport = () => {
  exportToExcelVisible.value = true
}

// 查看角色
const onShowUser = (row) => {
  router.push({
    name: 'userInfo',
    params: {
      id: row._id
    }
  })
}
</script>

<template>
  <div class="user-manage-container">
    <el-card class="btns">
      <el-button type="primary" @click="onImport">
        {{ $t('excel.importExcel') }}
      </el-button>
      <el-button type="success" @click="onExport">
        {{ $t('excel.exportExcel') }}
      </el-button>
    </el-card>
    <el-card>
      <!-- table -->
      <el-table :data="userManageData" style="width: 100%">
        <el-table-column type="index" label="#" />
        <!-- 姓名 -->
        <el-table-column prop="username" :label="$t('excel.name')" />
        <!-- 电话 -->
        <el-table-column prop="mobile" :label="$t('excel.mobile')" />
        <!-- 头像 -->
        <el-table-column :label="$t('excel.avatar')" align="center">
          <template #default="{ row }">
            <el-image
              class="avatar-img"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            >
            </el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag
                class="role-tags"
                v-for="item in row.role"
                :key="item.id"
                size="small"
              >
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag class="role-tags" size="small">
                {{ $t('excel.defaultRole') }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 开通时间 -->
        <el-table-column :label="$t('excel.openTime')">
          <template #default="{ row }">
            {{ formatTime(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('excel.action')" width="300">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowUser(row)">
              {{ $t('excel.show') }}
            </el-button>
            <el-button type="info" size="small">
              {{ $t('excel.showRole') }}
            </el-button>
            <el-button type="danger" size="small" @click="delUser(row)">
              {{ $t('excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagination -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="reqData.page"
          v-model:page-size="reqData.size"
          :page-sizes="[2, 5, 10, 20]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
      </div>
    </el-card>

    <!-- 导出弹窗 -->
    <export-to-excel v-model:dialogVisible="exportToExcelVisible" />
  </div>
</template>

<style lang="scss" scoped>
.user-manage-container {
  .btns {
    display: flex;
    justify-content: end;
    margin-bottom: 20px;
  }

  .avatar-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .role-tags {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
