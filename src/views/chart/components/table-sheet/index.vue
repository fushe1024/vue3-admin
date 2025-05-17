<script setup>
import S2 from './components/S2.vue'
import SheetLabel from './components/sheet-label.vue'
import { getChartRegions, getChartTable } from '@/api/chart'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

// 获取大区数据
const regionsData = ref([])
const getRegionsData = async () => {
  const res = await getChartRegions()
  regionsData.value = res.regions
  getTableData(regionsData.value[0].id)
}
getRegionsData()

// 获取大区对应表格数据
const tableData = ref([])
const getTableData = async (regionsId) => {
  const res = await getChartTable(regionsId)
  tableData.value = res
}

// 切换激活的大区
const activeItem = ref(0)
const handleClick = (index) => {
  activeItem.value = index
  // 获取对应大区表格数据
  getTableData(regionsData.value[index].id)
}

// 监听语言切换
watchSwitchLang(() => {
  activeItem.value = 0 // 重置激活的大区
  getRegionsData() // 重新获取大区数据
})
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <S2 :data="tableData" />
    </el-col>
    <el-col :span="6">
      <sheet-label
        class="mb-20"
        v-for="(item, index) in regionsData"
        :key="item.id"
        :data="item"
        @click="handleClick(index)"
        :is-selected="activeItem === index"
      />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.mb-20 {
  margin-bottom: 20px;
}
</style>
