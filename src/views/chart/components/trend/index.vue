<script setup>
import TrendData from './trend-data.vue'
import TrendTable from './trend-table.vue'
import { getChartTrend } from '@/api/chart'
import { ref } from 'vue'

// 获取累计收益数据
const chartTrendData = ref({})
const getChartData = async () => {
  const res = await getChartTrend()
  chartTrendData.value = res
}
getChartData()
</script>

<template>
  <div class="container">
    <el-card>
      <el-row :gutter="32" v-if="chartTrendData.allAmount">
        <el-col :span="6">
          <TrendData :data="chartTrendData" />
        </el-col>
        <el-col :span="18">
          <TrendTable :data="chartTrendData" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 286px;
}
</style>
