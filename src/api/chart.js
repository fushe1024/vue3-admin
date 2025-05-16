import service from '@/utils/request'

/**
 * 获取累计收益数据
 */
export const getChartTrend = () => service.get('/chart/trend')

/**
 * 获取日历数据
 */
export const getChartCalendar = () => service.get('/chart/calendar')

/**
 * 获取指定日期柱形图数据
 * @param {String} date 日期
 */
export const getChartTimeAmount = (date) =>
  service.get('/chart/time/amount', { params: { date } })
