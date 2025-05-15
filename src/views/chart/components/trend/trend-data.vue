<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { CountUp } from 'countup.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 发生计数的 html 元素
const titleAmountTarget = ref(null) // 累计盈利
const tadayAddedTarget = ref(null) // 今日新增收益
const tadayExpendTarget = ref(null) // 今日新增支出
const tadayBalanceTarget = ref(null) // 今日结余

// 滚动数字配置项
const options = {
  duration: 1.5, // 动画持续时间
  decimalPlaces: 2 // 小数点位数
}

// 创建实例 并开始
onMounted(() => {
  new CountUp(titleAmountTarget.value, props.data.allAmount, options).start()
  new CountUp(tadayAddedTarget.value, props.data.tadayAdded, options).start()
  new CountUp(tadayExpendTarget.value, props.data.tadaySub, options).start()
  new CountUp(tadayBalanceTarget.value, props.data.tadayAmount, options).start()
})
</script>

<template>
  <div class="trend-data-container">
    <!-- 累计盈利 -->
    <div class="title">
      <div class="name">{{ $t('chart.trendDataTitle') }}</div>
      <div class="amount">
        &yen;
        <span ref="titleAmountTarget">
          {{ props.data.allAmount }}
        </span>
      </div>
    </div>

    <!-- 今日新增收益 -->
    <div class="item">
      <div class="item-name item-name-border-1">
        {{ $t('chart.trendDataTadayAdded') }}
      </div>
      <div class="item-amount">
        <span ref="tadayAddedTarget" class="item-amount-number">
          {{ props.data.tadayAdded }}
        </span>
        {{ $t('chart.unit') }}
      </div>
    </div>

    <!-- 今日新增支出 -->
    <div class="item">
      <div class="item-name item-name-border-2">
        {{ $t('chart.trendDataTadayExpend') }}
      </div>
      <div class="item-amount">
        <span ref="tadayExpendTarget" class="item-amount-number">
          {{ props.data.tadaySub }}
        </span>
        {{ $t('chart.unit') }}
      </div>
    </div>

    <!-- 今日结余 -->
    <div class="item">
      <div class="item-name item-name-border-3">
        {{ $t('chart.trendDataTadayBalance') }}
      </div>
      <div class="item-amount">
        <span ref="tadayBalanceTarget" class="item-amount-number">
          {{ props.data.tadayAmount }}
        </span>
        {{ $t('chart.unit') }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.trend-data-container {
  // 累计盈利
  .title {
    padding: 12px 20px;
    background: linear-gradient(to right, #0ea5e9, #6366f1);
    border-radius: 5px;
    color: #fff;

    .name {
      font-size: 12px;
      font-weight: bold;
    }

    .amount {
      font-size: 24px;
      margin-top: 5px;
    }
  }

  // 列表项
  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #c9c9c9;
    color: #666;
    padding: 16px 0;

    .item-name {
      font-size: 12px;
      padding: 4px 8px;
    }

    .item-amount {
      font-size: 12px;
      .item-amount-number {
        color: #333;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }

  // 边框颜色
  .item-name-border-1 {
    border-left: 6px solid #0ea5e9;
  }

  .item-name-border-2 {
    border-left: 6px solid #6366f1;
  }

  .item-name-border-3 {
    border-left: 6px solid #3b82f6;
  }
}
</style>
