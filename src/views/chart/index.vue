<script setup>
import TrendVue from './components/trend'
import HorizontalBarVue from './components/horizontal-bar'
import CalendarVue from './components/calendar'
import PieVue from './components/pie'
import WordCloudVue from './components/word-cloud'
import BMapVue from './components/b-map'
import TableSheetVue from './components/table-sheet'
</script>

<template>
  <div class="chat-container">
    <!-- 累计收益趋势图 -->
    <trend-vue />

    <!-- 第二行 -->
    <el-row class="mt-20" :gutter="20">
      <el-col :span="16">
        <!-- 日金额分析图 -->
        <horizontal-bar-vue />
      </el-col>
      <el-col :span="8">
        <!-- 日历图-->
        <calendar-vue />
      </el-col>
    </el-row>

    <!-- 第三行 -->
    <el-row class="mt-20" :gutter="20">
      <el-col :span="6">
        <div class="chart-map-left">
          <!-- 饼图 -->
          <pie-vue />
          <!-- 文档云图 -->
          <word-cloud-vue class="mt-20" />
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 日历图-->
        <b-map-vue />
      </el-col>
    </el-row>

    <!-- S2 表格数据展示 -->
    <table-sheet-vue class="mt-20" />
  </div>
</template>

<style lang="scss" scoped>
.chat-container {
  .mt-20 {
    margin-top: 20px;
  }
}
</style>
