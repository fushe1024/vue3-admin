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

/**
 * 获取饼图数据
 */
export const getChartPie = () => service.get('/chart/pie')

/**
 * 获取文字云图数据
 */
export const getChartWordCloud = () => service.get('/chart/wordCloud')

/**
 * 地图可视化数据
 */
export const getChartMap = () => service.get('/chart/bmap')

/**
 * 获取大区数据
 */
export const getChartRegions = () => service.get('/chart/regions')

/**
 * 获取表格数据
 * @param {String} regionsID 大区ID
 */
export const getChartTable = (regionsID) =>
  service.get('/chart/sheets', { params: { regionsID } })
