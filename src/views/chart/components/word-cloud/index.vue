<script setup>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { ref, onMounted } from 'vue'
import { getChartWordCloud } from '@/api/chart'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { randomRGB } from '@/utils/color'
import wordcloud from '@/assets/wordcloud.png'

// 获取文字云数据
const chartWordCloud = ref([])
const getChartWordCloudData = async () => {
  const res = await getChartWordCloud()
  chartWordCloud.value = res
  drawChart()
}
getChartWordCloudData()

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
  // 定义文字云遮罩
  const maskImage = new Image()
  maskImage.src = wordcloud

  // 定义配置项
  const option = {
    title: {
      text: i18n.t('chart.cloudChartTitle')
    },
    series: {
      type: 'wordCloud',
      sizeRange: [4, 80],
      rotationRange: [0, 0],
      gridSize: 3,
      layoutAnimation: true,

      // Mask image
      maskImage: maskImage,

      // Global text style
      textStyle: {
        color: () => randomRGB()
      },

      emphasis: {
        textStyle: {
          fontWeight: 'bold',
          color: '#000'
        }
      },

      // Data is an array. Each array item must have name and value property.
      data: chartWordCloud.value
    }
  }

  maskImage.onload = () => {
    myChart.setOption(option)
  }
}

// 监听语言切换
watchSwitchLang(() => {
  getChartWordCloudData()
})
</script>

<template>
  <el-card :body-style="{ padding: '0' }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<style scoped lang="scss">
.container {
  height: 240px;
}
</style>
