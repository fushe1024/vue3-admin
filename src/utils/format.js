import { dayjs } from 'element-plus'

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
