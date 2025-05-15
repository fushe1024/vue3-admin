import service from '@/utils/request'

/**
 * 获取累计收益数据
 */
export const getChartTrend = () => service.get('/chart/trend')
