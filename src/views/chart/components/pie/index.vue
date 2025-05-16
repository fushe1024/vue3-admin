<script setup>
import * as echarts from 'echarts'
import { getChartPie } from '@/api/chart'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

// 定义数据
const chartPie = ref([])
const getChartPieData = async () => {
  const res = await getChartPie()
  chartPie.value = res
  drawChart()
}
getChartPieData()

// 定义图表容器 & 图表实列
const target = ref(null)
let myChart = null

// 初始化图表
onMounted(() => {
  myChart = echarts.init(target.value)
})

/// 绘制图表函数
const i18n = useI18n()
const drawChart = () => {
  const option = {
    title: {
      text: i18n.t('chart.pieChartTitle')
    },
    tooltip: {
      trigger: 'item',
      formatter: `{b0}: {c0} ${i18n.t('chart.unit')}`
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartPie.value
      }
    ]
  }

  myChart.setOption(option)
}

// 监听语言切换
watchSwitchLang(() => {
  getChartPieData()
})
</script>

<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="container" ref="target"></div>
  </el-card>
</template>

<style scoped lang="scss">
.container {
  height: 240px;
}
</style>
