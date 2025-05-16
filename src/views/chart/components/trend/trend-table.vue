<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const target = ref(null)
let myChart = null

// 基于准备好的dom，初始化echarts实例
onMounted(() => {
  myChart = echarts.init(target.value)
  // 绘制图表
  drawChart()
})

/// 绘制图表函数
const i18n = useI18n()
const drawChart = () => {
  const option = {
    // 鼠标移入配置
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        shadowStyle: {
          color: '#999'
        }
      }
    },
    // 图例配置
    legend: {
      right: 0
    },
    // 网格配置
    grid: {
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    // x轴配置
    xAxis: {
      type: 'category',
      data: props.data.monthAmountList.map((item) => item.time),
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: (value) => parseInt(value.max * 1.2),
      axisLabel: {
        formatter: (value) => `${value} ${i18n.t('chart.unit')}`
      }
    },
    series: [
      {
        name: i18n.t('chart.monthIncome'),
        type: 'bar',
        barWidth: 20,
        data: props.data.monthAmountList.map((item) => item.amount),
        tooltip: {
          valueFormatter: (value) => `${value} ${i18n.t('chart.unit')}`
        }
      },
      {
        name: i18n.t('chart.dayIncome'),
        type: 'line',
        color: '#6EC6D0',
        smooth: true,
        data: props.data.dailyCurve.map((item) => item.amount),
        tooltip: {
          valueFormatter: (value) => `${value} ${i18n.t('chart.unit')}`
        }
      }
    ]
  }
  myChart.setOption(option)
}

// 监听语言切换
watchSwitchLang(() => {
  drawChart()
})
</script>

<template>
  <div ref="target" class="trend-data-container"></div>
</template>

<style scoped lang="scss">
.trend-data-container {
  height: 100%;
}
</style>
