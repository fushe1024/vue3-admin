<script setup>
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import { ref, onMounted } from 'vue'
import { getChartMap } from '@/api/chart'
import { transformData, getTop5Data } from './utils'
import { useI18n } from 'vue-i18n'

// 获取map数据
const mapData = ref({})
const getMapData = async () => {
  const res = await getChartMap()
  mapData.value = transformData(res)
  drawChart()
}
getMapData()

// 初始化 echarts
const target = ref(null)
let myChart = null
onMounted(() => {
  myChart = echarts.init(target.value)
})

/// 绘制图表函数
const i18n = useI18n()
const drawChart = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      center: [109.114129, 36.550339], // 中心点
      zoom: 5 // 缩放级别
      // roam: true // 是否开启拖拽缩放
    },
    series: [
      {
        name: `营收 (${i18n.t('chart.unit')})`,
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: mapData.value,
        symbolSize: (value) => value[2] / 10, // 散点大小
        encode: {
          value: 2 // 数据值
        },
        emphasis: {
          label: {
            show: true // 鼠标悬浮显示
          }
        },
        color: '#15803d'
      },
      {
        name: `营收 TOP 5 (${i18n.t('chart.unit')})`,
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: getTop5Data(mapData.value),
        symbolSize: (value) => value[2] / 10, // 散点大小
        encode: {
          value: 2 // 数据值
        },
        emphasis: {
          label: {
            show: true // 鼠标悬浮显示
          }
        },
        label: {
          show: true, // 显示标签
          formatter: '{b}', // 标签内容
          position: 'right' // 标签位置
        },
        color: '#166534',
        zlevel: 2
      }
    ]
  }
  myChart.setOption(option)
}
</script>

<template>
  <el-card>
    <div class="container">
      <div class="title">{{ $t('chart.bmapChartTitle') }}</div>
      <div class="map-box" ref="target"></div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  .title {
    position: absolute;
    top: 10px;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
    font-size: 22px;
    font-weight: bold;
  }

  .map-box {
    height: 460px;
  }
}
</style>
