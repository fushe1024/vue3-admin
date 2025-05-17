<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <el-card :body-style="{ padding: '0' }">
    <div class="sheet-label-box" :class="{ selected: isSelected }">
      <div class="title">{{ props.data.title }}</div>
      <!-- 今日回款 -->
      <div class="desc">
        <span> {{ $t('chart.tadayReceivable') }}</span>
        <p>
          <span class="money">￥ {{ props.data.receivable }}</span>
          ({{ $t('chart.unit') }})
        </p>
      </div>
      <!-- 今日结余 -->
      <div class="desc">
        <span>{{ $t('chart.tadayBalance') }}</span>
        <p>
          <span class="money" :class="{ loss: props.data.balance < 0 }">
            ￥ {{ props.data.balance }}
          </span>
          ({{ $t('chart.unit') }})
        </p>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.sheet-label-box {
  height: 116px;
  padding: 20px;
  background-color: #f2f3f9;
  cursor: pointer;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .desc {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-top: 6px;
    color: #999;

    // 钱数
    .money {
      color: #649840;
      margin-right: 10px;
    }

    // 负数
    .loss {
      color: #f56c6c;
    }
  }

  // 选中
  &.selected {
    border-left: 6px solid #5172e9;
    background-color: #fff;
  }
}
</style>
