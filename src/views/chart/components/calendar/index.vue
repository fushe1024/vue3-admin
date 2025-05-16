<script setup>
import { ref, watch } from 'vue'
import { getChartCalendar } from '@/api/chart'
import emitter from '@/utils/eventBus'

// 当前日期
const currentDate = ref(new Date())

// 获取日历数据
const calendarData = ref([])
const getCalendar = async () => {
  const { result } = await getChartCalendar()
  calendarData.value = result
}
getCalendar()

// 缓存数据 key: 日期 value: 当日收益
const cacheData = ref({})

/**
 * 获取当天日期数据
 * @param {*} date 日期
 */
const getTadayData = (date) => {
  // 判断是否有缓存数据
  if (cacheData.value[date]) {
    return cacheData.value[date]
  }

  // 获取当日数据
  const tadayData = calendarData.value.find((item) => item.date === date)

  // 判断当前日期是否有数据
  if (!tadayData) {
    return 0
  }

  // 获取当日收益
  const tadayAmount = tadayData.amount

  // 缓存数据
  cacheData.value[date] = tadayAmount

  // 返回当日收益
  return tadayAmount
}

/**
 * 返回当前日期背景类名
 * @param {*} date 日期
 */
const getBgClass = (date) => {
  // 获取当日数据
  const tadayData = getTadayData(date)
  // 判断当日数据是否为0
  if (tadayData === 0) {
    return ''
  } else if (tadayData > 0) {
    return 'profit'
  } else {
    return 'loss'
  }
}

// 监听日期切换
watch(currentDate, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emitter.emit('changeDate', newVal)
  }
})
</script>

<template>
  <div class="container">
    <el-card>
      <el-calendar v-model="currentDate">
        <template #date-cell="{ data }">
          <p
            :class="[
              data.isSelected ? 'is-selected' : '',
              getBgClass(data.day)
            ]"
          >
            {{ data.day.split('-').slice(2).join() }}
            <br />
            <span class="amount" v-if="getTadayData(data.day)">
              {{ getTadayData(data.day) }}
            </span>
          </p>
        </template>
      </el-calendar>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 443px;

  // 卡片
  :deep(.el-card) {
    height: inherit;

    .el-card__body {
      padding: 0;
    }
  }

  // 日历
  :deep(.el-calendar) {
    height: inherit;

    .el-calendar__body {
      padding: 12px 12px 0;
      font-size: 14px;

      .el-calendar-day {
        height: 64px;
        padding: 0;

        p {
          height: 100%;
          padding: 4px;
        }

        // 金额样式
        .amount {
          font-size: 12px;
        }

        // 正利润
        .profit {
          background-color: #f3fff3;
          span {
            color: #649840;
          }
        }

        // 负利润
        .loss {
          background-color: #fff3f3;
          span {
            color: #d64040;
          }
        }

        .is-selected {
          background-color: #d6f2ff;
        }
      }
    }
  }
}
</style>
