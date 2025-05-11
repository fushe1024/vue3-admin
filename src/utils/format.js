import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'

/**
 * 格式化时间
 * @param {*} time 时间戳
 * @param {*} format 格式
 * @returns 格式化后的时间
 */
export const formatTime = (time, format = 'YYYY-MM-DD') => {
  if (!isNaN(time)) {
    time = parseInt(time)
  }
  return dayjs(time).format(format)
}

/**
 * 格式化时间相对当前时间
 * @param {*} time 时间戳
 * @returns 格式化后的时间
 */
dayjs.extend(rt)
export const relativeTime = (time) => {
  if (!isNaN(time)) {
    time = parseInt(time)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(time))
}
