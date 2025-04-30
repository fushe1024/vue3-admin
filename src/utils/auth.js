import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import storage from './storage'

// 获取时间戳（本地存储）
export const getTimeStamp = () => {
  return storage.get(TIME_STAMP)
}

// 设置时间戳（本地存储）
export const setTimeStamp = () => {
  storage.set(TIME_STAMP, Date.now())
}

// 是否超时
export const isCheckTimeout = () => {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
