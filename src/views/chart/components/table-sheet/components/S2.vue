<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'
import { TableSheet } from '@antv/s2'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const sheetRef = ref(null)
let s2 = null

// 初始化
onMounted(() => {
  const s2Options = {
    width: sheetRef.value.clientWidth,
    height: sheetRef.value.clientHeight,
    showSeriesNumber: true,
    conditions: {
      background: [
        {
          field: 'balance',
          mapping: (fieldValue) => {
            return {
              fill: fieldValue > 0 ? '#f3fff3' : '#ffe7e7'
            }
          }
        }
      ]
    }
  }
  s2 = new TableSheet(sheetRef.value, {}, s2Options)
})

// 图表渲染函数
const renderChart = () => {
  const s2DataCfg = {
    fields: {
      columns: [
        'province',
        'city',
        'coverage',
        'receivable',
        'actual',
        'balance'
      ]
    },
    meta: [
      {
        field: 'province',
        name: i18n.t('chart.sheetProvince')
      },
      {
        field: 'city',
        name: i18n.t('chart.sheetCity')
      },
      {
        field: 'coverage',
        name: i18n.t('chart.sheetCoverage')
      },
      {
        field: 'receivable',
        name: i18n.t('chart.sheetReceivable')
      },
      {
        field: 'actual',
        name: i18n.t('chart.sheetActual')
      },
      {
        field: 'balance',
        name: i18n.t('chart.sheetBalance')
      }
    ],
    data: props.data
  }

  s2.setDataCfg(s2DataCfg)

  // 传入 true 表示数据发生了更新
  s2.render(true)
}

// 监听数据变化
watch(
  () => props.data,
  () => {
    renderChart()
  }
)

// 监听语言变化
watchSwitchLang(renderChart)
</script>

<template>
  <el-card :body-style="{ padding: '0' }">
    <div class="sheet-container" ref="sheetRef"></div>
  </el-card>
</template>

<style scoped lang="scss">
.sheet-container {
  height: 805px;
}
</style>
