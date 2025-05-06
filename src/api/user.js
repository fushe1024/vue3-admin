import service from '@/utils/request'

export const getFeature = () => service.get('/user/feature')

export const getChapter = () => service.get('/user/chapter')
