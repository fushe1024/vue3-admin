import service from '@/utils/request'

/**
 * @description: 重置数据
 * @return {*}
 */
export const resetDbData = () => service.get('/sys/init')
