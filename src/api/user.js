import service from '@/utils/request'

/**
 * 获取 Feature 列表

 */
export const getFeature = () => service.get('/user/feature')

/**
 * 获取 Chapter 列表
 * @returns
 */
export const getChapter = () => service.get('/user/chapter')
