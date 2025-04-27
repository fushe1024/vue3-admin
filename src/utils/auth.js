import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import storage from './storage'
/**
 * 获取时间戳
 */
export const getTimeStamp = () => {
  return storage.get(TIME_STAMP)
}

/**
 * 设置时间戳
 */
export const setTimeStamp = () => {
  storage.set(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 * @returns {boolean}
 */
export const isCheckTimeout = () => {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
