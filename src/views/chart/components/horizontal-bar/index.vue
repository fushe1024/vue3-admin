<script setup>
import * as echarts from 'echarts'
import { getChartTimeAmount } from '@/api/chart'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import emitter from '@/utils/eventBus'

// 获取当前日期柱形图数据
const data = ref([])
const getChart = async (date) => {
  const { result } = await getChartTimeAmount(date)
  data.value = result
  drawChart()
}
getChart(new Date())

// 定义图表容器 & 图表实列
const target = ref(null)
let myChart = null

// 初始化图表
onMounted(() => {
  myChart = echarts.init(target.value)

  // 监听日期变化
  emitter.on('changeDate', (date) => {
    getChart(date)
  })
})

/// 绘制图表函数
const i18n = useI18n()
const drawChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: { right: 0 },
    grid: {
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      data: data.value.map((item) => item.timeStr),
      inverse: true
    },
    series: [
      {
        name: `${i18n.t('chart.income')} ${i18n.t('chart.unit')}`,
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'inside'
        },
        color: '#6DC473',
        emphasis: {
          focus: 'series'
        },
        data: data.value.map((item) => item.income)
      },
      {
        name: `${i18n.t('chart.expend')} ${i18n.t('chart.unit')}`,
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'right'
        },
        color: '#E47470',
        emphasis: {
          focus: 'series'
        },
        data: data.value.map((item) => item.expense)
      },
      {
        name: `${i18n.t('chart.balance')} ${i18n.t('chart.unit')}`,
        type: 'bar',
        label: {
          show: true,
          position: 'left'
        },
        color: '#83C0DF',
        emphasis: {
          focus: 'series'
        },
        data: data.value.map((item) => item.balance)
      }
    ]
  }
  myChart.setOption(option)
}

// 监听语言切换
watchSwitchLang(() => {
  drawChart()
})

// 销毁
onBeforeUnmount(() => {
  emitter.off('changeDate')
})
</script>

<template>
  <div class="container">
    <el-card>
      <div class="charts" ref="target"></div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.container {
  .charts {
    height: 403px;
  }
}
</style>
